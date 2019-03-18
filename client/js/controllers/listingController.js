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


    $scope.validateUser = function() {

      console.log('MADE IT HERE');



      Users.find($scope.user).then(function(response) {
      //console.log('MADEEEEITTT');
      console.log($scope.user);
      console.log("success");
      //window.location = "order_page.html";

    }, function(error) {
      console.log('Unable to add user: ', error);
    });


/*

      Users.find({email: $scope.user.email, password: $scope.user.password}).then(function(response) {
        $scope.users != response.data;
        Users.getAll().then(function(response) {
          $scope.users=response.data;
        }, function(error) {
          console.log("can't get users", error);
        });
        console.log("find successful");
      }, function(error) {
        console.log("Couldn't find", error);
      });
*/


/*
      Users.find({email: $scope.user.email, password: $scope.user.password}).then(function(response) {
        console.log('Goodjob');
        //window.location="order_page.html";
      }, function(error) {
        alert ("Login was unsuccessful, please check your username and password");
        console.log('Badjob');
      })

*/

      /*
      Users.find({email: $scope.user.email, password: $scope.user.password}, (err, people) =>{
    if (err){console.log('Badjob');
    return res.status(500).send(err);
  } 
    // send the list of all people in database with name of "John James" and age of 36
    // Very possible this will be an array with just one Person object in it.
    console.log('Goodjob');
    return res.status(200).send(people);
});
*/
    }



    $scope.deleteUser = function(id) {
    }

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.users[index];
    };
  }
]);