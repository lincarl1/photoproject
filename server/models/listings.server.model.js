/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  first: {
    type: String, 
    required: true
  },
  last: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }, 
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number 
  },
  created_at: String,
  updated_at: String
});

var orderSchema = new Schema({
  img:
    { data: Buffer 
	},
  size:
  {
  type: String,
  required: true
  },
  medium:
  {
  type: String,
  required: true
  }
});	

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
/*
userSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});
*/
userSchema.pre('save', function(next) {
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
var User = mongoose.model('User', userSchema);
var Order = mongoose.model('Order', orderSchema);
/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
module.exports = Order;
