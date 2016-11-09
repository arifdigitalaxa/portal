app.controller('AdminProductController',['$scope','$http','$mdDialog','ModalService',function($scope,$http,$mdDialog,ModalService) {
  

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

  $scope.deleteProduct = function(ev,product) {
    // Appending dialog to document.body to cover sidenav in docs app

    console.log(product);
    // if(product.productType == 1){
    //   alertStatus(ev,"Cannot Delete product", "You cant delete admin product, please contact superadmin product to do so")

    //   return;
    // }

    var confirm = $mdDialog.confirm()
          .title('Delete product')
          .textContent('Confirm to delete product '+product.name+'?')
          .ariaLabel('Delete product')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http({
        method: 'DELETE',
        url: '/product/'+product.id,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
       }).then(function success(response){
          console.log(response)
          alertStatus(ev,"Success",product.name + " deleted!");
          $scope.getAllProduct();
      }, function failed(err){
          alertStatus(ev,"Error",product.name + " not deleted!");
      })

    }, function() {
      
    });
  };

  $scope.addProduct = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/addProduct.html",
      //templateUrl: "./modals/editProduct.html",
      controller: "productModalController",
      inputs: {
        title: "Register New Product"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/product/create',{
            name: result.name,
            desc: result.desc
          })
          .then(function success(response){
              // console.log(response);

              if(response == null){
                return
              }
              alertStatus(ev,response.data.title,response.data.message);
              $scope.getAllProduct(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.editProduct = function(ev){
    ModalService.showModal({
      templateUrl: "./modals/editProduct.html",
      controller: "productModalController",
      inputs: {
        title: "Edit Product"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result){
          $http.post('/product/create',{
            name: result.name,
            desc: result.desc
          })
          .then(function success(response){
              // console.log(response);

              if(response == null){
                return
              }
              alertStatus(ev,response.data.title,response.data.message);
              $scope.getAllProduct(ev)
          }, function error(err){
              alertStatus(ev,"Error",err)
          })
        }
      });
    });
  }

  $scope.addSubProduct = function(ev){
      ModalService.showModal({
        templateUrl: "./modals/addSubProduct.html",
        controller: "subproductModalController",
        inputs: {
          title: "Register New Sub Product",
          product: $scope.productList
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

  $scope.getAllProduct = function(ev){
  	$http.post('/product/getAllProduct',{})
  	.then(function successRetrieve(response){
      $scope.productList = response.data;
      console.log($scope.productList);
  	}, function successRetrieve(err){
  		console.log(err);
  	})

  }

  

}]);