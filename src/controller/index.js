const Router = require('koa-router');

const blogRouter = require('./blog');

const router = new Router({
    prefix: '/api'
});

module.exports = (app) => {
    router.use(blogRouter.routes());
    
    app.use(router.routes());
};