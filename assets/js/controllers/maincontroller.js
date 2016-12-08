app.controller('MainController',['$scope','$http','$cookies',function($scope,$http,$cookies) {
  
  $scope.userInit = function(){
    if(angular.isUndefined($scope.user)){
      $http.get('users/getSession',{})
       .then( function successSess(response){
         $scope.user = response.data;
          if(response.data == null){
            if(window.location.href != 'http://localhost:8080/'){
              window.location = '/'
            }
          }
       }, function errorFunction(err){
         console.log(err)
       })
    }
  }

  $scope.userLogout = function(){
    if($scope.user == null){
      $http.get('users/getSession',{})
      .then( function successSess(response){
        $scope.user = response.data;
        console.log(response.data)
        if(response.data == null){
          $http.get('showHomePage',{})
        }
      }, function errorFunction(err){
        console.log(err)
      })
    }
  }

}]);