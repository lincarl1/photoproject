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