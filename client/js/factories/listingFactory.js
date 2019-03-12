angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://petreeprints.herokuapp.com/api/users');
    },
	
	  create: function(user) {
	  return $http.post('https://petreeprints.herokuapp.com/api/users', user);
    }, 

    delete: function(id) {
    return $http.delete('https://petreeprints.herokuapp.com/api/users/' + id);
    }
  };

  return methods;
});
