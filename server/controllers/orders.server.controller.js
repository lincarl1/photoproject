/* Dependencies */
var mongoose = require('mongoose'),
    Order = require('../models/orders.server.model.js');

/* Create an order */
exports.create = function(req, res) {

  /* Instantiate an Order */
  var order = new Order(req.body);
  // TESTING

  //console.log("exports.create: order.img: " + JSON.stringify(order));
  
  //order.img.data = fs.readFileSync(req.files.userPhoto.path)
  //order.img.data = order.img;
  //order.img.contentType = 'image/png';
  
  // END TESTING
  /* Then save the order */
  order.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};



/* Retreives all the orders, sorted by oldest date first */
exports.list = function(req, res) {
  Order.find().sort({created_at: -1}).exec(function(err, order){
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};

/*
exports.read = function(req, res) {
  var order = req.order;
  Order.find({id: order._id}).sort({created_at: -1}).exec(function(err, order){
    if(err){
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};
*/


exports.read = function(req, res) {
  console.log("req.order: " + req.order);
  var order = req.order;
  console.log("In listings.server.controller.js");
  console.log("req.id: " + req.id);
  var id = req.id;
  console.log("exports.read: id: " + id);
  console.log("exports.read: order: " + order);
  if(id==null)
  {
    console.log("id is null?");
    res.status(400).send(error);
  }
  else
  {
    Order.find({user_id: id}, function(err, orders){
      if(err){
        console.log("Error in exports.read: " + err);
        res.status(400).send(err);
      }
      else
      {
        res.json(orders);
      }
    });
  }
  /*

  if(order==null)
  {
    console.log("ordel is null?");
    var error = "Order is null in exports.read.";
    res.status(400).send(error);
  }
  else
  {
    User.findOne({user_id: order.user_id},function(err){
      if(err){
        console.log("Error in exports.read: " + err);
        res.status(400).send(err);
      } else {
      res.json(order);
      //res.status(200);
      //console.log("email given: " + inputeduser.email);

    }
    
  });

  }
  */

};



/*
exports.orderuserByID = function(req, res, next, id) {
  console.log("id: " + id);
  //var user = id.user;
  //console.log(req);
  var id = JSON.parse(id);
  console.log("orders.server.controller: exports.orderuserByID");
  console.log("id: ");
  console.log(JSON.stringify(id, null, 4));

  User.find({user_id: id._id}).exec(function(err, order) {
    if(err) 
    {
      res.status(404).send(err);
    } 
    else 
    {
      if(order == null)
      {
        res.status(404).send(err);
      }
      else 
      {
        req.order = order;
          console.log("finished findOne");
          console.log("req.order: " + req.order);
          next();
      }    
    }
  });

};
*/


exports.orderByID = function(req, res, next, id) {
  //var user = id.user;
  //console.log(req);
  /*
  var id = JSON.parse(id);
  console.log("id: ");
  console.log(JSON.stringify(id, null, 4));
  */
  console.log("made it");
  console.log("orders.server.controller: exports.orderByID");
  console.log("id: " + id);
  req.id = id;
  next();
  /*
  User.find({user_id: id._id}).exec(function(err, order) {
    if(err) 
    {
      res.status(404).send(err);
    } 
    else 
    {
      if(order == null)
      {
        res.status(404).send(err);
      }
      else 
      {
        req.user = user;
        console.log("finished findOne");
        console.log("req.user: " + req.user);
        next();
      }      
    }
  });

  */
  /*
  Order.find({user_id: id}).exec(function(err, order) {
    if(err) {
      res.status(404).send(err);
    } else {
      req.order = order;
      next();
    }
  });
  */
  
};
