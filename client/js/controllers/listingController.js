angular.module('users').controller('UsersController', ['$scope', 'Users', 
  function($scope, Users) {
    /* Get all the listings, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.detailedInfo = undefined;

    // form to hold new user
    $scope.form = {};

    $scope.addUser = function() {
      //console.log('MADE IT HERE');
      //console.log($scope.newUser.first);
      //console.log($scope.newUser);
      Users.create($scope.newUser).then(function(response) {
      //console.log('MADEEEEITTT');
      $scope.users.push({
        first: $scope.newUser.first,
        last: $scope.newUser.last,
        email: $scope.newUser.email,
        password: $scope.newUser.password,
        address:
          {
            street: $scope.newUser.street,
            city: $scope.newUser.city,
            state: $scope.newUser.state,
            zip: $scope.newUser.zip
          }
    });

    }, function(error) {
      console.log('Unable to add user: ', error);
    });

    }
/*

    $scope.validateUser = function() {
      User.find({email: $scope.user.first, password: $scope.user.password}, (err, people) =>{
    if (err) return res.status(500).send(err)

    // send the list of all people in database with name of "John James" and age of 36
    // Very possible this will be an array with just one Person object in it.
    return res.status(200).send(people);
});
    }

*/

    $scope.deleteUser = function(id) {
    }

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.users[index];
    };
  }
]);