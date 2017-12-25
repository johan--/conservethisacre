import { Context } from 'koa';
import { User } from '../entities/user';
import { Response } from '../controllers/response';
import { decode } from 'jsonwebtoken';

export interface IUser {
  id: number;
  role: string;
}

declare module 'koa' {
  interface Context {
    user: IUser;
  }
}

export async function extractUser(context: Context): Promise<IUser> {
  const authorizationHeader = (context.headers.Authorization || context.headers.authorization);
  if (!authorizationHeader) {
    return null;
  }

  const authtoken = authorizationHeader.split(' ').pop();
  const tokenObj = decode(authtoken);

  if (!tokenObj) {
    return null;
  }

  const user = await User.findOneById(tokenObj.userId);
  if (user.accessToken != authtoken) {
    return null;
  }

  return user;
}

/**
 * Middleware that checks if user is logged in
 * @param {Application.Context} context
 * @param {() => Promise<any>} next
 * @returns {Promise<any>}
 * @constructor
 */
export async function Auth(context: Context, next: () => Promise<any>) {
  const user = await extractUser(context);

  if (!user) {
    context.body = Response.error(401, 'No authorized');
    return;
  }

  context.user = user;

  return next();
}

/**
 * Middleware that checks if user is logged in and has role admin
 * @param {Application.Context} context
 * @param {() => Promise<any>} next
 * @returns {Promise<any>}
 * @constructor
 */
export async function AuthAdmin(context: Context, next: () => Promise<any>) {
  const user = await extractUser(context);

  if (!user) {
    context.body = Response.error(401, 'No authorized');
    return;
  }

  if (user.role !== 'admin') {
    context.body = Response.error(401, 'No authorized');
    return;
  }

  context.user = user;

  return next();
}
