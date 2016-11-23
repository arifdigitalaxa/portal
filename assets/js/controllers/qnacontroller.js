app.controller('qnaController',['$scope','$http','dataTrans','$window','FileSaver',function($scope,$http,dataTrans,$window,FileSaver) {
  
  $scope.subproduct;
  $scope.subjectList;
  $scope.questionList;
  $scope.subjectid;
  $scope.keyword = '';

  var converter = new showdown.Converter()

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
      $http.post('qna/getSubProductSubjects',{
        id: $window.sessionStorage.subproductID
      })
      .then(function success(response){
          
          $scope.subproduct = response.data.subproduct
          $scope.subjectList = response.data.subject

          $http.post('/admin/getFileList',{
            id: $window.sessionStorage.subproductID
          }).then(function getFile(file){
            $scope.fileList = file.data
          }, function errFound(err){
              console.log(err);
          })

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

  $scope.returnHtml = function(answer){
    return converter.makeHtml(answer);
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

}])
.filter('highlight', function($sce) {
  return function(text, phrase) {
    if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
      '<span class="highlighted">$1</span>')
            
      return $sce.trustAsHtml(text)
    }
});