import 'dotenv/config';
import Koa from 'koa';
import { errorCatcherMdw, bodyParserMdw, setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js'; // Corrected import path and named import
// logger
const app = new Koa();
import router from './src/userRouter.js';
import { koaswagger } from './src/userRouter.js'; // Importar la configuración de Swagger
app.use(errorCatcherMdw);
app.use(setFinalResponseMdw);
app.use(setResponseTimeMdw);
app.use(bodyParserMdw());
// Servir la UI de Swagger en /docs
app.use(koaswagger);

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
    console.log('Swagger docs available on http://localhost:3000/docs');
});

export default app;