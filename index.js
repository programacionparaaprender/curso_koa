import Koa from 'koa';
import Router from '@koa/router';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJsdoc from 'swagger-jsdoc';
import { setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js';

// logger
const app = new Koa();
const router = new Router();

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Curso Koa API',
            version: '1.0.0',
            description: 'Documentación de la API de usuarios para el curso de Koa',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./index.js'], // Ruta a los archivos que contienen las anotaciones
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(setFinalResponseMdw);
app.use(setResponseTimeMdw);

// Servir la UI de Swagger en /docs
app.use(
    koaSwagger({
        routePrefix: '/docs',
        swaggerOptions: {
            spec: swaggerSpec,
        },
    }),
);

app.use(router.routes())
    .use(router.allowedMethods());

/**
 * @openapi
 * /user:
 *   get:
 *     description: Obtiene un mensaje de bienvenida del usuario
 *     responses:
 *       200:
 *         description: Retorna un string "Hello, World!"
 */
router.get('/user', async (ctx) => {
    ctx.body = 'Hello, World!';
});

/**
 * @openapi
 * /user:
 *   post:
 *     description: Crea un nuevo usuario
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 */
router.post('/user', async (ctx) => {
    ctx.body = 'Hello, World!';
});

/**
 * @openapi
 * /user:
 *   put:
 *     description: Actualiza un usuario existente
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put('/user', async (ctx) => {
    ctx.body = 'Hello, World!';
});

/**
 * @openapi
 * /user:
 *   delete:
 *     description: Elimina un usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
router.delete('/user', async (ctx) => {
    ctx.body = 'Hello, World!';
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
    console.log('Swagger docs available on http://localhost:3000/docs');
});

export default app;