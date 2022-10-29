const express = require('express');
const router = express.Router();
const Photo = require("../models/Photo");
const auth = require("../middleware/auth");

router.get('/', [auth, permit('admin')], async (req, res) => {
    try {
        const photos = await Photo.find().populate('user', 'displayName');
        res.send(photos);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
        return res.status(404).send({error: 'Photo not found!'});
    }

    try {
        photo.publish = true;
        photo.save();

        res.send('Publish successful!');
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Photo.deleteOne({_id: req.params.id});

        res.send('Delete successful!');
    } catch (e) {
        res.status(500);
    }
});

module.exports = router;