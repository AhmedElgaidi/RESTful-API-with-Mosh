const express = require('express');
const userControllers = require('../controllers/user');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');


// Create my express router instance
const router = express.Router();

// ===================================

// My routes

// (1)
router.post('/', userControllers.users_post);
router.get('/', auth, userControllers.private_get);
router.get('/profile', auth, userControllers.profile_get);
router.get('/check-admin', [auth, isAdmin] , userControllers.authorize_get);



//============================
// Export our user routes
module.exports = router;