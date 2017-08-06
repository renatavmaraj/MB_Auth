const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

//some anout of info that is going to be encoded using our secret string
//first arg : info that we're going to encode
//second arg: secret that we're going to use to encrypt it
//user's username can change over time, and
//if they want to change their username and
//then they have some existing tokens that make
//reference to an old username thatm ight lead to weird stuff.
//once we create a user, they will always have same ID
//we will just encode the ID
//second thign to think about is that it's an object, we need to assign the id to some key
//jwt is a standard/convention as a convention json web
//tokesn have a sub property which is short
//for subject, meaning who is this token about? who does this token belong to
//the subject of this token is this very specific user.
//iat is another convention of days on web tokens and it stands for issued at thime
//a

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function (req, res, next) {
 //User has already had their email and password auth'd
 //We just need to give them a token
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
    //422 couldn't process this
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
