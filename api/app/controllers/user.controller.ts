import { Get } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { User } from '../entities/user';
import { Response } from './response';


export class UserController {

  /**
   * Finds all available users
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/users')
  public async findAll(ctx: IRouterContext, next: Function) {
    return Response.success(await User.find());
  }
}
