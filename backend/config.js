const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/gallery',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '1253799792139740',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    }
};