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
const CALLBACK_URL     = 'http://localhost:3001/auth/twitch/callback';  // You can run locally with - http://localhost:3000/auth/twitch/callback

const cors = require('cors');
//start db connection


try{
    mongoose.connect('mongodb://localhost:twitch/vote-your-landing', { useNewUrlParser: true, useCreateIndex: true });
    console.log("mongo connected")
}catch(err){//
    console.log(err);
}


// Initialize Express and middlewares
let app = express();


// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
    let options = {
        url: 'https://api.twitch.tv/helix/users',
        method: 'GET',
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer ' + accessToken
        }
    };

    request(options, async function (error, response, body) {
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
    async function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        console.log(profile)

        try{
            let isUser = await User.find({email:profile.data[0].email})
            console.log(`is user is ================================================
        =========== ${isUser} =======================================================`);
            if(isUser == " " || isUser == ""||isUser == null) {
                let newUser = await User.create({
                    email: profile.data[0].email,
                    username: profile.data[0].display_name,
                    profileImg: profile.data[0].profile_image_url,
                    view_count: profile.view_count,
                    accessToken: profile.accessToken,
                    refreshToken: profile.refreshToken
                });
                console.log(newUser);
                logger.log({
                    level: 'info',
                    message: "LOGGING NEW USER"+JSON.stringify(newUser)
                });
            }else{
                logger.log({
                    level: 'info',
                    message: "LOGGING USER"+JSON.stringify(isUser)
                });
            }

        }catch(err){
            console.log(err)
        }

        done(null, profile);
    }
));



app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(morgan('combined'));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// Set route to start OAuth link, this is where you define scopes to request
app.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user:read:email' }));

// Set route for OAuth redirect CHANGE THE REDIRECT LINK
app.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: 'http://localhost:3000/auth/success', failureRedirect: '/' }));



app.get('/auth/user', function (req, res) {
    console.log("Auth hit");
    try{
        const key = Object.keys(req.sessionStore.sessions)[0];
        // console.log(req.sessionStore.sessions);
        console.log(key);
        const obj = JSON.parse(req.sessionStore.sessions[key]);
        res.send(obj.passport.user);
    }catch(err){
        logger.log({
            level: 'error',
            message: "/auth/user ERROR "+err
        });
        res.send("error 500 auth order error mostlikly check loggs for details")
        console.log(err);//
    }

});


app.use(routes);

//

//production setup

// app.post('/auth/')
// // If we are in production, serve our clients build folder.
// // This folder is created during production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// // Server setup
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log(`Twitch auth sample listening on port ${PORT}`)
});
