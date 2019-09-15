const router      = require('express').Router();
const logger         = require('../../logs/Wlogger');
// const fortniteSeason10Map = require("../../assets/img/FORTNITESEASON10MAP.jpg");

router.route('/fmapseason10')
    .get(async (req, res) => {
        logger.log({
            level: 'info',
            message: "sending map image to frontend"

        });
        res.sendFile("/home/eliza/Documents/UCB-Code/twitch-battleRoyalMap-extension/assets/img/FORTNITESEASON10MAP.jpg");
    });



module.exports = router;
