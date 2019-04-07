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
      $scope.newOrder.status = "Placed";
      console.log("ORDERCONTROLLER - client")
      console.log("$scope.newOrder.img.contentType: " + $scope.newOrder.img.data);
      console.log("$scope.newOrder.img: " + $scope.newOrder.img);
      //console.log("object FileList: " + JSON.stringify($scope.newOrder.img));
      Orders.create($scope.newOrder).then(function(response) {
      $scope.orders.push({
        //img: btoa($scope.newOrder.img),
        img: $scope.newOrder.img,
        size: $scope.newOrder.size,
        medium: $scope.newOrder.medium,
        status: $scope.newOrder.status
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

  }
]);