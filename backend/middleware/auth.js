const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) res.status(401).send({error: "No token presented"});

    const user = await User.findOne({token});

    if (!user)  res.status(401).send({error: "Wrong token"});

    req.user = user;

    next();
};

module.exports = auth;