/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    // password hashing
    bcrypt = require('bcrypt'), 
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
},
{ collection: 'users' });

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

userSchema.pre('save', function (next) {
  var user = this;
  this.hashPassword(user.password, function(err, hash) {
    if(err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// password hash/salt
userSchema.methods.hashPassword = function(candidatePassword, cb) {
  bcrypt.genSalt(11, function(err, salt) {
    if(err)
    {
      console.log(err);
      return cb(err);
    }
    bcrypt.hash(candidatePassword, salt, function(err, hash) {
      if(err)
      {
        console.log(err);
        return cb(err);
      }
      return cb(null, hash);
    });
  });
};

// password login check
userSchema.methods.comparePassword = function(candidatePassword, hashedPassword, cb) {
  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
    if(err){
      return cb(err);
    }
    return cb(null, isMatch);

  });
};


/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
