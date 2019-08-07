const router      = require('express').Router();


//api appended

//StartMap Session
router.route('/StartSession')
    .get((req, res) => {
        console.log(req.user);
        res.send(req.user);
    });

router.route('/SendVote')
    .get((req, res) => {

        console.log(req.user);
        res.send(req.user);
    });

//http://localhost:3001/api/SendVote


module.exports = router;
