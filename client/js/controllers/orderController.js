angular.module('orders').controller('OrdersController', ['$scope', 'Orders', 
  function($scope, Orders) {
    /* Get all the orders, then bind it to the scope */
    Orders.getAll().then(function(response) {
      //$scope.orders = response.data;
      if(window.location.href.indexOf("account_page") > -1) {
       //alert("your url contains the name franky");
      }
      else
      {
        $scope.orders = response.data;
      }
    }, function(error) {
      console.log('Unable to retrieve orders:', error);
    });

    $scope.detailedInfo = undefined;

    // form to hold new order
    $scope.form = {};

    $scope.addOrder = function() {
      var thisuser2 = JSON.parse(sessionStorage['thisuser']);
      console.log("current user: " + sessionStorage['thisuser']);
      $scope.newOrder.status = "Placed";
      console.log("ORDERCONTROLLER - client")
      console.log("$scope.newOrder.img: " + $scope.newOrder.img);
/*
      switch($scope.newOrder.size){
        case "130x400": $scope.newOrder.price = 10.50;
      }
      if($scope.newOrder.size=="130x400")
      {
        $scope.newOrder.price = 10.50;
      }
*/    // get name, address, email from user session
      $scope.newOrder.name = thisuser2.first + " " + thisuser2.last;
      
      $scope.newOrder.email = thisuser2.email;

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


    $scope.showDetails = function(order) {
      console.log("order: " + order);
      $scope.detailedInfo = order;
      //var base64result = order.img.substr(order.img.indexOf(',') + 1);
      //$scope.detailedInfo.img = atob(base64result);

    };

    $scope.showImage = function(img, alt) {
        //window.location = img;
        var win = window.open();
        win.document.write('<iframe src="' + img  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
      };


    $scope.findOrders = function() {
      console.log('orderController is called (findOrders)');
      var thisorder = JSON.parse(sessionStorage['thisuser']);
      console.log('thisorder: ' + thisorder);

      var thisorder2 = JSON.stringify(thisorder);
      console.log('thisorder2: ' + thisorder2);
      console.log('thisorder._id ' + thisorder._id);
      console.log('thisorder2._id ' + thisorder2._id);
      //var id2 = JSON.stringify(id);
      
      Orders.read(thisorder._id).then(function(response) {
      //  console.log("response: " + response.data);
      //console.log("orderController - given user id: " + $scope.user._id);
      $scope.orders = response.data;
      
      //console.log("response: " + response.email);
      console.log("orderController - Success: Orders.read(id2)");

    }, function(error) {
      window.alert("No orders have been placed.");
      console.log('orderController- Cant find orders: ', error);
    });

    }



  }
]);