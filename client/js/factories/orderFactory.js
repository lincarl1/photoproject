angular.module('orders', []).factory('Orders', function($http) {
  var methods = {
    getAll: function() {
      //return $http.get('https://petreeprints.herokuapp.com/api/orders');
      return $http.get('http://localhost:8080/api/orders');
    },

    read: function(id) {
      console.log("orderFactory - read: function(id) id: " + id);
      //return $http.get('https://petreeprints.herokuapp.com/api/orders/' + id);
      return $http.get('http://localhost:8080/api/orders/' + id);
    },

	  create: function(order) {
    console.log("orderFactory - create");
	  // $http.post('https://petreeprints.herokuapp.com/api/orders', order);
    return $http.post('http://localhost:8080/api/orders', order);
    },

    update: function(order) {
    console.log("orderFactory - update: function(order) order: " + order);
    //return $http.put('http://localhost:8080/api/users/' + id);
    return $http.put('http://localhost:8080/api/orders/', order);

    }

  };

  return methods;
});
