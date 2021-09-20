const Koa = require('koa');
const cors = require('koa2-cors');
const Vue = require('vue');
const serverRender = require('@vue/server-renderer');
const compileSsr = require('@vue/compiler-ssr');
const compileSfc = require('@vue/compiler-sfc');
const path = require('path');
const marked = require('marked');

const { server: config } = require('./config');
const { readFile } = require('./utils');
const watch = require('./watch');
const redis = require('./redis');
const mongodb = require('./model');
const registerRouter = require('./controller');
const catchErrorMiddleware = require('./middleware/catchError');

const templatePath = path.join(__dirname, 'template/App.vue');
const blogPath = path.join(__dirname, '../blog/README.md');
const themePath = path.join(__dirname, './theme/lixiaolai.css');

(async function bootstrap() {
    await mongodb.start();
    await redis.start();

    const server = new Koa();
    server.use(catchErrorMiddleware());
    server.use(cors({
        origin: ctx => /^(localhost)|(127.0.0.1)|(0.0.0.0)\:?\d*/i.test(ctx.host)
    }));
    await registerRouter(server);

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
            <div id="app">
                ${ctx.body}
            </div>
            <div class="markdown">${mdHtml}</div> 
        `;
        await next();
    });

    server.listen(config.port, err => {
        if (err) {
            throw err;
        }
        console.log(`server start at ${config.port}`);
    });
    watch.start();
})();