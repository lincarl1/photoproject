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
   

      // set size if custom
      if($scope.newOrder.size_width != null && $scope.newOrder.size_height != null)
      {
        $scope.newOrder.size = $scope.newOrder.size_width + "x" + $scope.newOrder.size_height;
      }

      // set default to pending? in progress?
      $scope.newOrder.status = "Pending";

      // get name, address, email, _id from user session
      ////$scope.newOrder.name = thisuser2.first + " " + thisuser2.last;
      
      $scope.newOrder.email = thisuser2.email;

      // ._id: only item that is 100% unique and cannot be changed by the user
      $scope.newOrder.user_id = thisuser2._id;

      /*
      $scope.newOrder.address = thisuser2.address;
      $scope.newOrder.address.street = thisuser2.address.street;
      $scope.newOrder.address.city = thisuser2.address.city;
      $scope.newOrder.address.state = thisuser2.address.state;
      $scope.newOrder.address.zip = thisuser2.address.zip;
      */
      
      //$scope.newOrder.address = thisuser2.address.street + "\n" + thisuser2.address.city + ", " + thisuser2.address.state " " + thisuser2.address.zip;
      Orders.create($scope.newOrder).then(function(response) {
        window.location = "verification.html";
        $scope.orders.push({
        //img: btoa($scope.newOrder.img),
        img: $scope.newOrder.img,
        size: $scope.newOrder.size,
        medium: $scope.newOrder.medium,
        totalPrice: $scope.newOrder.totalPrice,
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
    $scope.reviewOrder = function(order) {
      if(order==null)
      {
        return 0;
      }
      if(order.size_width != null && order.size_height != null)
      {
        order.size = order.size_width + "x" + order.size_height;
      }

      var thisuser2 = JSON.parse(sessionStorage['thisuser']);
      
      order.name = thisuser2.first + " " + thisuser2.last;
      order.email = thisuser2.email;
      order.address = thisuser2.address;
      order.address.street = thisuser2.address.street;
      order.address.city = thisuser2.address.city;
      order.address.state = thisuser2.address.state;
      order.address.zip = thisuser2.address.zip;

      console.log("order: " + order);
      $scope.detailedInfo = order;
      //var base64result = order.img.substr(order.img.indexOf(',') + 1);
      //$scope.detailedInfo.img = atob(base64result);

    };

        // Show order details
    $scope.showDetails = function(order) {
      console.log("order: " + order);
      $scope.detailedInfo = order;
      //var base64result = order.img.substr(order.img.indexOf(',') + 1);
      //$scope.detailedInfo.img = atob(base64result);

    };

    $scope.downloadImage = function(imgsrc) {
      // atob to base64_decode the data-URI
      var imgdata = atob(imgsrc.split(',')[1]);
      // Convert the binary data to a Blob
      var arrbuff = new ArrayBuffer(imgdata.length);
      var intarr = new Uint8Array(arrbuff);
      for (var i=0; i<imgdata.length; i++) {
          intarr[i] = imgdata.charCodeAt(i) & 0xff;
      }
      try {
          var blob = new Blob([arrbuff], {type: 'application/octet-stream'});
      } catch (err) {
          // Older browser support
          var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
          bb.append(arrbuff);
          var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
      }
      // Create a temporary URL
      var url = (window.webkitURL || window.URL).createObjectURL(blob);
      // Download
      location.href = url;
    }

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











    /*NEWSTUFF*/
    $scope.getMediumPrice = function(med) {
      switch(med) {
        case "Glossy Photo Paper":
        return 5.00;
        break;
        case "Semigloss Photo Paper":
        return 6.00;
        break;
        case "Luster Photo Paper":
        return 7.00;
        break;
        case "Semimatte Photo Paper":
        return 8.00;
        break;
        case "Commercial Proofing Paper":
        return 4.00;
        break;
        case "White Semimatte Proofing Paper":
        return 4.59;
        break;
        case "Publication Proofing Paper":
        return 5.00;
        break;
        case "Singleweight Matte Paper":
        return 6.00;
        break;
        case "Doubleweight Matte Paper":
        return 6.59;
        break;
        case "Enhanced Matte Paper":
        return 7.00;
        break;
        case "Somerset Velvet":
        return 7.59;
        break;
        case "Presentation Matte Paper":
        return 8.00;
        break;
        case "UltraSmooth Fine Art Paper":
        return 5.00;
        break;
        case "Textured Fine Art Paper":
        return 5.25;
        break;
        case "Velvet Fine Art Paper":
        return 5.59;
        break;
        case "Watercolor Paper":
        return 5.75;
        break;
        case "Canvas Satin":
        return 6.00;
        break;
        case "Canvas Matte":
        return 6.25;
        break;
      }
    };

    $scope.getSizePrice = function(size) {
      switch(size) {
        case "10x10":
        return 10.00;
        break;
        case "13x13":
        return 13.00;
        break;
        case "16x16":
        return 16.00;
        break;
        case "17x17":
        return 17.00;
        break;
        case "24x24":
        return 24.00;
        break;
        case "36x36":
        return 36.00;
        break;
        case "44x44":
        return 44.00;
        break;
        case "10":
        return 15.00;
        break;
        case "13":
        return 18.00;
        break;
        case "16":
        return 21.00;
        break;
        case "17":
        return 22.00;
        break;
        case "24":
        return 29.00;
        break;
        case "36":
        return 41.00;
        break;
        case "44":
        return 49.00;
        break;
        default:
        return 60.00;


      }
    };

    $scope.getPrice = function(order) {
      if(order == null)
      {
        return 0;
      }
      
      if(order.size_width != null)
      {
        order.size = order.size_width
      }
      
      if(order.medium != null && order.size != null)
      {
        order.totalPrice = $scope.getMediumPrice(order.medium)
        + $scope.getSizePrice(order.size);
        $scope.mediumPrice = $scope.getMediumPrice(order.medium);
        $scope.sizePrice = $scope.getSizePrice(order.size);
      }
      
      else if (order.medium !=null && order.size==null)
      {
        order.totalPrice = $scope.getMediumPrice(order.medium);
        $scope.mediumPrice = $scope.getMediumPrice(order.medium);
      }
      

      else if (order.size !=null && order.medium==null)
      {
        order.totalPrice = $scope.getSizePrice(order.size);
        $scope.sizePrice = $scope.getSizePrice(order.size);
      }
      else
      {
        order.totalPrice = "";
      }
      if(order.size_width != null)
      {
        order.size = order.size_width + "x" + order.size_height;
      }
      console.log(order.totalPrice);
      $scope.price = order.totalPrice;
      $scope.detailedInfo = order;


    };

    /*ENDNEWSTUFF*/



  }
]);