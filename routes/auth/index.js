const router = require('express').Router();
const passport = require('passport');
const passportService = require('./../../services/passport');

const config         = require('../../config');
const authMiddleware = require('../../middlewares/authMiddlewares');



// Set route to start OAuth link, this is where you define scopes to request
router.route("/twitch").get(authMiddleware.oAuthLogin);

// Set route for OAuth redirect CHANGE THE REDIRECT LINK
router.route('/twitch/callback').get(authMiddleware.oAuthRedirect);



router.get('/auth/user', function (req, res) {
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
            message: "/auth/user ERROR unixTme: "+ moment().unix() + " "+err
        });
        res.send("error 500 auth order error most likly check logs for details");
        console.log(err);//
    }

});

module.exports = router;