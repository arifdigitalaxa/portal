app.controller('AdminAnswerController',['$scope','$http','$mdDialog','ModalService',function($scope,$http,$mdDialog,ModalService) {
  

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
  }

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

  $scope.getAllAnswer = function(ev){
    $http.post('/answer/getAllAnswer',{})
    .then(function successRetrieve(response){
      $scope.question = response.data.question;
      $scope.answerList = response.data.answer;

      console.log($scope.answerList)
    }, function successRetrieve(err){
      console.log(err);
    })

  }

  

}]);