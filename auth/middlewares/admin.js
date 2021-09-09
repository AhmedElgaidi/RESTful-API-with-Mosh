const isAdmin = (req, res, next) => {
    // 403 means forbidden while 4041 is unauthorized
    if(!req.user.isAdmin) return res.status(403).send('Acces denied.');
    next();
};
module.exports = isAdmin;