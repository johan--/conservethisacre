import { Delete, Get, Post } from '../decorators/route.decorator';
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
   * @returns {Promise<void>}
   */
  @Get('/api/forests')
  public async findAll() {
    return Response.success(await Forest.find());
  }

  @Post('/api/forests')
  public async save(ctx: Context): Promise<Response<Forest[]>> {
    await this.forestService.save(ctx.request.body);
    return Response.success(await Forest.find());
  }

  @Delete('/api/forests/:id')
  public async delete(ctx: Context): Promise<Response<any>> {
    await this.forestService.delete(ctx.params.id);
    return Response.success(await Forest.find());
  }
}
