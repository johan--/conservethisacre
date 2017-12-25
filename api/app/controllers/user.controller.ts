import { Get, Post } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { User } from '../entities/user';
import { Response } from './response';
import { decode } from 'jsonwebtoken';
import { Context } from 'koa';
import { Auth, AuthAdmin } from '../middleware/permissions.middleware';

const removeCredentials = (user) => {
  const _user = {...user};
  delete _user['password'];
  delete _user['accessToken'];
  delete _user['salt'];

  return _user;
};

export class UserController {

  /**
   * Finds all available users
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/users', AuthAdmin)
  public async findAll(ctx: IRouterContext, next: Function) {
    const users = await User.find();
    return Response.success(users.map(removeCredentials));
  }

  /**
   * Saves data for currently logged uset
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Post('/api/users/own', Auth)
  public async save(ctx: Context) {
    const user = await User.findOneById(ctx.user.id);
    const data = ctx.request.body;
    user.firstName = data.firstName;
    user.lastName = data.lastName;


    return Response.success(await user.save());
  }

}
