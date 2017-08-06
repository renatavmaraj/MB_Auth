//Main starting point of app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup
//Creates a new DB called auth
mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ 'type': '*/*' }));
router(app);

/*
1. morgan and bodyparser are middleware.
-all incoming requests will be passed through middlware
-morgan is a logging framework. it's logging thatit was logging inconing requests

bodyParser parses incoming requests into json
and it will attempt to do so no matter waht the body type is

nodemon watches project directory for any file changes

*/

//Server Setup
//define a port that server is going to run
//on local machine
//If there is an environment variable of port already defined, otherwise use 3090

/*http is native node library. line 17 says,
create an http server that knows how to receive requiersts
and anything that comes in, go ahead and forward it to our app


*/
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);
