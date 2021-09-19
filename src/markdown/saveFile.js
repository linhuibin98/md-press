const redis = require('../redis');

module.exports = async function saveFile(file) {
    if (!file) {
        return;
    }
    if (!!await redis.get(file.filePath)) {
        return;
    }
    return await redis.set(file.filePath, JSON.stringify(file));
}