const {User, validate} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const config = require('config');

/// Naming convention by MDN
// (1) users_post
const users_post = async (req, res, next) => {
    const {name, email, password} = req.body;
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);// 400 => bad request

    let foundUser = await User.findOne({ email: req.body.email });
    if(foundUser) return res.status(400).send('user is already registered.');

    const user = new User({
        name,
        email,
        password
    });
    // Let's generate a salt and hash the user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save();
    // let's send back the token in the response header
    const token = user.generateAuthToken();

    // we created this header (custom one), "x-write_your_header_here
    return res.header('x-auth-token', token).send(`User is created successfully.\n ${user}`);
};

const private_get = (req, res, next) => {
    res.json('A private page\nFor only authenticated users.')
};

const profile_get = async (req, res, next) => {
    // as we said we created th e jwt on the _id value, so once it's decoded, we can return it back again, and it' really secure way to get the id from private page
    const user = await User
        .findById(req.user._id)
        // then exclude the password
        .select('-password');
    return res.send(user);
};

const authorize_get = (req, res, next) => {
    res.send('you are really a true admin.');
};

//==========================

module.exports = {
    users_post,
    private_get,
    profile_get,
    authorize_get
};