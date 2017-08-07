const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function (req, res, next) {
 //User has already had their email and password auth'd
 //Give token
 res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).send({ error: 'You must provide a username and password ' });
  }

  //See if user with given username exists
  User.findOne({ username: username }, function (err, existingUser) {
    if (err) { return next(err); }

    //if user with username does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    //if a user with username does NOT exist, create and save user record
    const user = new User({
      username: username,
      password: password,
     });

    user.save(function (err) {
      if (err) { return next(err); }
    });

    //respond to request indicating user was created
    //send back identifying token
    res.json({ token: tokenForUser(user) });
  });
};
