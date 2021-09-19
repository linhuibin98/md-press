const Koa = require('koa');
const Vue = require('vue');
const serverRender = require('@vue/server-renderer');
const compileSsr = require('@vue/compiler-ssr');
const compileSfc = require('@vue/compiler-sfc');
const path = require('path');
const marked = require('marked');

const { readFile } = require('./utils');

const server = new Koa();

const PORT = '3001';
const templatePath = path.join(__dirname, 'template/App.vue');
const blogPath = path.join(__dirname, '../blog/README.md');
const themePath = path.join(__dirname, './theme/han.css');

server.use(async (ctx, next) => {
    // 编译Vue组件
    const source = await readFile(templatePath);
    const { descriptor } = compileSfc.parse(source);
    console.log(descriptor.template.content);
    const data = () => ({
        msg: 'Hello Vue'
    });
    const renderCode = compileSsr.compile(descriptor.template.content).code;
    const vueApp = Vue.createApp({
        data,
        ssrRender: new Function('require', renderCode)(require)
    });
    const html = await serverRender.renderToString(vueApp);
    
    ctx.body = html;
    await next();
});

server.use(async (ctx, next) => {
    // 编译 md 文件
    const mdSource = await readFile(blogPath);
    const mdHtml = marked(mdSource);

    // 主题
    const css = await readFile(themePath);

    ctx.body = `
        <style>${css}</style>
        <h1>Hello Vue Server Render</h1>
        <div id="app">
            ${ctx.body}
        </div>
        <div class="markdown">${mdHtml}</div> 
    `;
    await next();
});

server.listen(PORT, err => {
    if (err) {
        throw err;
    }
    console.log(`server start at ${PORT}`);
});