const mongoose = require('mongoose');

const { useBlogModel } = require('./blog/model');

module.exports = {
    async start() {
        await mongoose.connect('mongodb://127.0.0.1:27017/db_blog');
        console.log(`mongoose log: db connected`);
    },
    useBlogModel,
}