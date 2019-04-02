angular.module('users').controller('UsersController', ['$scope', 'Users', 
  function($scope, Users) {
    /* Get all the users, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.detailedInfo = undefined;

    // form to hold new user
    $scope.form = {};


    $scope.addUser = function() {
      var userbool = 0;

      Users.create($scope.newUser).then(function(response) {
      window.location = "order_page.html";
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
      window.alert("Missing information or user already exists. Try again.");
      console.log('Unable to add user: ', error);

    });

    }


    $scope.validateUser = function(id) {

      console.log('listingController is called (validateUser)');
      var adminbool = 0;
      if(id.email=='admin' && id.password =='admin')
      {
        adminbool =1;
      }

      console.log('adminbool: ' + adminbool);

      var id2 = JSON.stringify(id);
      
      // changes read to login
      Users.read(id2).then(function(response) {
      console.log("listingController - given user email: " + $scope.user.email);
      if(adminbool)
      {
        window.location = "admin_page.html";
      }
      else
      {
        window.location = "order_page.html";
      }
      
      //console.log("response: " + response.email);
      ////window.location = "order_page.html";
      console.log("listingController - Success: Users.login(id)");

    }, function(error) {
      window.alert("User with that email or password does not exist.\nCreate an account or try again.");
      console.log('listingController- Cant find user: ', error);
    });

}



    $scope.deleteUser = function(id) {
    }

    $scope.showDetails = function(user) {
      //$scope.detailedInfo = $scope.users[index];
      $scope.detailedInfo = user;

    };

  }
]);