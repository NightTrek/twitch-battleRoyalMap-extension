const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const contentRoutes = require("./contentRoutes");
const authRoutes = require("./auth");


// Setup API routes
// Prepends /api to all of the routes in this file
router.use('/api', apiRoutes);
router.use('/content', contentRoutes);
router.use('/auth', authRoutes);

module.exports = router;
