import { UserRepository } from '../database/UserRepository.js';

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

const createUser = async (ctx) => {
  console.log(ctx.request.body);
      const { name, email, password } = ctx.request.body;
      const userSaved = await UserRepository.createUser(name, email, password);
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
  createUser,
  updateUser,
  deleteUser
}