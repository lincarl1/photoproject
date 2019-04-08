angular.module('orders').controller('OrdersController', ['$scope', 'Orders', 
  function($scope, Orders) {
    /* Get all the orders, then bind it to the scope */
    Orders.getAll().then(function(response) {
      $scope.orders = response.data;
    }, function(error) {
      console.log('Unable to retrieve orders:', error);
    });

    $scope.detailedInfo = undefined;
	
    // form to hold new order
    $scope.form = {};

    $scope.addOrder = function() {

      Orders.create($scope.newOrder).then(function(response) {
      //console.log('MADEEEEITTT');
      $scope.orders.push({
        size: $scope.newOrder.size,
        medium: $scope.newOrder.medium,
		totalprice: $scope.newOrder.totalprice
    });

    }, function(error) {
      console.log('Unable to add order: ', error);
    });

    }


    $scope.showDetails = function(order) {
      console.log("order: " + order);
	  var x, y;
	switch(order.size) {
	case "640x480":
	x = 2.00;
	break; 
	case "1024x768":
	x = 3.00;
	break;
	case "1536x1024":
	x = 4.00; 
	break; 
	}
	
	switch(order.medium) {
	case "collage":
	y = 10.50;
	break;
    case "paper cutting":
	y = 13.50;
	break;
	case "transparencies":
	y = 15.50;
	break;
	case "black and white":
	y = 8.50;
	break;
	}
	order.totalprice = x+y;
      $scope.detailedInfo = order;
	
    };

  }
]);