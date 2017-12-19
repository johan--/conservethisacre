import * as Uploader from 's3-uploader';

export interface ImageVersion {
  url: string;
  key: string;
}

const defaultOptions = (path: string) => ({
  aws: {
    path: path,
    region: S3_REGION,
    acl: 'public-read',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  },
});

const imageOptions = {
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
}

const panoramaOptions = {
  versions: [
    {
      maxHeight: 100,
      format: 'png',
      suffix: '-thumb',
      quality: 80
    }
  ],

  original: {}
}

export enum UploaderType {
  IMAGE_UPLOADER = 0, PANORAMA_UPLOADER = 1
}

export class ImageUploaderService {
  /**
   * Uploads images and creates -thumb - large versions
   */
  imageUploader;


  /**
   * Uploads panoramas creating only thumb image
   */
  panoramaUploader;

  constructor() {
    if (!S3_REGION) {
      S3_REGION = 'us-east-1';
    }

    this.imageUploader = new Uploader(S3_BUCKET, {...defaultOptions('images/'), ...imageOptions});
    this.panoramaUploader = new Uploader(S3_BUCKET, {...defaultOptions('panoramas/'), ...panoramaOptions});
  }

  /**
   * Uploads provided image to s3
   * @param {string} path
   * @param type
   */
  async upload(path: string, type: UploaderType): Promise<ImageVersion[]> {
    // return Promise.resolve(null);
    console.log('Uploading by type: ', type);
    return new Promise<ImageVersion[]>((resolve, reject) => {
      this.getUploader(type).upload(path, {}, async (err, versions, meta) => {
        console.log(err);
        if (err) {
          reject();
        }
        console.log(versions);
        console.log(meta);

        resolve(versions);
      });
    });
  }

  getUploader(type: UploaderType) {
    return type == UploaderType.IMAGE_UPLOADER ? this.imageUploader : this.panoramaUploader;
  }
}
