const router      = require('express').Router();
const User        = require('../../model/User');
const Session     = require('../../model/Session')
const logger         = require('./logs/Wlogger');



//api appended

//StartMap Session
router.route('/startsession')
    .post(async (req, res) => {
        console.log(req.body.data.email)
        if(req.body.data.email){
            try{
                let Profile = await User.find({email:req.body.data.email});
                console.log(Profile);
                let newSession = await Session.create({userId:Profile[0]._id,sessionVoidTime:req.body.data.voidTime,voteArray:[]});
                res.send(newSession._id)
                logger.log({
                    level: 'info',
                    message: `SUCCESSFULL START SESSION|||| BY| ${req.body.data.email} || session id || ${newSession._id}`
                });
            }catch(err){
                logger.log({
                    level: 'error',
                    message: "ERROR DB EXCEPTION "+err
                });
                res.send("SERVER ERROR 500 WILL BE BACK AFTER LUNCH");
            }
            let Profile = await User.find({email:req.body.data.email});
            console.log(Profile);
            let newSession = await Session.create({userId:Profile[0]._id,sessionVoidTime:req.body.data.voidTime,voteArray:[]});
            res.send(newSession._id)
        }else{
            logger.log({
                level: 'error',
                message: "ERROR INVALID EMAIL UNDEFINED"
            });
            res.send("ERROR INVALID email");
        }
    });




//take a xyz datapoint and the session _id
router.route('/SendVote')
    .post(async(req, res) => {
        if(req.body.data !== null && req.body.data.sessionId !== undefined && req.body.data.email !== undefined){
            let CurrentVotes = await Session.find({_id:req.body.sessionId}, 'voteArray');
            console.log(CurrentVotes);
            res.send(CurrentVotes);
        }else{
            logger.log({
                level: 'error',
                message: "ERROR DATA OBJECT MISSING OR DOES NOT INCLUDE EMAIL AND SESSION ID"

            }
            res.send("ERROR 500 will be back after lunch");
        }
    });

//http://localhost:3001/api/SendVote


module.exports = router;
