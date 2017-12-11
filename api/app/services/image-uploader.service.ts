import * as Uploader from 's3-uploader';
import { existsSync } from 'fs';
import { ForestImage } from '../entities/forest-image';

export class ImageUploaderService {

  client;

  constructor() {
    const options = {
      aws: {
        path: 'images/',
        region: S3_REGION,
        acl: 'public-read',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      },

      versions: [
        {
          maxHeight: 1040,
          maxWidth: 1040,
          format: 'jpg',
          suffix: '-large',
          quality: 80
        },

        {
          maxHeight: 100,
          format: 'png',
          suffix: '-thumb',
          quality: 80
        }
      ]
    };

    this.client = new Uploader(S3_BUCKET, options);
  }

  /**
   * Uploads priovided image to s3
   * @param {string} path
   */
  async upload(path: string): Promise<ForestImage> {
    console.log('Uploading path', path);
    // return Promise.resolve(null);
    return new Promise<ForestImage>((resolve, reject) => {
      this.client.upload(path, {}, async (err, versions, meta) => {
        console.log(err);
        if (err) {
          reject();
        }
        console.log(versions);
        console.log(meta);

        let image = new ForestImage();
        image.url = versions[0].url;
        image.thumbnailUrl = versions[1].url;

        image.awsKey = versions[0].key;
        image.awsThumbnailKey = versions[1].key;


        image = await image.save();

        resolve(image);
      });
    });
  }
}
