app.controller('AdminDetailController',['$scope','$http','$mdDialog','ModalService', '$window', function($scope,$http,$mdDialog,ModalService,$window) {
  

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

  $scope.deleteAnswer = function(ev,answer) {
    // Appending dialog to document.body to cover sidenav in docs app

    var confirm = $mdDialog.confirm()
          .title('Delete answer')
          .textContent('Confirm to delete answer '+answer.name+'?')
          .ariaLabel('Delete answer')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http({
        method: 'DELETE',
        url: '/answer/'+answer.id,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
       }).then(function success(response){
          console.log(response)
          alertStatus(ev,"Success",answer.name + " deleted!");
          $scope.getAllAnswer();
      }, function failed(err){
          alertStatus(ev,"Error",answer.name + " not deleted!");
      })

    }, function() {
      
    });
  };

  $scope.addAnswer = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addAnswer.html",
      controller: "answerModalController",
      inputs: {
        title: "Register New Answer",
        question: $scope.question,
        questionid: ''
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          console.log(result)
          $http.post('/answer/create',{
            name: result.name,
            desc: result.desc,
            questionid: result.question
          })
          .then(function success(response){
              // console.log(response);

              if(response == null){
                return
              }
              alertStatus(ev,response.data.title,response.data.message);
              $scope.getAllAnswer(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.getAllData = function(ev){
    console.log($window.sessionStorage.subproductID)
    $http.post('/admin/getAllDataDetail',{
      id: $window.sessionStorage.subproductID
    })
    .then(function successRetrieve(response){

      $scope.product = response.data.product;
      $scope.subproduct = response.data.subproduct;
      $scope.subjectList = response.data.subject;
      $scope.questionList = response.data.question;
      $scope.answerList = response.data.answer;

      console.log(response)
    }, function successRetrieve(err){
      console.log(err);
    })

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
        subproduct: $scope.subproduct,
        subjectid: ''
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

  }

  

}]);