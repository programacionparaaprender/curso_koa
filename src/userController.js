import { UserRepository } from '../database/UserRepository.js';
import { hashPassword } from '../database/hashPassword.js';
const getUsers  = async (ctx) => {
  const user = await UserRepository.getUsers();
  
      if (!user) {
          ctx.status = 404;
          ctx.body = { ok: false, message: 'Usuario no encontrado' };
          return;
      }
  
      ctx.body = user;
}

const getUserById = async (ctx) => {
  const { id } = ctx.params;
      const user = await UserRepository.getUserById(id);
  
      if (!user) {
          ctx.status = 404;
          ctx.body = { ok: false, message: 'Usuario no encontrado' };
          return;
      }
  
      ctx.body = user;
}


const getUserByEmail = async (ctx) => {
  const { email } = ctx.params;
      const user = await UserRepository.getUserByEmail(email);
  
      if (!user) {
          ctx.status = 404;
          ctx.body = { ok: false, message: 'Usuario no encontrado' };
          return;
      }
  
      ctx.body = user;
}

const createUser = async (ctx) => {
  console.log(ctx.request.body);
      const { name, email, password } = ctx.request.body;
      const hashedPassword = await hashPassword(password);
      const userSaved = await UserRepository.createUser(name, email, hashedPassword);
      ctx.body = {
          ok: true,
          message: 'usuario creado',
          userSaved
      }
}

const updateUser = async (ctx) =>{
  const { id } = ctx.params;
      const user = await UserRepository.getUserById(id);
  
      if (!user) {
          ctx.status = 404;
          ctx.body = { ok: false, message: 'Usuario no encontrado' };
          return;
      }
      const { name, email, password } = ctx.request.body;
      const hashedPassword = await hashPassword(password);
      const userUpdated = {
          id:id,
          name:name,
          email:email,
          password:hashedPassword
      }
      await UserRepository.updateUser(id, name, email, hashedPassword);
      ctx.body = {
          ok: true,
          message: 'usuario actualizado',
          userUpdated
      }
}

const deleteUser = async (ctx) => {
  const { id } = ctx.params;
    const user = await UserRepository.getUserById(id);

    if (!user) {
        ctx.status = 404;
        ctx.body = { ok: false, message: 'Usuario no encontrado' };
        return;
    }
    await UserRepository.deleteUser(id);
    ctx.body = {
        ok: true,
        message: 'usuario eliminado',
        user
    }
}

export const UserController = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}