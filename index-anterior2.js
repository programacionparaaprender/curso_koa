const Koa = require('koa');
const app = new Koa();

// logger

// piso 1 (primer middleware))
app.use(async (ctx, next) => {
    console.log(`pasa 1`);
    await next();
    console.log(`paso 2`);
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
// piso 2 (segundo middleware)
app.use(async (ctx, next) => {
    console.log('paso 3');
    const start = Date.now();
    await next();
    console.log('paso 4');
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response

// piso 3 (tercer middleware)
app.use(async ctx => {
    console.log('paso 5');
    ctx.body = 'Hello World';
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000'); 
});

module.exports = app;