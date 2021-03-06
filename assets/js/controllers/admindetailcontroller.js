app.controller('AdminDetailController',['$scope','$http','$mdDialog','ModalService', '$window','Upload','FileSaver', function($scope,$http,$mdDialog,ModalService,$window,Upload,FileSaver) {

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

      $http.post('/admin/getFileList',{
        id: $window.sessionStorage.subproductID
      }).then(function getFile(file){
        $scope.fileList = file.data
        console.log($scope.fileList)
      }, function errFound(err){
          console.log(err);
      })

    }, function successRetrieve(err){
      console.log(err);
    })
  }

  $scope.deleteSubProduct = function(ev) {

    var confirm = $mdDialog.confirm()
          .title('Delete sub product')
          .textContent('Confirm to delete product '+$scope.subproduct.name+'? Deleted data cannot be recovered')
          .ariaLabel('Delete sub product')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http({
        method: 'DELETE',
        url: '/subproduct/'+$scope.subproduct.id,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
       }).then(function success(response){
          alertStatus(ev,"Success",$scope.subproduct.name + " deleted!");
          $window.location.href ='/subproduct'
      }, function failed(err){
          alertStatus(ev,"Error",$scope.subproduct.name + " not deleted!");
      })

    }, function() {
      
    });
  }

  $scope.editSubProduct = function(ev){
    console.log('this is triggered')
    ModalService.showModal({
      templateUrl: "./modals/editSubproduct.html",
      controller: "editSubproductModalController",
      inputs: {
        title: "Edit Sub Product",
        product: $scope.product,
        subproduct: $scope.subproduct,
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/subproduct/edit',{
            id: result.id,
            name: result.name,
            desc: result.desc
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

  $scope.editSubject = function(ev,subject){
    ModalService.showModal({
      templateUrl: "./modals/editSubject.html",
      controller: "editSubjectModalController",
      inputs: {
        title: "Edit Subject",
        subproduct: $scope.subproduct,
        subject: subject
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/subject/edit',{
            id: result.id,
            name: result.name,
            desc: result.desc
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

  $scope.editAnswer = function(ev,answer){
    ModalService.showModal({
      templateUrl: "./modals/editAnswer.html",
      controller: "editAnswerModalController",
      inputs: {
        title: "Edit Answer",
        question: $scope.questionList,
        answer: answer
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/answer/edit',{
            id: result.id,
            name: result.name,
            desc: result.desc,
            question: result.question
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
          //console.log(result)

          Upload.upload({
            url: 'admin/uploadDoc',
            data: {
              subproduct: $scope.subproduct,
              desc: result.desc,
              tags: result.tags,
              file: result.file
            }
          })
          .success(function(data){
            if(data == null){
                return
            }
            
            alertStatus(ev,'Upload Complete!','File uploaded successfully');

            $scope.getAllData(ev)
          }).error(function(err){
            console.log(err);
          });
        }
      });
    });
  }

  $scope.deleteDocument = function(ev,file) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Delete file')
          .textContent('Confirm to delete file '+file.name+'?')
          .ariaLabel('Delete file')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http.post('/files/deleteFile',{
        id: file.id
      }).then(function success(data){
          $http({
            method: 'DELETE',
            url: '/files/'+file.id,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
           }).then(function success(response){
              console.log(response)
              alertStatus(ev,"Success",file.name + " deleted!");
              $scope.getAllData();
          }, function failed(err){
              alertStatus(ev,"Error",file.name + " not deleted!");
          })
      })
    }, function() {
      
    });
  }

  $scope.downloadDocument = function(file){
    $http.post('/files/showFile',{
      id: file.id
    },{responseType: 'blob'})
    .then(function success(files){
      var blob = new Blob([files.data], { type: file.type });
      FileSaver.saveAs(blob, file.name);
    }, function failedRetrieve(err){
      console.log(err);
    })
  }

  $scope.viewDocument = function(file){
    $http.post('/files/showFile',{
      id: file.id
    },{responseType: 'blob'})
    .then(function success(files){
      var blob = new Blob([files.data], { type: file.type });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL)
      //FileSaver.saveAs(blob, file.name);
    }, function failedRetrieve(err){
      console.log(err);
    })
  }

  $scope.returnHtml = function(answer){
    return converter.makeHtml(answer);
  }

}]);