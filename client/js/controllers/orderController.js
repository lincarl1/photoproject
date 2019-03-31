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
        medium: $scope.newOrder.medium
    });

    }, function(error) {
      console.log('Unable to add order: ', error);
    });

    }


    $scope.showDetails = function(order) {
      console.log("order: " + order);
      $scope.detailedInfo = order;

    };

  }
]);