const Joi = require('joi');
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
const config = require('config');

//=================================
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024
    },
    isAdmin: Boolean
});
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(user);
};

const User = mongoose.model('User', userSchema);
//======================================

module.exports.User = User;
module.exports.validate = validateUser;