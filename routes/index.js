const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const contentRoutes = require("./contentRoutes");


// Setup API routes
// Prepends /api to all of the routes in this file
router.use('/api', apiRoutes);
router.use('/content', contentRoutes);

module.exports = router;
