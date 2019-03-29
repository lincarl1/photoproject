angular.module('orders').controller('OrdersController', ['$scope', 'Orders', 
  function($scope, Orders) {
    /* Get all the listings, then bind it to the scope */
    orders.getAll().then(function(response) {
      $scope.orders = response.data;
    }, function(error) {
      console.log('Unable to retrieve orders:', error);
    });

    $scope.detailedInfo = undefined;

    // form to hold new Order
    $scope.form = {};

    $scope.addOrder = function() {
      //console.log('MADE IT HERE');
      //console.log($scope.newOrder.first);
      //console.log($scope.newOrder);
      Orders.place($scope.newOrder).then(function(response) {
      //console.log('MADEEEEITTT');
      $scope.orders.push({
        img: {
		data:$scope.newOrder.data,
		contentType: String
		},
        size: $scope.newOrder.size,
        medium: $scope.newOrder.medium 
    });
	  });
	


    }


    $scope.validateOrder = function(id) {

      console.log('listingController is called (validateOrder)');
/*
      orders.find(email: $scope.Order.email).then(function(response) {
      //console.log('MADEEEEITTT');
      console.log($scope.Order);
      console.log("success");
      //window.location = "order_page.html";

    }, function(error) {
      console.log('Unable to add Order: ', error);
    });

*/

// changes read to login
  orders.read(id).then(function(response) {
      //console.log('MADEEEEITTT');
      console.log("listingController - given Order email: " + $scope.Order.email);
      console.log("id.email: " + id.email);
      console.log("id.password: " + id.password);
      console.log("listingController - Success: orders.login(id)");
      //console.log("response: " + response.email);
      //window.location = "order_page.html";

    }, function(error) {
      console.log("listingController - given Order email: " + $scope.Order.email);
      console.log('listingController- Cant find Order: ', error);
    });

/*
///////// Mar 19
  orders.findByEmail(id).then(function(response) {
      //console.log('MADEEEEITTT');
      console.log($scope.Order);
      console.log("success");
      //window.location = "order_page.html";

    }, function(error) {
      console.log($scope.Order);
      console.log('Cant find Order: ', error);
    });
*/

/*
      orders.find($scope.Order).then(function(response) {
      //console.log('MADEEEEITTT');
      console.log($scope.Order);
      console.log("success");
      //window.location = "order_page.html";

    }, function(error) {
      console.log('Cant find Order: ', error);
    });

*/


/*

      orders.find({email: $scope.Order.email, password: $scope.Order.password}).then(function(response) {
        $scope.orders != response.data;
        orders.getAll().then(function(response) {
          $scope.orders=response.data;
        }, function(error) {
          console.log("can't get orders", error);
        });
        console.log("find successful");
      }, function(error) {
        console.log("Couldn't find", error);
      });
*/


/*
      orders.find({email: $scope.Order.email, password: $scope.Order.password}).then(function(response) {
        console.log('Goodjob');
        //window.location="order_page.html";
      }, function(error) {
        alert ("Login was unsuccessful, please check your Ordername and password");
        console.log('Badjob');
      })

*/

      /*
      orders.find({email: $scope.Order.email, password: $scope.Order.password}, (err, people) =>{
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



    $scope.deleteOrder = function(id) {
    }

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.orders[index];
    };
  }
]);