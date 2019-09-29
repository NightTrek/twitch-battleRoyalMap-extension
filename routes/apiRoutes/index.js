const router      = require('express').Router();
const User        = require('../../model/User');
const Session     = require('../../model/Session')
const logger         = require('../../logs/Wlogger');



//api appended

//StartMap Session
//Start session takes data obj with an "email" "VoidTime" and returns a Session "_id" created by adding a new DB entry
router.route('/startsession')
    .post(async (req, res) => {
        console.log(req.body.data)
        if(req.body.data.email){
            try{
                let Profile = await User.find({email:req.body.data.email});
                console.log(Profile);
                console.log(req.body.VoidTime)
                let newSession = await Session.create({userId:Profile[0]._id,sessionVoidTime:req.body.data.VoidTime,voteArray:[]});
                res.send(newSession)
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
            // let Profile = await User.find({email:req.body.data.email});
            // console.log(Profile);
            // let newSession = await Session.create({userId:Profile[0]._id,sessionVoidTime:req.body.data.voidTime,voteArray:[]});
            // res.send(newSession._id)
        }else{
            logger.log({
                level: 'error',
                message: "ERROR INVALID EMAIL UNDEFINED"
            });
            res.send("ERROR INVALID email");
        }
    });

//Session Validate

router.route('/validsession')
    .post(async (req, res) => {
        if(req.body.sessionId){
            console.log('Validator HIT');
            try {
                let CurrentVotes = await Session.find({_id: req.body.sessionId});
                console.log(CurrentVotes)
                // if(CurrentVotes[0).userId
                res.send(CurrentVotes[0]);
            }catch(err){
                logger.log({
                    level: 'error',
                    message: "ERROR INVALID sessionID UNDEFINED " + err
                });
                res.send("error invalid session ID")
            }
        }
        else{
            res.send("error invalid session")
        }
    });




//take a xyz datapoint and the session _id
router.route('/sendvote')
    .post(async(req, res) => {
        if(req.body.data !== null && req.body.data.sessionId !== undefined && req.body.data.email !== undefined){
            console.log("i VOTED hit!=====================")
            let userID = await User.find({email:req.body.data.email},"_id");
            console.log(userID);
            let CurrentVotes = await Session.find({_id:req.body.data.sessionId}, 'voteArray');
            // console.log(`current votes ${JSON.stringify(CurrentVotes)}`);
            // console.log({
            //     x:req.body.data.vote.x,
            //     y:req.body.data.vote.y,
            //     z:req.body.data.vote.z,
            //     voterID:userID[0]._id
            //
            // })
             CurrentVotes[0].voteArray.push({
                x:req.body.data.vote.x,
                y:req.body.data.vote.y,
                z:req.body.data.vote.z,
                voterID:userID[0]._id

            });
            //console.log(`new votes array: `);
            //console.log(CurrentVotes[0].voteArray);
            //console.log(req.body.data.sessionId);
            const sessionID = req.body.data.sessionId;
            Session.findByIdAndUpdate({_id: sessionID}, {voteArray:CurrentVotes[0].voteArray})
                .then( () => Session.findById({"_id": sessionID}))
                .then( updatedVotes => {
                    logger.log({
                        level: 'info',
                        message: "Successful vote by "+req.body.data.email

                    });
                    res.send(updatedVotes);
                })
                .catch((err)=>{
                    console.log(err)
                    res.send("code: 500 db error");
                    logger.log({
                        level: 'error',
                        message: "ERROR UPDATING DB  "+err

                    });
                });
            //let update = await Session.findByIdAndUpdate({_id:req.body.sessionId}, { $set: {voteArray:newVotesArray}});
            //let updatedVotes = await Session.find({_id:req.body.sessionId}, 'voteArray');
        }else{
            logger.log({
                level: 'error',
                message: "ERROR DATA OBJECT MISSING OR DOES NOT INCLUDE EMAIL AND SESSION ID"

            })
            res.send("ERROR 500 will be back after lunch");
        }
    });

//http://localhost:3001/api/SendVote


module.exports = router;
