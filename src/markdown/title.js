// 提取Markdown标题
module.exports = (file, raw) => {
  const match = /^#\s?([^#\n\r]*)/.exec(raw);
  file.title = match ? match[1].trim() : file.name;
};
