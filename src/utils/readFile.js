const fs = require('fs');
const util = require('util');

function readFile(path) {
    return util.promisify(fs.readFile)(path, {
        encoding: 'utf-8'
    });
}

module.exports = readFile;