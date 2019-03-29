angular.module('orders', []).factory('Orders', function($http) {
  var methods = {
    getAll: function() {
      //return $http.get('https://petreeprints.herokuapp.com/api/orders');
      return $http.get('http://localhost:8080/api/orders');
    },


	
	place: function(order) {
	  // $http.post('https://petreeprints.herokuapp.com/api/orders', order);
    return $http.post('http://localhost:8080/api/orders', order);
    }, 

    delete: function(id) {
    //return $http.delete('https://petreeprints.herokuapp.com/api/orders/' + id);
    return $http.delete('https://localhost:8080/api/orders/' + id);
    }
  };

  return methods;
});
