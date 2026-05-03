const Koa = require('koa');
const app = new Koa();
const {setFinalResponseMdw, setResponseTimeMdw} = require('./middlewares');
// logger

// piso 1 (primer middleware))
app.use(setFinalResponseMdw);


// x-response-time
// piso 2 (segundo middleware)
app.use(setResponseTimeMdw);

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