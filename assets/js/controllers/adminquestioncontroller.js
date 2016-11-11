app.controller('AdminQuestionController',['$scope','$http','$mdDialog','ModalService',function($scope,$http,$mdDialog,ModalService) {
  

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

  $scope.deleteQuestion = function(ev,question) {
    // Appending dialog to document.body to cover sidenav in docs app

    var confirm = $mdDialog.confirm()
          .title('Delete sub product')
          .textContent('Confirm to delete question '+question.name+'?')
          .ariaLabel('Delete question')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http({
        method: 'DELETE',
        url: '/question/'+question.id,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
       }).then(function success(response){
          console.log(response)
          alertStatus(ev,"Success",question.name + " deleted!");
          $scope.getAllQuestion();
      }, function failed(err){
          alertStatus(ev,"Error",question.name + " not deleted!");
      })

    }, function() {
      
    });
  };

  $scope.addQuestion = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addQuestion.html",
      controller: "questionModalController",
      inputs: {
        title: "Register New Question",
        subject: $scope.subject,
        subjectid: ''
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/question/create',{
            name: result.name,
            desc: result.desc,
            subjectid: result.subject
          })
          .then(function success(response){
              // console.log(response);

              if(response == null){
                return
              }
              alertStatus(ev,response.data.title,response.data.message);
              $scope.getAllQuestion(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.addAnswer = function(ev,question){
    ModalService.showModal({
      templateUrl: "./modals/addAnswer.html",
      controller: "answerModalController",
      inputs: {
        title: "Register New Answer",
        question: $scope.questionList,
        questionid: question.id
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

  $scope.getAllQuestion = function(ev){
    $http.post('/question/getAllQuestion',{})
    .then(function successRetrieve(response){
      $scope.subject = response.data.subject;
      $scope.questionList = response.data.question;
    }, function successRetrieve(err){
      console.log(err);
    })

  }

  

}]);