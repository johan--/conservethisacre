import * as AWS from 'aws-sdk';

export class S3Service {

  s3;

  constructor() {
    this.s3 = new AWS.S3({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY});
  }

  /**
   * Removes object from s3
   */
  remove(key): Promise<any> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObjects({
          Bucket: S3_BUCKET,
          Delete: {
            Objects: [
              {Key: key}
            ]
          }
        },
        (err, data) => {
          if (err) {
            reject();
          } else {
            resolve();
          }
        }
      );
    });
  }
}
