import { Delete, Get, Post } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { Parcel } from '../entities/parcel';
import { Response } from './response';
import { Context } from 'koa';
import { Inject } from 'typescript-ioc';
import { ParcelService } from '../services/parcel.service';
import { ParcelImage } from '../entities/parcel-image';
import { ImageUploaderService } from '../services/image-uploader.service';
import { S3Service } from '../services/s3.service';
import * as Stripe from 'stripe';
import { Transaction } from '../entities/transaction';

import { decode } from 'jsonwebtoken';
import { User } from '../entities/user';


export class ParcelController {


  @Inject
  parcelService: ParcelService;

  @Inject
  uploaderService: ImageUploaderService;

  @Inject
  s3Service: S3Service;


  /**
   * Finds all available parcels
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/parcels')
  public async findAll(ctx: IRouterContext, next: Function) {
    return Response.success(await Parcel.find());
  }

  /**
   * Finds one parcel by id
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/parcels/:id')
  public async findOneById(ctx: Context, next: Function) {
    return Response.success(await this.getWithConserved(ctx.params.id));
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

  @Post('/api/parcels/:id/upload')
  public async uploadImage(ctx: Context): Promise<Response<ParcelImage>> {
    const id = ctx.params.id;
    const files = ctx.request.body.files;
    const parcel = await Parcel.findOneById(id);

    if (!parcel) {
      return Response.error(500, 'Parcel is not defined');
    }


    if (!files || !files.image) {
      return Response.error(500, 'No files attached');
    }

    const file = files.image;
    const versions = await this.uploaderService.upload(file.path);

    if (!parcel.images) {
      parcel.images = [];
    }

    let image = new ParcelImage();
    image.url = versions[0].url;
    image.thumbnailUrl = versions[1].url;

    image.awsKey = versions[0].key;
    image.awsThumbnailKey = versions[1].key;

    image.parcel = parcel;

    image = await image.save();

    return Response.success(image);
  }

  @Post('/api/parcels/charge/:id')
  public async conserve(ctx: Context): Promise<Response<any>> {
    const id = ctx.params.id;
    const parcel = await Parcel.findOneById(id);

    if (!parcel) {
      return Response.error(500, 'Parcel is undefined');
    }

    ///// TEMP: Will be moved to auth middleware
    const authorizationHeader = (ctx.headers.Authorization || ctx.headers.authorization);
    const authtoken = authorizationHeader.split(' ').pop();
    const tokenObj = decode(authtoken);

    if (!tokenObj) {
      return Response.error(401, 'No authorized');
    }

    const user = await User.findOneById(tokenObj.userId);
    if (user.accessToken != authtoken) {
      return Response.error(401, 'No authorized');
    }
    //// TEMP


    const {email, token, amount} = ctx.request.body;
    const stripe = new Stripe(STRIPE_SECRET_API_KEY);

    const customer = await stripe.customers.create({email, source: token});
    console.log('Got customer: ', customer);

    await stripe.charges.create({amount, description: 'Conserve', currency: 'usd', customer: customer.id});

    console.log('Charge was created!!');

    const trn = new Transaction();
    trn.parcel = parcel;
    trn.amount = amount;
    trn.user = user;
    // trn.user =
    await trn.save();

    return Response.success(await this.getWithConserved(id));
  }


  @Delete('/api/parcels/image/:id')
  public async deleteImage(ctx: Context): Promise<Response<any>> {
    const id = ctx.params.id;
    const image = await ParcelImage.findOneById(id);

    if (!image) {
      return Response.error(500, 'Undefined forest');
    }

    await this.s3Service.remove(image.awsKey);
    await this.s3Service.remove(image.awsThumbnailKey);

    await ParcelImage.removeById(id);

    return Response.success('OK');
  }

  private async getWithConserved(id: number){
    const parcel = await Parcel.findOneById(id);

    let res: any = {...parcel};
    if (parcel.transactions && parcel.transactions.length) {
      const trn = parcel.transactions[0];
      const user = await User.findOneById(trn.userId);
      res = {...res, conservedBy: {id: user.id, name: user.firstName}};
    }

    return res;
  }
}
