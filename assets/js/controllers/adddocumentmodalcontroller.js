app.controller('documentModalController', [
  '$scope', '$element', 'title', 'close', 
  function($scope, $element, title, close) {

  $scope.title = title;
  $scope.tagging;

  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    var tags = [];
    angular.forEach($scope.tagging, function(value) {
      this.push(value['text']);
    }, tags);

    $scope.data['tags'] = tags.toString();
 	  close($scope.data, 500); // close, but give 500ms for bootstrap to animate
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