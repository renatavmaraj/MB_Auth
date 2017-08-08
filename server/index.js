//Main starting point of app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');



//console.log("BEFORE CONNECTION")
mongoose.connect('mongodb://renata:test@ds143737.mlab.com:43737/mbot2');

// var conn = mongoose.connection;
// console.log("thisisConn: ", conn)
//conn.on(‘error’, console.error.bind(console, ‘connection error:‘));

// conn.once(‘open’, function() {
//   // Wait for the database connection to establish, then start the app.
//   console.log('openLogged')
// });

//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ 'type': '*/*' }));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);
