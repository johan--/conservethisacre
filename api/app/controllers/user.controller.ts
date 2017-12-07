import { Get } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { User } from '../entities/user';
import { Response } from './response';

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
}
