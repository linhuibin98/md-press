const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Blog = new Schema({
  id: ObjectId,
  root: String,
  dir: String,
  base: String,
  ext: String,
  name: String,
  filePath: String,
  dev: Number,
  mode: Number,
  nlink: Number,
  uid: Number,
  gid: Number,
  rdev: Number,
  blksize: Number,
  ino: String,
  size: Number,
  blocks: Number,
  atimeMs: String,
  mtimeMs: String,
  ctimeMs: String,
  birthtimeMs: String,
  atime: Date,
  mtime: Date,
  ctime: Date,
  birthtime: Date,
  title: String,
  raw: String,
  html: String,
});

module.exports = Blog;