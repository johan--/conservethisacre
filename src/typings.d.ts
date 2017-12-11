/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare var DATABASE_URL: string;
declare var S3_BUCKET: string;
declare var S3_REGION: string;
declare var AWS_ACCESS_KEY_ID: string;
declare var AWS_SECRET_ACCESS_KEY: string;
