const getTitle = require('./title');
const marked = require('marked');
const fs = require('fs/promises');

module.exports = async function({file, raw} = {}) {
    if (!file) {
        return;
    }
    const html = marked(raw);
    getTitle(file, raw);
    file.raw = raw;
    file.html = html;
    file.stats = await fs.stat(file.filePath);
}