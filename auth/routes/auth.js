const express = require('express');
const userControllers = require('../controllers/auth');

// Create my express router instance
const router = express.Router();

// ===================================

// My routes

// (1)
router.post('/', userControllers.auth_post);

//============================
// Export our user routes
module.exports = router;