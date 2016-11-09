app.controller('AdminSubjectController',['$scope','$http','$mdDialog','ModalService',function($scope,$http,$mdDialog,ModalService) {
  

$scope.productList;

 function alertStatus(ev,title,message){
    $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#main')))
          .clickOutsideToClose(true)
          .title(title)
          .textContent(message)
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
          .targetEvent(ev)
          );
  }

  $scope.deleteSubject = function(ev,subject) {
    // Appending dialog to document.body to cover sidenav in docs app

    var confirm = $mdDialog.confirm()
          .title('Delete sub product')
          .textContent('Confirm to delete product '+subject.name+'?')
          .ariaLabel('Delete sub product')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http({
        method: 'DELETE',
        url: '/subject/'+subject.id,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
       }).then(function success(response){
          console.log(response)
          alertStatus(ev,"Success",subject.name + " deleted!");
          $scope.getAllSubject();
      }, function failed(err){
          alertStatus(ev,"Error",subject.name + " not deleted!");
      })

    }, function() {
      
    });
  };

  $scope.addSubject = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addSubject.html",
      controller: "subjectModalController",
      inputs: {
        title: "Register New Subject",
        subproduct: $scope.subproduct
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/subject/create',{
            name: result.name,
            desc: result.desc,
            subproductid: result.subproduct
          })
          .then(function success(response){
              // console.log(response);

              if(response == null){
                return
              }
              alertStatus(ev,response.data.title,response.data.message);
              $scope.getAllSubject(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.getAllSubject = function(ev){
    $http.post('/subject/getAllSubject',{})
    .then(function successRetrieve(response){
      $scope.subproduct = response.data.subproduct;
      $scope.subjectList = response.data.subject;
    }, function successRetrieve(err){
      console.log(err);
    })

  }

  

}]);