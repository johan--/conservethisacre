import { Get, Post } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { User } from '../entities/user';
import { Response } from './response';
import { decode } from 'jsonwebtoken';
import { Context } from 'koa';

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
  @Get('/api/users')
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
  @Post('/api/users/own')
  public async save(ctx: Context) {
    ///// TEMP: Will be moved to auth middleware
    const authorizationHeader = (ctx.headers.Authorization || ctx.headers.authorization);
    const authtoken = (authorizationHeader || '').split(' ').pop();
    const tokenObj = decode(authtoken);

    if (!tokenObj) {
      return Response.error(401, 'Not authorized');
    }

    const user = await User.findOneById(tokenObj.userId);
    if (user.accessToken != authtoken) {
      return Response.error(401, 'No authorized');
    }
    //// TEMP

    const data = ctx.request.body;
    user.firstName = data.firstName;
    user.lastName = data.lastName;


    return Response.success(await user.save());
  }

}
