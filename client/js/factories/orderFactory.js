angular.module('orders', []).factory('Orders', function($http) {
  var methods = {
    getAll: function() {
      //return $http.get('https://petreeprints.herokuapp.com/api/users');
      return $http.get('http://localhost:8080/api/orders');
    },

	  create: function(order) {
	  // $http.post('https://petreeprints.herokuapp.com/api/users', user);
    return $http.post('http://localhost:8080/api/orders', order);
    }

  };

  return methods;
});
