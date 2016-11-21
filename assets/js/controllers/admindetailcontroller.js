app.controller('AdminDetailController',['$scope','$http','$mdDialog','ModalService', '$window','Upload', function($scope,$http,$mdDialog,ModalService,$window,Upload) {

  $scope.productList;

  var converter = new showdown.Converter()



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
  }

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
              $scope.getAllData(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.deleteSubject = function(ev,subject) {
    // Appending dialog to document.body to cover sidenav in docs app

    var confirm = $mdDialog.confirm()
          .title('Delete Subject')
          .textContent('Confirm to delete subject '+subject.name+'?')
          .ariaLabel('Delete subject')
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
          $scope.getAllData();
      }, function failed(err){
          alertStatus(ev,"Error",subject.name + " not deleted!");
      })

    }, function() {
      
    });
  }

  $scope.addQuestion = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addQuestion.html",
      controller: "questionModalController",
      inputs: {
        title: "Register New Question",
        subject: $scope.subjectList,
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
              $scope.getAllData(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
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
          $scope.getAllData();
      }, function failed(err){
          alertStatus(ev,"Error",question.name + " not deleted!");
      })

    }, function() {
      
    });
  }

  $scope.addAnswer = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addAnswer.html",
      controller: "answerModalController",
      inputs: {
        title: "Add New Answer",
        question: $scope.questionList,
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
              $scope.getAllData(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
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
          $scope.getAllData();
      }, function failed(err){
          alertStatus(ev,"Error",answer.name + " not deleted!");
      })

    }, function() {
      
    });
  }

  $scope.addDocument = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addDocument.html",
      controller: "documentModalController",
      inputs: {
        title: "Upload Document"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          console.log(result)

          Upload.upload({
            url: 'admin/uploadDoc',
            data: {
              file: result
            }
          })
          .success(function(data){
            console.log(data);
          }).error(function(err){
            console.log(err);
          });
        }
      });
    });
  }

  $scope.uploadFile = function() {
      console.log($scope.file)
    };

  $scope.returnHtml = function(answer){
    return converter.makeHtml(answer);
  }

}]);