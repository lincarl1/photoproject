angular.module('users').controller('UsersController', ['$scope', 'Users', 
  function($scope, Users) {
    /* Get all the users, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.detailedInfo = undefined;

    // this user session
    $scope.thisuser = undefined;

    // form to hold new user
    $scope.form = {};


    $scope.addUser = function() {
      var userbool = 0;

      Users.create($scope.newUser).then(function(response) {
      sessionStorage['thisuser'] = JSON.stringify(response.data);
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
      
      // read is login
      Users.read(id2).then(function(response) {
      console.log("listingController - given user email: " + $scope.user.email);
      sessionStorage['thisuser'] = JSON.stringify(response.data);
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


    $scope.updateUser = function() {
      if($scope.editedUser == null){
        alert("No changes made.");
      }
      else if($scope.editedUser.password == null){
        alert("Please enter password.")
      }
      else
      {
        var thisuser2 = JSON.parse(sessionStorage['thisuser']);
        if($scope.editedUser._id == null){
          $scope.editedUser._id = thisuser2._id;
        }
        if($scope.editedUser.first == null || $scope.editedUser.first == ""){
          $scope.editedUser.first = thisuser2.first;
        }
        if($scope.editedUser.last == null || $scope.editedUser.last == ""){
          $scope.editedUser.last = thisuser2.last;
        }
        if($scope.editedUser.email == null || $scope.editedUser.email == ""){
          $scope.editedUser.email = thisuser2.email;
        }
        /*
        if($scope.editedUser.password == null){
          $scope.editedUser.password = thisuser2.password;
        }
        */
        if($scope.editedUser.address == null){
          $scope.editedUser.address = thisuser2.address;
        }
        else
        {
          if($scope.editedUser.address.street == null || $scope.editedUser.address.street == ""){
            $scope.editedUser.address.street = thisuser2.address.street;
          }
          if($scope.editedUser.address.city == null || $scope.editedUser.address.city == ""){
            $scope.editedUser.address.city = thisuser2.address.city;
          }
          if($scope.editedUser.address.state == null || $scope.editedUser.address.state == ""){
            $scope.editedUser.address.state = thisuser2.address.state;
          }
          if($scope.editedUser.address.zip == null || $scope.editedUser.address.zip == ""){
            $scope.editedUser.address.zip = thisuser2.address.zip;
          }
        }


        //var id2 = JSON.stringify(id);
        var newEdit = JSON.stringify($scope.editedUser);
        Users.update(newEdit).then(function(response) {
         // console.log(JSON.stringify(response.data));
        sessionStorage['thisuser'] = JSON.stringify(response.data);
        window.location = "account_page.html";
        console.log("listingController - Success: Users.update");

        }, function(error) {
        window.alert("Problem updating account.\nTry again.");
        console.log('listingController- Cant find user: ', error);
        });
        
      }  // end main else
      console.log("updateUser: " + JSON.stringify($scope.editedUser));

    }


    $scope.showDetails = function(user) {
      //$scope.detailedInfo = $scope.users[index];
      $scope.detailedInfo = user;

    };

    $scope.showUser = function() {
      if(sessionStorage['thisuser'] == null) {
        window.location = "index.html";
      }
      var thisuser2 = JSON.parse(sessionStorage['thisuser']);
      //$scope.detailedInfo = $scope.users[index];
      $scope.thisuser = thisuser2;

    };



  }
]);