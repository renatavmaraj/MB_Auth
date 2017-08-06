//Bunch of configuration and logic to help set up passport
//Passport helps us authenticate a user when they
//attempt to visit a route that requires authentication

const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//tell local stragey where to look in request where toget our username and pw
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function (username, password, done) {
  //Verify username and pw, call done with the user
  //if it is the correct username and pw
  //therwise, call done with false
  User.findOne({ username: username.toLowerCase() }, function (err, user) {
    if (err) { return done(err); }

    if (!user) { return done(null, false); }

    //compare passwords - is 'password' equal to user.password?
    //We saved a password with the plain text password + the salt = salt+hashedPW
    //Comparing a password for sign in will grab the salted+hashed pw from the db
  //take the salt and the submitted pw and see if the hahsed pw it
  //outputs is the stored hash pw, and the db
    //we are actually never decyoting anything , instead encrypting the submitted password, a
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err); }

      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});


//Setup options for JWT Strategy
//we need to tell this strategy where to look on incomingrequests to find
//the key
//jwtRequest tells strategy whenever a request comes in, and we want passport to
//handle it, it needs to look at request header, speciically called authorization to
//look at the token
//when we create a payload we are encoding it with some very particular secret
//whenver we use JWT STrategy we have to tell it the secret that it should use to decode
//this token
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  //to be called whenever a user tries to authenticate
  //payload is the decoded JWT Token
  //The payload coming back will
  //done is a callback function we nee to call dependingo on if we successfully authenticate user

  //See if user ID in the payload exists in our databse
  //If it does, call 'done' with that user
  //otherwise, call done without a user object
  User.findById(payload.sub, function (err, user) {
    //err is populated only if search failed
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      //call done with null because there was not an error,
      //in process of searching for user, but we didn find a user
      done(null, false);
    }
  });
});

//Tell passport to use Strategy
passport.use(jwtLogin);
passport.use(localLogin);
