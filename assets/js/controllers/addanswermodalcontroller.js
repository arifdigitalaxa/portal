app.controller('answerModalController', [
  '$scope', '$element', 'title', 'question', 'close', 
  function($scope, $element, title, question, close) {

  $scope.title = title;
  $scope.questionList = question
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close($scope.answer, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close(null, 500); // close, but give 500ms for bootstrap to animate
  };

}]);