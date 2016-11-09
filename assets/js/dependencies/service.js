app.factory('dataTrans', function() {
  var data = null;
  var user = null;

  var addData = function(newObj) {
      data = newObj;
  };

  var getData = function(){
      return data;
  };

  return {
    addData: addData,
    getData: getData
  };

});