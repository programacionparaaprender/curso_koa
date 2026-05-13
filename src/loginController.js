import { UserRepository } from '../database/userRepository.js';
import {comparePassword} from '../database/hashPassword.js'
import { createToken } from '../database/tokenGenerator.js';
const signIn = async (ctx) => {
    const { email, password } = ctx.request.body;

    if(!email||!password) {
        ctx.status = 400;
        ctx.body = { message: 'Email and password are required' };
        return;
    }

    const foundUser = await UserRepository.getUserByEmail(email);
    
    if(!foundUser){
        ctx.body = {
            badrequest: true,
            status: 404,
            message: 'User not found'
        }
    }
    
    const passwordMatch = await comparePassword(password, foundUser.password);
    if(!passwordMatch){
        ctx.body = {
            badrequest: true,
            status: 401,
            message: 'Invalid email or password'
        }
    }
    const jwtToken = createToken(foundUser);
    ctx.body = {
        ok: true,
        status: 200,
        message: 'User found',
        foundUser,
        jwtToken
    }
}

export const LoginController = {
  signIn
}