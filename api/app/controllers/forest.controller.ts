import { Get, Post } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { Response } from './response';
import { Forest } from '../entities/forest';
import { Context } from 'koa';
import { ForestService } from '../services/forest.service';
import { Inject } from 'typescript-ioc';


export class ForestController {

  @Inject
  forestService: ForestService;

  /**
   * Finds all available users
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/forests')
  public async findAll() {
    return Response.success(await Forest.find());
  }

  @Post('/api/forests')
  public async save(ctx: Context): Promise<Response<Forest>> {
    return Response.success(await this.forestService.save(ctx.request.body));
  }
}
