app.controller('AdminSubProductController',['$scope','$http','$mdDialog','ModalService',function($scope,$http,$mdDialog,ModalService) {
  

$scope.productList;

$scope.productId;

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

  $scope.deleteSubProduct = function(ev,subproduct) {
    // Appending dialog to document.body to cover sidenav in docs app

    console.log(subproduct);
    // if(product.productType == 1){
    //   alertStatus(ev,"Cannot Delete product", "You cant delete admin product, please contact superadmin product to do so")

    //   return;
    // }

    var confirm = $mdDialog.confirm()
          .title('Delete sub product')
          .textContent('Confirm to delete product '+subproduct.name+'?')
          .ariaLabel('Delete sub product')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http({
        method: 'DELETE',
        url: '/subproduct/'+subproduct.id,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
       }).then(function success(response){
          console.log(response)
          alertStatus(ev,"Success",subproduct.name + " deleted!");
          $scope.getAllSubProduct();
      }, function failed(err){
          alertStatus(ev,"Error",subproduct.name + " not deleted!");
      })

    }, function() {
      
    });
  };

  $scope.filterSubProduct = function(productid){
    $http.post('/subproduct/getCertainProduct',{
        id: productid
    })
    .then(function successRetrieve(response){
      $scope.subproductList = response.data.subproduct;
    }, function successRetrieve(err){
      console.log(err);
    })
  }

  $scope.addSubProduct = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addSubProduct.html",
      controller: "subproductModalController",
      inputs: {
        title: "Register New Sub Product",
        product: $scope.productList,
        productid: ''
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/subproduct/create',{
            name: result.name,
            desc: result.desc,
            productid: result.product
          })
          .then(function success(response){
              // console.log(response);

              if(response == null){
                return
              }
              alertStatus(ev,response.data.title,response.data.message);
              $scope.getAllSubProduct(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.addSubject = function(ev,subproduct){
    ModalService.showModal({
      templateUrl: "./modals/addSubject.html",
      controller: "subjectModalController",
      inputs: {
        title: "Register New Subject",
        subproduct: $scope.subproductList,
        subjectid: subproduct.id
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
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.getAllSubProduct = function(ev){
  	$http.post('/subproduct/getAllSubProduct',{})
  	.then(function successRetrieve(response){
      $scope.subproductList = response.data.subproduct;
      $scope.productList = response.data.product;
      console.log($scope.productList);
      console.log($scope.subproductList);
  	}, function successRetrieve(err){
  		console.log(err);
  	})

  }

  

}]);