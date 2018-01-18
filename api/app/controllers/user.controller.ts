import { Delete, Get, Post } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { User } from '../entities/user';
import { Response } from './response';
import { decode } from 'jsonwebtoken';
import { Context } from 'koa';
import { Auth, AuthAdmin, ROLE_ADMIN } from '../middleware/permissions.middleware';
import { Inject } from 'typescript-ioc';
import { UserService } from '../services/user.service';

const removeCredentials = (user) => {
  const _user = {...user};
  delete _user['password'];
  delete _user['accessToken'];
  delete _user['salt'];

  return _user;
};

export class UserController {

  @Inject
  userService: UserService;

  /**
   * Checks if admin exists
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/setup/adminExists')
  public async adminExists(ctx: Context) {
    const user = await User.findOne({role: ROLE_ADMIN});
    return Response.success(!!user);
  }

  /**
   * Creates new admin user
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Post('/api/setup/createAdmin')
  public async createAdmin(ctx: Context) {
    const user = await User.findOne({role: ROLE_ADMIN});
    if (!user) {
      const {username, password} = ctx.request.body;

      try {
        return Response.success(await this.userService.create(username, password, ROLE_ADMIN));
      } catch (e) {
        return Response.error(500, e.message);
      }

    } else {
      Response.error(404, 'Not found');
    }
    return Response.success(true);
  }

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
   * Finds user by ID
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/users/:id', AuthAdmin)
  public async find(ctx: Context) {
    const user = await User.findOneById(ctx.params.id);
    user['isAdmin'] = user.role == ROLE_ADMIN;

    return Response.success(removeCredentials(user));
  }

  /**
   * Deletes user by ID
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Delete('/api/users/:id', AuthAdmin)
  public async delete(ctx: Context) {
    await User.removeById(ctx.params.id);
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
  public async saveOwn(ctx: Context) {
    const user = await User.findOneById(ctx.user.id);
    const data = ctx.request.body;
    user.firstName = data.firstName;
    user.lastName = data.lastName;


    return Response.success(removeCredentials(await user.save()));
  }

  /**
   * Saves data for given user
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Post('/api/users', Auth)
  public async save(ctx: Context) {
    await this.userService.save(ctx.request.body);
    const users = await User.find();
    return Response.success(users.map(removeCredentials));
  }

}
