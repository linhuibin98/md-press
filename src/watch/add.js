const fs = require('fs/promises');
const marked = require('marked');
const path = require('path');

const getTitle = require('../markdown/title');
const saveFile = require('../markdown/saveFile');

module.exports = async function add(filePath, stats) {
    const raw = await fs.readFile(filePath, {
        encoding: 'utf-8'
    });
    const html = marked(raw);
    const file = {
        ...path.parse(filePath),
        ...(stats || {}),
        filePath,
        raw,
        html,
    };
    getTitle(file, raw);
    await saveFile(file);
}
