// Define our dependencies
const express        = require('express');
const session        = require('express-session');
const passport       = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request        = require('request');
const axios          = require('axios');
const morgan         = require('morgan');
const winston        = require('winston');
const logger         = require('./logs/Wlogger');
const mongoose       = require('mongoose');
const moment         = require('moment');
//local files
const config         = require("./config");
const User          = require('./model/User');
const routes        = require('./routes');
//
//======================================================================================

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = config.clientId;
const TWITCH_SECRET    = config.clientSecret;
const SESSION_SECRET   = config.secret;
const CALLBACK_URL     = 'https://vote-your-landing.herokuapp.com/auth/twitch/callback';  // You can run locally with - http://localhost:3000/auth/twitch/callback

const cors = require('cors');
//start db connection


try{
if(process.env.NODE_ENV === 'production'){
    console.log("connecting to mongo in production")
    mongoose.connect('mongodb://heroku_xnx6clq0:Apz^zvB!eRtm!i9t@tU3Op0*8bHH9Z6g@ds121135.mlab.com:21135/heroku_xnx6clq0', { useNewUrlParser: true, useCreateIndex: true });
}else{
    mongoose.connect('mongodb://localhost:twitch/vote-your-landing', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
}
    console.log("mongo connected")
}catch(err){//
    console.log(err);
}


// Initialize Express and middlewares
let app = express();


const allowedOrigins = ["http://localhost:3000","http://localhost:3001", "http://vote-your-landing.herokuapp.com"];




app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(morgan('combined'));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin. per custom set CORS policy';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(routes);

//

//production setup

// app.post('/auth/')
// // If we are in production, serve our clients build folder.
// // This folder is created during production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
    // logger.add(new winston.transports.Console({
    //     format: winston.format.simple()
    // }));
}

// // Server setup
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log(`Twitch auth listening on port ${PORT}`)
});
