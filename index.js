import 'dotenv/config';
import Koa from 'koa';
import Router from '@koa/router';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJsdoc from 'swagger-jsdoc';
import { bodyParserMdw, setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js'; // Corrected import path and named import
import { UserRepository } from './database/userRepository.js';
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
app.use(bodyParserMdw());
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
 * /user/{id}:
 *   get:
 *     description: Obtiene un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/user/:id', async (ctx) => {
    const { id } = ctx.params;
    const user = await UserRepository.getUserById(id);

    if (!user) {
        ctx.status = 404;
        ctx.body = { ok: false, message: 'Usuario no encontrado' };
        return;
    }

    ctx.body = user;
});


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
    const user = await UserRepository.getUsers();

    if (!user) {
        ctx.status = 404;
        ctx.body = { ok: false, message: 'Usuario no encontrado' };
        return;
    }

    ctx.body = user;
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
    console.log(ctx.request.body);
    const { name, email, password } = ctx.request.body;
    const userSaved = await UserRepository.createUser(name, email, password);
    ctx.body = {
        ok: true,
        message: 'usuario creado',
        userSaved
    }
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
router.put('/user:id', async (ctx) => {
    const { id } = ctx.params;
    const { name, email, password } = ctx.request.body;
    const userUpdated = {
        id:id,
        name:name,
        email:email,
        password:password
    }
    await UserRepository.updateUser(id, name, email, password);
    ctx.body = {
        ok: true,
        message: 'usuario actualizado',
        userUpdated
    }
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