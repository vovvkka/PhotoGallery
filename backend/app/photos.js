const express = require('express');
const router = express.Router();
const config = require('../config');
const {nanoid} = require("nanoid");
const multer = require("multer");
const path = require("path");
const Photo = require("../models/Photo");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.post('/', auth, upload.single('image'), async (req, res) => {
    const {title} = req.body;
    const photoData = {title};

    if (req.file) {
        photoData.avatar = `uploads/${req.file.filename}`;
    }

    try {
        const photo = new Photo(photoData);
        await photo.save();

        res.send(photo);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});


// router.delete('/sessions', async (req, res) => {
//     const token = req.get('Authorization');
//     const success = {message: 'Success'};
//
//     if (!token) return res.send(success);
//
//     const user = await User.findOne({token});
//
//     if (!user) return res.send(success);
//
//     user.generateToken();
//     await user.save({validateBeforeSave: false});
//
//     return res.send({success, user});
// });

module.exports = router;