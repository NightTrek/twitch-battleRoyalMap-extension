const router = require('express').Router();
const passport = require('passport');
const passportService = require('./../../services/passport');
const logger         = require('../../logs/Wlogger');
const config         = require('../../config');
const moment            = require('moment');
const authMiddleware = require('../../middlewares/authMiddlewares');



// Set route to start OAuth link, this is where you define scopes to request
router.route("/twitch").get(authMiddleware.oAuthLogin);

// Set route for OAuth redirect CHANGE THE REDIRECT LINK
router.route('/twitch/callback').get(authMiddleware.oAuthRedirect);


router.route('/user').get( function (req, res) {
    console.log("Auth hit");
    try{
        const key = Object.keys(req.sessionStore.sessions)[0];
        if(typeof req.sessionStore.sessions === "object" && key === undefined){
            // console.log("objectNull");
            res.send("Bad Credential")
        }else{
            const obj = JSON.parse(req.sessionStore.sessions[key]);
            res.send(obj.passport.user);
        }
    }catch(err){
        logger.log({
            level: 'error',
            message: "/auth/user ERROR unixTme: "+ moment().unix() + " "+err
        });
        res.send("error 500 auth order error most likly check logs for details");
        console.log(err);//
    }

});

router.route('/logout').get( (req, res)=>{
    req.logout();
    res.send("Session Expired")
});

module.exports = router;