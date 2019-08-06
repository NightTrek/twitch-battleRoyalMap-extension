// const cors           = require('cors');
//
//
//
//
// const app = express();
//
// // Database setup
//
//
//
// // App middlewares setup

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(cors());
// app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
// app.use(passport.initialize());
// app.use(passport.session());
//
//

//

//
//
// // Routes setup
// const routes = require('./routes');
// app.use(routes);
//

//
//


// Define our dependencies
const express        = require('express');
const session        = require('express-session');
const passport       = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request        = require('request');
const handlebars     = require('handlebars');
const morgan         = require('morgan');
const mongoose       = require('mongoose');
const config         = require("./config");
const User          = require('./model/User');
//
//======================================================================================

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = config.clientId;
const TWITCH_SECRET    = config.clientSecret;
const SESSION_SECRET   = config.secret;
const CALLBACK_URL     = 'http://localhost:3000/auth/twitch/callback';  // You can run locally with - http://localhost:3000/auth/twitch/callback

const cors = require('cors');
//start db connection
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true, useCreateIndex: true });


// Initialize Express and middlewares
var app = express();
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(morgan('combined'));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
    var options = {
        url: 'https://api.twitch.tv/helix/users',
        method: 'GET',
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer ' + accessToken
        }
    };

    request(options, function (error, response, body) {
        if (response && response.statusCode == 200) {
            done(null, JSON.parse(body));
        } else {
            done(JSON.parse(body));
        }
    });
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('twitch', new OAuth2Strategy({
        authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
        tokenURL: 'https://id.twitch.tv/oauth2/token',
        clientID: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_SECRET,
        callbackURL: CALLBACK_URL,
        state: true
    },
    function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;

        // Securely store user profile in your DB
        //User.findOrCreate(..., function(err, user) {
        //  done(err, user);
        //});

        done(null, profile);
    }
));

// Set route to start OAuth link, this is where you define scopes to request
app.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read' }));

// Set route for OAuth redirect CHANGE THE REDIRECT LINK
app.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: '/', failureRedirect: '/' }));
//production setup

// // If we are in production, serve our clients build folder.
// // This folder is created during production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// // Server setup
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Twitch auth sample listening on port 3000!')
});
