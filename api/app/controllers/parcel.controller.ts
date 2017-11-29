import { Get } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { Parcel } from '../entities/parcel';
import { Response } from './response';


export class ParcelController {

  /**
   * Finds all available users
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/parcels')
  public async findAll(ctx: IRouterContext, next: Function) {
    return Response.success(await Parcel.find());
  }
}
