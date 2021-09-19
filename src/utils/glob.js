const glob = require('glob');
const path = require('path');

function globPromisify(rootPath, options = {}) {
  return new Promise((resolve) => {
    glob(rootPath, options, (err, files) => {
      if (err) {
        throw err;
      }
      resolve(files.map(filePath => ({
          ...path.parse(filePath),
          filePath
      })));
    });
  });
}

module.exports = globPromisify;