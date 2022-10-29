const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    publish: {
        type: Boolean,
        default: false
    },
    token: String
});


const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;