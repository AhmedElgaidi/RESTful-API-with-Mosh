const Joi = require('joi');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');

/// Naming convention by MDN
// (1) auth_post
const auth_post = async (req, res, next) => {
    const {email, password} = req.body;
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);// 400 => bad request

    let foundUser = await User.findOne({ email: req.body.email });
    if(!foundUser) return res.status(400).send('Invalid email or password.');

    // let's verify the password
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');
    const token = foundUser.generateAuthToken();
    res.send('you are authenticated.' + token)  
};

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(user);
};
//==========================

module.exports = {
    auth_post
};