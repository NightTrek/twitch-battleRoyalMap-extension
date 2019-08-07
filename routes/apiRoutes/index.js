const router      = require('express').Router();
const User        = require('../../model/User');
const Session     = require('../../model/Session')




//api appended

//StartMap Session
router.route('/startsession')
    .post(async (req, res) => {
        console.log(req.body.data.email)
        if(req.body.data.email){
            let Profile = await User.find({email:req.body.data.email});
            console.log(Profile);
            let newSession = await Session.create({userId:Profile[0]._id,sessionVoidTime:req.body.data.voidTime,voteArray:[]});
            res.send(newSession._id)
        }else{
            res.send("ERROR INVALID email");
        }
    });


//take a xyz datapoint and the session _id
router.route('/SendVote')
    .post((req, res) => {

        console.log(req.user);
        res.send([{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5}]);
    });

//http://localhost:3001/api/SendVote


module.exports = router;
