/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var orderSchema = new Schema({
  img: {
    type: String
    //type: Buffer,
    //data: Buffer
    //data: Buffer,
    //contentType: String
  },
  size: {
    type: String, 
    required: true
  },
  medium: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  name: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number 
  },
  email: {
    type: String
  },
  created_at: String,
  updated_at: String
},
{ collection: 'orders' });



orderSchema.pre('save', function(next) {
  var time = new Date;
  var dd = String(time.getDate()).padStart(2, '0');
  var mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = time.getFullYear();
  var hr = time.getHours();
  var min = time.getMinutes();
  if(hr<10){
    if(min<10){
      time = mm + '/' + dd + '/' + yyyy + ' 0' + hr + ':0' + min;
    }
    else{
      time = mm + '/' + dd + '/' + yyyy + ' 0' + hr + ':' + min;
    }
  }
  else{
    if(min<10){
      time = mm + '/' + dd + '/' + yyyy + ' ' + hr + ':0' + min;
    }
    else{
      time = mm + '/' + dd + '/' + yyyy + ' ' + hr + ':' + min;
    }
  }
  
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