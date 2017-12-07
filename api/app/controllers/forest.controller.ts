import { Delete, Get, Post } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { Response } from './response';
import { Forest } from '../entities/forest';
import { Context } from 'koa';
import { ForestService } from '../services/forest.service';
import { Inject } from 'typescript-ioc';
import { ImageUploaderService } from '../services/image-uploader.service';
import { ForestImage } from '../entities/forest-image';
import { S3Service } from '../services/s3.service';


export class ForestController {

  @Inject
  forestService: ForestService;

  @Inject
  uploaderService: ImageUploaderService;

  @Inject
  s3Service: S3Service;

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

  @Post('/api/forests/:id/upload')
  public async uploadImage(ctx: Context): Promise<Response<ForestImage>> {
    const id = ctx.params.id;
    const files = ctx.request.body.files;
    const forest = await Forest.findOneById(id);

    if (!forest) {
      return Response.error(500, 'Forest is not defined');
    }


    if (!files || !files.image) {
      return Response.error(500, 'No files attached');
    }

    const file = files.image;
    const image = await this.uploaderService.upload(file.path);

    if (!forest.images) {
      forest.images = [];
    }

    forest.images.push(image);

    await forest.save();

    return Response.success(image);
  }

  @Delete('/api/forests/image/:id')
  public async deleteImage(ctx: Context): Promise<Response<any>> {
    const id = ctx.params.id;
    const image = await ForestImage.findOneById(id);

    if (!image) {
      return Response.error(500, 'Undefined forest');
    }

    await this.s3Service.remove(image.awsKey);
    await this.s3Service.remove(image.awsThumbnailKey);

    await ForestImage.removeById(id);

    return Response.success('OK');
  }

  @Delete('/api/forests/:id')
  public async delete(ctx: Context): Promise<Response<any>> {
    await this.forestService.delete(ctx.params.id);
    return Response.success(await Forest.find());
  }
}
