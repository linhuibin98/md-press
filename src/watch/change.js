const fs = require('fs/promises');
const marked = require('marked');
const path = require('path');

const add = require('./add');
const getTitle = require('../markdown/title');
const blogModel = require('../model/blog/model');

module.exports = async function change(filePath, stats) {
    const ino = String(stats.ino);
    const blog = await blogModel.findByIno(ino);
    if (blog) {
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
      await blogModel.findByInoAndUpdate(ino, file);
    } else {
        await add(filePath, stats);
    }
}