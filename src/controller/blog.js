const Router = require('koa-router');

const markdown = require('../markdown');

const router = new Router({
    prefix: '/blog'
});


router.get('/setting', async ctx => {
    await markdown.bootstrap();
    ctx.body = {
        code: 0,
        success: 'OK',
        data: {}
    };
});

module.exports = router;