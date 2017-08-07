const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define user model

const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    //Encypt password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err); }

      //Overwrite plain text password with encrypted password
      user.password = hash;

      //Save the model
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

//Create model class

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
