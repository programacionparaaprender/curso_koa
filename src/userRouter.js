

import Router from '@koa/router';
import { UserController } from './userController.js';
import { LoginController } from './loginController.js';
const router = new Router();

import swaggerJsdoc from 'swagger-jsdoc';

import { koaSwagger } from 'koa2-swagger-ui';

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

export const koaswagger = koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: {
        spec: swaggerSpec,
    },
});


router.post('/login', LoginController.signIn);

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
router.get('/user/:id', UserController.getUserById);


/**
 * @openapi
 * /user:
 *   get:
 *     description: Obtiene un mensaje de bienvenida del usuario
 *     responses:
 *       200:
 *         description: Retorna un string "Hello, World!"
 */
router.get('/user', UserController.getUsers);

/**
 * @openapi
 * /user:
 *   post:
 *     description: Crea un nuevo usuario
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 */
router.post('/user', UserController.createUser);

/**
 * @openapi
 * /user:
 *   put:
 *     description: Actualiza un usuario existente
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put('/user/:id', UserController.updateUser);

/**
 * @openapi
 * /user:
 *   delete:
 *     description: Elimina un usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
router.delete('/user/:id', UserController.deleteUser);

export default router;