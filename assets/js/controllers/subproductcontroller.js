app.controller('SubproductController',['$scope','$http','dataTrans','$window',function($scope,$http,dataTrans,$window) {
  
  $scope.product;
  $scope.subproductList;

  $scope.data;

  $scope.getsubproduct = function(){
  	$scope.data = dataTrans.getData();
  	//console.log($scope.data)
  	$http.post('/subproduct/getSubProduct',{
  		id: $window.sessionStorage.productID
  	})
  	.then(function successGet(response){
      $scope.product = response.data.product;
  		$scope.subproductList = response.data.subproduct;
      console.log(response)
  		console.log($scope.product);
      console.log($scope.subproductList);

  	}, function errorGet(err){
  		console.log(err);
  	})
  }

  $scope.selectProduct = function(product){

    dataTrans.addData(product);
  }

}]);