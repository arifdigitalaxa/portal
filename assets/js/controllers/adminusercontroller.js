app.controller('AdminUserController',['$scope','$http','$mdDialog','ModalService',function($scope,$http,$mdDialog,ModalService) {
  

$scope.userList;

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

  $scope.deleteUser = function(ev,user) {
    // Appending dialog to document.body to cover sidenav in docs app

    console.log(user);
    if(user.userType == 1){
      alertStatus(ev,"Cannot Delete User", "You cant delete admin user, please contact superadmin user to do so")

      return;
    }

    var confirm = $mdDialog.confirm()
          .title('Delete user')
          .textContent('Confirm to delete user '+user.username+'?')
          .ariaLabel('Delete User')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http({
        method: 'DELETE',
        url: '/users/'+user.id,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
       }).then(function success(response){
          console.log(response)
          alertStatus(ev,"Success",user.username + " deleted!");
          $scope.getAllUser();
      }, function failed(err){
          alertStatus(ev,"Error",user.username + " not deleted!");
      })

    }, function() {
      
    });
  };

  $scope.addUser = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addUser.html",
      controller: "ComplexController",
      inputs: {
        title: "Register New User"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/users/create',{
            username: result.username,
            password: result.password,
            email: result.email,
            userType: 0
          })
          .then(function success(response){
              // console.log(response);

              if(response == null){
                return
              }
              alertStatus(ev,response.data.title,response.data.message);
              $scope.getAllUser(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.getAllUser = function(ev){
  	$http.post('/users/getAllUser',{})
  	.then(function successRetrieve(response){
      $scope.userList = response.data;
      console.log($scope.userList);
  	}, function successRetrieve(err){
  		console.log(err);
  	})

  }

  

}]);