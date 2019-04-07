angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      //return $http.get('https://petreeprints.herokuapp.com/api/users');
      return $http.get('http://localhost:8080/api/users');
    },

    

    read: function(id) {
      console.log("listingFactory - read: function(id) id.email: " + id.email);
      //return $http.get('https://petreeprints.herokuapp.com/api/users');
      //return $http.get('http://localhost:8080/api/users/auth', id);
      return $http.get('http://localhost:8080/api/users/' + id);

    },


    update: function(user) {
      console.log("listingFactory - update: function(user) user: " + user);
      //return $http.put('http://localhost:8080/api/users/' + id);
      return $http.put('http://localhost:8080/api/users/', user);

    },

	
	  create: function(user) {
	  // $http.post('https://petreeprints.herokuapp.com/api/users', user);
    return $http.post('http://localhost:8080/api/users', user);
    }, 

    delete: function(id) {
    //return $http.delete('https://petreeprints.herokuapp.com/api/users/' + id);
    return $http.delete('https://localhost:8080/api/users/' + id);
    }
  };

  return methods;
});
