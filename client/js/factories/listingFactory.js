angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      //return $http.get('https://petreeprints.herokuapp.com/api/users');
      return $http.get('http://localhost:8080/api/users');
    },

    /*

    validateUser: function(id) {
      //return $http.get('https://petreeprints.herokuapp.com/api/users');
      return $http.get('http://localhost:8080/api/users' + id);
    },
    */
	
	  create: function(user) {

	  // $http.post('https://petreeprints.herokuapp.com/api/users', user);
    return $http.post('http://localhost:8080/api/users', user);
    console.log('reached create');
    }, 

    delete: function(id) {
    //return $http.delete('https://petreeprints.herokuapp.com/api/users/' + id);
    return $http.delete('https://localhost:8080/api/users/' + id);
    }
  };

  return methods;
});
