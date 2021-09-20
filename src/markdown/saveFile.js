const blogModel = require('../model/blog/model');

module.exports = async function saveFile(file) {
    if (!file) {
        return;
    }
    if (!!await blogModel.findByIno(file.ino)) {
        return;
    }
    return await blogModel.create(file);
}