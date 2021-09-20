const blogModel = require('../model/blog/model');

module.exports = async function remove(filePath, stats) {
    return await blogModel.deleteByIno(stats.ino);
}