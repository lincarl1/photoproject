angular.module('orders', []).factory('Orders', function($http) {
  var methods = {
    getAll: function() {
      //return $http.get('https://petreeprints.herokuapp.com/api/orders');
      return $http.get('http://localhost:8080/api/orders');
    },


    read: function(id) {
      //console.log("orderFactory - read: function(id) id.email: " + id.email);
      //return $http.get('https://petreeprints.herokuapp.com/api/orders');
      return $http.get('http://localhost:8080/api/orders/' + id);
    },

	  create: function(order) {
    console.log("ORDERFACTORY - client");
	  // $http.post('https://petreeprints.herokuapp.com/api/orders', order);
    return $http.post('http://localhost:8080/api/orders', order);
    }

  };

  return methods;
});
