const mongoose = require('mongoose');

const { mongodb: config } = require('../config');

const { useBlogModel } = require('./blog/model');

module.exports = {
    async start() {
        await mongoose.connect(`mongodb://${config.host}:${config.port}/${config.dbName}`);
        console.log(`mongoose log: db connected`);
    },
    useBlogModel,
}