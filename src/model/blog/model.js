const mongoose = require('mongoose');
const { add } = require('./schema');

const BlogSchema = require('./schema');

const BlogModel = mongoose.model('blog', BlogSchema);

module.exports = {
    BlogModel,
    useBlogModel() {
        return new BlogModel();
    },
    async findByIno(ino) {
        ino = String(ino);
        return await BlogModel.findOne({ ino }).exec();
    },
    async deleteByIno(ino) {
        ino = String(ino);
        return await BlogModel.deleteOne({ino});
    },
    async create(...args) {
        return await BlogModel.create(...args);
    },
    async findByInoAndUpdate(ino, newValue = {}) {
        ino = String(ino);
        return await BlogModel.findOneAndUpdate({ino}, newValue)
    }
}