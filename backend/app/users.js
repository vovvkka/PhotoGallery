const express = require('express');
const User = require("../models/User");
const router = express.Router();
const config = require('../config');
const axios = require("axios");
const {nanoid} = require("nanoid");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }

        res.send(user);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('avatar'), async (req, res) => {
    const {username, password, displayName} = req.body;
    const userData = {username, password, displayName};

    if (req.file) {
        userData.avatar = `uploads/${req.file.filename}`;
    }

    try {
        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(401).send({error: 'Wrong username or password!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({error: 'Wrong username or password!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({message: 'Username and password correct!', user})
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect! hello'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({username: req.body.id});

        if (!user) {
            user = new User({
                username: req.body.id,
                displayName: req.body.name,
                password: nanoid(),
                avatar: req.body.picture.data.url,
            });
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});

        res.send({message: 'Login or register successful!', user});
    } catch (e) {
        res.status(401).send({message: 'Facebook token incorrect!'});
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});

module.exports = router;