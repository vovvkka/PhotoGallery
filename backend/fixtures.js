const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Photo = require("./models/Photo");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, user] = await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
        displayName: 'Admin',
        avatar: 'fixtures/avatar.png',
    }, {
        username: '1',
        password: '1',
        token: nanoid(),
        role: 'user',
        displayName: 'Pavel',
        avatar: 'fixtures/avatar.png'
    });

    await Photo.create({
        user: admin._id,
        title: 'Capybara on the grass',
        image: 'fixtures/capybaraGrass.jpg',
        publish: true,
    }, {
        user: admin._id,
        title: 'Capybara eating',
        image: 'fixtures/capybaraMelon.jpg',
        publish: true,
    }, {
        user: admin._id,
        title: 'Capybara is swimming',
        image: 'fixtures/capybaraSwimming.webp',
        publish: false,
    }, {
        user: user._id,
        title: 'Witcher',
        image: 'fixtures/witcher.png',
        publish: true,
    }, {
        user: user._id,
        title: 'Harry Potter vs voldemort',
        image: 'fixtures/harryVersus.jpg',
        publish: true,
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));