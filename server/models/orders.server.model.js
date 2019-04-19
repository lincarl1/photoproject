/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var orderSchema = new Schema({
  size: {
    type: String, 
    required: true
  },
  medium: {
    type: String,
    required: true
  },
  price: {
	mediumPrice: Number, 
	sizePrice: Number,
	totalPrice: Number
  },
  created_at: String,
  updated_at: String
});



orderSchema.pre('save', function(next) {
  var time = new Date;
  var dd = String(time.getDate()).padStart(2, '0');
  var mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = time.getFullYear();
  var hr = time.getHours();
  var min = time.getMinutes();
  time = mm + '/' + dd + '/' + yyyy + ' ' + hr + ':' + min;
  this.updated_at = time;
  if(!this.created_at)
  {
    this.created_at = time;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Order = mongoose.model('Order', orderSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Order;