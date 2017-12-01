import { Delete, Get, Post } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { Parcel } from '../entities/parcel';
import { Response } from './response';
import { Context } from 'koa';
import { Inject } from 'typescript-ioc';
import { ParcelService } from '../services/parcel.service';


export class ParcelController {


  @Inject
  parcelService: ParcelService;

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

  @Post('/api/parcels')
  public async save(ctx: Context): Promise<Response<Parcel[]>> {
    await this.parcelService.save(ctx.request.body);
    return Response.success(await Parcel.find());
  }

  @Delete('/api/parcels/:id')
  public async delete(ctx: Context): Promise<Response<any>> {
    await this.parcelService.delete(ctx.params.id);
    return Response.success(await Parcel.find());
  }
}
