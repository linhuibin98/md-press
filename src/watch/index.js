const watch = require("watch");
const nodePath = require("path");

const redis = require("../redis");

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
        f = f.replace(/\\/g, '/');
        console.log(`watch log: add ${f}`);
      } else if (curr.nlink === 0) {
        // f was removed
        f = f.replace(/\\/g, '/');
        console.log(`watch log: remove ${f}`);
      } else {
        // f was changed
        f = f.replace(/\\/g, '/');
        console.log(`watch log: change ${f}`);
        let file = await redis.get(f.replace('\\', '/'));
        if (file) {
          file = JSON.parse(file);
          file.stats = curr;
          await redis.set(f, JSON.stringify(file));
        }
      }
    });
  },
  stop() {
    watch.unwatchTree(watchPath);
  },
};
