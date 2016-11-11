app.controller('qnaController',['$scope','$http','dataTrans','$window',function($scope,$http,dataTrans,$window) {
  
  $scope.subproduct;
  $scope.subjectList;
  $scope.questionList;
  $scope.subjectid;
  $scope.keyword = '';

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

  $scope.getData = function(){
      console.log($window.sessionStorage.subproductID)
      $http.post('qna/getSubProductSubjects',{
        id: $window.sessionStorage.subproductID
      })
      .then(function success(response){
          console.log(response)
          $scope.subproduct = response.data.subproduct
          $scope.subjectList = response.data.subject
      }, function errorGet(err){
        console.log(err);
      })
  }

  $scope.getQuestion = function(subject){
    $scope.subjectid = subject

    console.log($scope.subjectid)
    $http.post('qna/getQuestionAnswer',{
      id: subject
    })
    .then(function success(response){
        $scope.questionList = response.data.question
        //sconsole.log($scope.questionList);
    }, function errorGet(err){
      console.log(err)
    })
    //console.log(subject)
  }

  $scope.getText = function(keyword){
    $http.post('qna/getCertainQuestion',{
      id: $scope.subjectid,
      keyword: "%"+keyword+"%"
    })
    .then(function success(response){
        $scope.questionList = response.data.question
        //sconsole.log($scope.questionList);
    }, function errorGet(err){
      console.log(err)
    })
  }

}]);