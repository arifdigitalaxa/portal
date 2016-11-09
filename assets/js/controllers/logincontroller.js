app.controller('LoginController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog) {
  

  $scope.loginData;

  $scope.results;

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

  $scope.submitLoginForm = function(ev){
  	$http.post('/users/login',{
  		username: $scope.loginData.username,
  		password: $scope.loginData.password
  	})
  	.then(function successLogin(response){
  		
      if(response.data.result !== 'success'){
        alertStatus(ev,'Error',response.data.result)
      }else{
        window.location = '/';
      }

  		console.log(response.data.result);
  	}, function errorLogin(err){
  		console.log(err);
  	})

  }

  

}]);