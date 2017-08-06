/*
local definition of what a user is:

*/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model

const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password

//before saving a model, run this function
userSchema.pre('save', function (next) {
  //get access to user model - it is an instance of the user model
  const user = this;

  // generate a salt, it takes some amount of time,
  //we pass a callback function so that genSalt will run after the salt has been created

  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    //hash or encypt password using the salt
    //run another callback - the result of which is hash, our encypted pw
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err); }

      //overwrite plain text password with encrypted password
      user.password = hash;

      //now go ahead and save the model
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  //this.password is our hashed and slated pw
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};
//Create the model class
//this loads the scheme into mongoose and it ccorresponds to a
//collection named user

const ModelClass = mongoose.model('user', userSchema);
//Export the model

module.exports = ModelClass;
