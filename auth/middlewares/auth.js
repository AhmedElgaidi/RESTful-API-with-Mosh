const jwt = require('jsonwebtoken');
const config = require('config');


const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    // 401 means not 
    if(!token) return res.status(401).send('Access denied\n No token is provided');
    try {
        const decodedPayload = await jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload; // this payload is the document id, so we can get it back
        next();
    } catch(error) {
        // 400 means bad request
        return res.status(400).send("Invalid token.");
    }
};

module.exports = auth;