const express = require('express');
const router = express.Router();
const config = require('../config');
const {nanoid} = require("nanoid");
const multer = require("multer");
const path = require("path");
const Photo = require("../models/Photo");
const auth = require("../middleware/auth");
const User = require("../models/User");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find({publish: true}).populate('user', 'displayName');
        res.send(photos);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/private', async (req, res) => {
    try {
        const token = req.query.token;
        const photo = await Photo.findOne({token});
        res.send(photo);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/gallery/:id', async (req, res) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            const photos = await Photo.find({publish: true, user: req.params.id}).populate('user', 'displayName');
            return res.send(photos);
        }

        const user = await User.findOne({token});

        if (user._id.toString() !== req.params.id) {
            const photos = await Photo.find({publish: true, user: req.params.id}).populate('user', 'displayName');
            return res.send(photos);
        }

        const photos = await Photo.find({user: req.params.id}).populate('user', 'displayName');
        res.send(photos);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const {title} = req.body;
    const photoData = {title, user: req.user._id};

    if (req.file) {
        photoData.image = `uploads/${req.file.filename}`;
    }

    try {
        const photo = new Photo(photoData);
        await photo.save();

        res.send(photo);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/private/:id', auth, async (req, res) => {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
        return res.status(404).send({message: 'Photo not found!'});
    }

    if (photo.publish) {
        return res.status(400).send({message: 'Photo is already publish'});
    }

    if (req.user._id.toString() !== photo.user.toString()) {
        return res.status(403).send({message: 'You have no rights!'});
    }

    const token = nanoid();

    try {
        photo.token = token;
        await photo.save()

        res.send(token);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    console.log(photo)

    if (!photo) {
        return res.status(404).send({error: 'Photo not found!'});
    }

    if (photo.user.toString() !== req.user._id.toString()) {
        return res.status(403).send({message: 'You dont have rights!'});
    }

    try {
        await Photo.deleteOne({_id: req.params.id});

        res.send('Delete successful!');
    } catch (e) {
        res.status(500);
    }
});

module.exports = router;