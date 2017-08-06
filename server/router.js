const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//when a user is authenticated don't create a session for them
//assport wants to do cookie based authenticaiton so we told them dont do it
//middleware
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignin = passport.authenticate('local', { session: false });
/*
- exports a function from this file
- import the function into index.js
-pass app into that function

define a route the user can visit

get maps directly to the type of http request we want to handle
first arguement is route we are trying to handle
funciton gets called with three arguments
req - object that represnts incoming http request,
a lot of data about the actual request, where it's coming from, what route it's looking for,

res - argument that represnets the response that we're going to form up and send back

next - error handling

requireSignin: before a user can go to the signin route handler we will rquire signin

*/
module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });

  app.post('/signin', requireSignin, Authentication.signin);

  app.post('/signup', Authentication.signup);
};
