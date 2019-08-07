const router      = require('express').Router();


//api appended

//StartMap Session
router.route('/StartSession')
    .get((req, res) => {
        console.log(req.user);
        res.send(req.user);
    });

router.route('/SendVote')
    .post((req, res) => {

        console.log(req.user);
        res.send([{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5},{x:22,y:42,z:5}]);
    });

//http://localhost:3001/api/SendVote


module.exports = router;
