app.controller('ProductController',['$scope','$http','dataTrans','$window',function($scope,$http,dataTrans,$window) {
  

  $scope.productList;

  $scope.data;

  $scope.getproduct = function(){
  	$http.get('/product/getAllProduct',{})
  	.then(function successGet(response){
  		$scope.productList = response.data;

  		console.log($scope.productList);
  	}, function errorGet(err){
  		console.log(err);
  	})
  }

  $scope.selectProduct = function(product){

    $window.sessionStorage.productID = product.id;

    // $scope.data = dataTrans.getData();
    // console.log($scope.data)
    //window.location = "/subproductlist"
    //$location.path("/admin")
  }

  $scope.selectSubProduct = function(subproduct){

    $window.sessionStorage.subproductID = subproduct.id;

    // $scope.data = dataTrans.getData();
    // console.log($scope.data)
    //window.location = "/subproductlist"
    //$location.path("/admin")
  }

}]);