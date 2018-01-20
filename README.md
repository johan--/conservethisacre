# Conservethisacre

To run project in dev mode simply do:

npm start

If you want to create distribution, you will to do 2 steps:

npm run dist         <- This will create distribution inside ./dist folder

node dist/server     <- Just run this server

# Environment variables

Following environment variables must be defined:

  - 'CLEARDB_DATABASE_URL'
  - 'S3_BUCKET'
  - 'AWS_ACCESS_KEY_ID'
  - 'AWS_SECRET_ACCESS_KEY'
  - 'S3_REGION'
  - 'STRIPE_PUBLIC_API_KEY'
  - 'STRIPE_SECRET_API_KEY'

If something is not defined, application will not ran, and you will see error in consle

# Secrets

AWS, Stripe secrets must be defined as environment variables. However some of the secrets
are defined in environment.*.ts files, that are used by browser.

/src/environments/environment.ts
/src/environments/environment.prod.ts

If you are running project in dev mode - you need to odify environment.ts, otherwise, please modify environment.prod.ts

Here are properties that should be set:

- facebookAppId
- googleMapsKey
- stripeApiKey

# First Run

When you first time running application - it will start from setup mode where you will need to create first admin user
