const path = require('path');

const { glob, readFile, cloneDeep } = require('../utils');
const normalizeFile = require('./normalizeFile');
const saveFile = require('./saveFile');

async function bootstrap({ 
    root = path.join(__dirname, '../../blog')
} = {}) {
    // 读取 blog 下所有的 md 文件路径
    const files = await glob(path.join(root, "**/*.md"));
    // 读取 md文件内容
    const rawSources = await Promise.all(files.map(file => readFile(file.filePath)));
    // 格式化 file 对象
    await files.reduce((cfile, nfile, index) => cfile.then(() => normalizeFile({file: nfile, raw: rawSources[index]})), Promise.resolve());
    // 存储 file
    await await files.reduce((cfile, nfile, index) => cfile.then(() => saveFile(nfile)), Promise.resolve());
    // console.log(files)
}

module.exports = bootstrap;