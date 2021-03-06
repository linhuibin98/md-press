const getTitle = require('./title');
const marked = require('marked');
const fs = require('fs/promises');

module.exports = async function({file, raw} = {}) {
    if (!file) {
        return;
    }
    const stats = await fs.stat(file.filePath);
    Object.keys(stats).forEach(key => {
        file[key] = stats[key];
    });
    const html = marked(raw);
    getTitle(file, raw);
    file.raw = raw;
    file.html = html;
}