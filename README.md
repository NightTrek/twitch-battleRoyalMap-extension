# twitch-battleRoyalMap-extension

The Twitch Battle Royal extentsion allows streamers playing battle royal games start a vote for where they should land.
This is a full Stack APP utilizing the MERN stack. The backend requires that you have mongoDB installed as well as mongoose.
You will also need a valid config file which should look similar too this 

===============CONFIG FILE EXAMPLE =========================================


``` 
const config = {    
    secret:         "??????????????????????????????",
    clientId:       "??????????????????????????????",
    clientSecret:   "??????????????????????????????"
}

module.exports = config; 
```


==============================================================================

Once you have the congif in your root directory and mongo running you should be able to start the app with `npm start`.

this should run both the backend and the react-app in development mode. Youll than be able to authenticate with twitch and start voting.
