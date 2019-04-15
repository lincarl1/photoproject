angular.module('orders').controller('OrdersController', ['$scope', 'Orders', 
  function($scope, Orders) {
    /* Get all the orders, then bind it to the scope */
    Orders.getAll().then(function(response) {
      //$scope.orders = response.data;
      // checks if href is account_page.html
      // if so, don't bind all orders, only bind orders through findOrders()
      if(window.location.href.indexOf("account_page") > -1) {
       //do nothing with getAll()
      }
      else
      {
        // if not on account page, bind all orders
        $scope.orders = response.data;
      }
    }, function(error) {
      console.log('Unable to retrieve orders:', error);
    });

    $scope.detailedInfo = undefined;

    // form to hold new order
    //$scope.form = {};


    // When order is placed -> call addOrder to add to database
    $scope.addOrder = function() {
      console.log("ORDERCONTROLLER - client");
      // gets user data from browser (saved through showUser() in listingController)
      var thisuser2 = JSON.parse(sessionStorage['thisuser']);
      console.log("current user: " + sessionStorage['thisuser']);
      
      
      console.log("$scope.newOrder.img: " + $scope.newOrder.img);
/*
//PRICING?
      switch($scope.newOrder.size){
        case "130x400": $scope.newOrder.price = 10.50;
      }
      if($scope.newOrder.size=="130x400")
      {
        $scope.newOrder.price = 10.50;
      }
*/    
      // set default to pending? in progress?
      $scope.newOrder.status = "Pending";

      // get name, address, email, _id from user session
      $scope.newOrder.name = thisuser2.first + " " + thisuser2.last;
      
      $scope.newOrder.email = thisuser2.email;

      // ._id: only item that is 100% unique and cannot be changed by the user
      $scope.newOrder.user_id = thisuser2._id;

      $scope.newOrder.address = thisuser2.address;
      $scope.newOrder.address.street = thisuser2.address.street;
      $scope.newOrder.address.city = thisuser2.address.city;
      $scope.newOrder.address.state = thisuser2.address.state;
      $scope.newOrder.address.zip = thisuser2.address.zip;
      
      //$scope.newOrder.address = thisuser2.address.street + "\n" + thisuser2.address.city + ", " + thisuser2.address.state " " + thisuser2.address.zip;
      Orders.create($scope.newOrder).then(function(response) {
      $scope.orders.push({
        //img: btoa($scope.newOrder.img),
        img: $scope.newOrder.img,
        size: $scope.newOrder.size,
        medium: $scope.newOrder.medium,
        status: $scope.newOrder.status,
        name: $scope.newOrder.name,
        address: $scope.newOrder.address,
        email: $scope.newOrder.email,
        user_id: $scope.newOrder.user_id
    });

    }, function(error) {
      console.log('Unable to add order: ', error);
    });

    }

    // Show order details
    $scope.showDetails = function(order) {
      console.log("order: " + order);
      $scope.detailedInfo = order;
      //var base64result = order.img.substr(order.img.indexOf(',') + 1);
      //$scope.detailedInfo.img = atob(base64result);

    };

    // Current download button on admin page
    $scope.showImage = function(img, alt) {
        //window.location = img;
        var win = window.open();
        win.document.write('<iframe src="' + img  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
      };

    // Populates account page with placed orders
    $scope.findOrders = function() {
      console.log('orderController is called (findOrders)');
      var thisorder = JSON.parse(sessionStorage['thisuser']);
      console.log('thisorder._id ' + thisorder._id);
      

      Orders.read(thisorder._id).then(function(response) {
      // binds user's orders to scope
      $scope.orders = response.data;
      
      console.log("orderController - Success: Orders.read(thisorder._id)");

    }, function(error) {
      window.alert("Error reading orders.");
      console.log('orderController- Cant find orders: ', error);
    });

    }




    // Update order (admin use only)
    $scope.updateOrder = function() {
      if($scope.editedOrder == null){
        alert("No changes made.");
      }
      else
      {

        // following if's: account for unchanged values, set as original values
        if($scope.editedOrder._id == null){
          $scope.editedOrder._id = $scope.detailedInfo._id;
        }

/*
        if($scope.editedUser.first == null || $scope.editedUser.first == ""){
          $scope.editedUser.first = thisuser2.first;
        }
        if($scope.editedUser.last == null || $scope.editedUser.last == ""){
          $scope.editedUser.last = thisuser2.last;
        }
        if($scope.editedUser.email == null || $scope.editedUser.email == ""){
          $scope.editedUser.email = thisuser2.email;
        }
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
*/
        var newEdit = JSON.stringify($scope.editedOrder);
        Orders.update(newEdit).then(function(response) {
        
        // Manually refresh to show changes made
        window.location = "admin_page.html";
        console.log("listingController - Success: Users.update");

        }, function(error) {
        window.alert("Problem updating order.\nTry again.");
        console.log('orderController- Cant find order: ', error);
        });
        
      }  // end main else
      console.log("updateOrder: " + JSON.stringify($scope.editedOrder));

    }



  }
]);