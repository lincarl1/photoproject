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
		price: {
		mediumPrice: $scope.newOrder.mediumPrice,
		sizePrice: $scope.newOrder.sizePrice,
		totalprice: $scope.newOrder.mediumPrice+$scope.newOrder.sizePrice
		}
    });

    }, function(error) {
      console.log('Unable to add order: ', error);
    });

    }

	$scope.getMediumPrice = function(med) {
		switch(med) {
		case "collage":
		return 2.00; 
		break;
		case "paper cutting":
		return 4.00;
		break;
		case "transparencies":
		return 7.50;
		break;
		case "black and white":
		return 3.50;
		break;
		}
	}; 
	
	$scope.getSizePrice = function(med) {
		switch(med) {
		case "640x480":
		return 7.00; 
		break;
		case "1024x768":
		return 10.50;
		break;
		case "1536x1024":
		return 15.50;
		break;
		}
	}; 
    $scope.showDetails = function(order) {
	if(order.medium != null && order.size != null) {
	order.totalprice = $scope.getMediumPrice(order.medium) + $scope.getSizePrice(order.size);
	}
	else{
	order.totalprice = "Calculating price";	
	}
	console.log(order.totalprice);
    $scope.detailedInfo = order;
    };

  }
]);