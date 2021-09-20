const watch = require("watch");
const nodePath = require("path");

const add = require('./add');
const change = require('./change');
const remove = require('./remove');

let watchPath = nodePath.join(__dirname, "../../blog");

module.exports = {
  start(path = watchPath) {
    watch.watchTree(path, async (f, curr, prev) => {
      if (typeof f == "object" && prev === null && curr === null) {
        // Finished walking the tree
        console.log(`watch log: dir ${path} watching...`);
        watchPath = path;
      } else if (prev === null) {
        // f is a new file
        if(!/.md$/i.test(f)) {
          return;
        }
        f = f.replace(/\\/g, '/');
        console.log(`watch log: add ${f}`);
        await add(f, curr);
      } else if (curr.nlink === 0) {
        // f was removed
        if(!/.md$/i.test(f)) {
          return;
        }
        f = f.replace(/\\/g, '/');
        console.log(`watch log: remove ${f}`);
        await remove(f, prev);
      } else {
        // f was changed
        if(!/.md$/i.test(f)) {
          return;
        }
        f = f.replace(/\\/g, '/');
        await change(f, curr);
        console.log(`watch log: change ${f}`);
        
      }
    });
  },
  stop() {
    watch.unwatchTree(watchPath);
  },
};
