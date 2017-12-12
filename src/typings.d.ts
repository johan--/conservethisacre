declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare var DATABASE_URL: string;
declare var S3_BUCKET: string;
declare var S3_REGION: string;
declare var AWS_ACCESS_KEY_ID: string;
declare var AWS_SECRET_ACCESS_KEY: string;
declare var STRIPE_PUBLIC_API_KEY: string;
declare var STRIPE_SECRET_API_KEY: string;

declare class Stripe {
  constructor(apiKey: string, version?: string);

  elements();
}

declare var StripeCheckout: any;
