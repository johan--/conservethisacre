import { Delete, Get, Post } from '../decorators/route.decorator';
import { Response } from './response';
import { Forest } from '../entities/forest';
import { Context } from 'koa';
import { ForestService } from '../services/forest.service';
import { Inject } from 'typescript-ioc';
import { ImageUploaderService, UploaderType } from '../services/image-uploader.service';
import { ForestImage } from '../entities/forest-image';
import { S3Service } from '../services/s3.service';
import { AuthAdmin } from '../middleware/permissions.middleware';


export class ForestController {

  @Inject
  forestService: ForestService;

  @Inject
  uploaderService: ImageUploaderService;

  @Inject
  s3Service: S3Service;

  /**
   * Finds all available forests
   * @returns {Promise<void>}
   */
  @Get('/api/forests')
  public async findAll(context: Context) {
    return Response.success(await Forest.find());
  }

  /**
   * Finds one forest entry by its id
   * @returns {Promise<void>}
   */
  @Get('/api/forests/:id')
  public async findOneById(ctx: Context) {
    const forest = await Forest.getRepository().findOneById(ctx.params.id, {
      join: {
        alias: 'forest',
        leftJoinAndSelect: {
          parcels: 'forest.parcels',
          transactions: 'parcels.transactions'
        }
      }
    });
    if (!forest) {
      return Response.error(404, 'Forest not found');
    }

    return Response.success(forest);
  }

  @Post('/api/forests', AuthAdmin)
  public async save(ctx: Context): Promise<Response<Forest[]>> {
    await this.forestService.save(ctx.request.body);
    return Response.success(await Forest.find());
  }

  // TODO: refactor copy paste here and in parcels
  @Post('/api/forests/:id/upload', AuthAdmin)
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
    const versions = await this.uploaderService.upload(file.path, UploaderType.IMAGE_UPLOADER);

    if (!forest.images) {
      forest.images = [];
    }


    let image = new ForestImage();
    image.url = versions[0].url;
    image.thumbnailUrl = versions[1].url;

    image.awsKey = versions[0].key;
    image.awsThumbnailKey = versions[1].key;


    image = await image.save();


    forest.images.push(image);

    await forest.save();

    return Response.success(image);
  }

  @Delete('/api/forests/image/:id', AuthAdmin)
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

  @Delete('/api/forests/:id', AuthAdmin)
  public async delete(ctx: Context): Promise<Response<any>> {
    await this.forestService.delete(ctx.params.id);
    return Response.success(await Forest.find());
  }
}
