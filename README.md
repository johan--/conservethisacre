# Conservethisacre

To run project in dev mode simply do:

npm start

If you want to create distribution, you will to do 2 steps:

npm run dist         <- This will create distribution inside ./dist folder
node dist/server     <- Just run this server

# Evnvironment variables

Following environment variables must be defined:

  'CLEARDB_DATABASE_URL'
  'S3_BUCKET'
  'AWS_ACCESS_KEY_ID'
  'AWS_SECRET_ACCESS_KEY'
  'S3_REGION'
  'STRIPE_PUBLIC_API_KEY'
  'STRIPE_SECRET_API_KEY'

If something is not defined, application will not ran, and you will see error in consle

# First Run

When you first time running application - it will start from setup mode where you will need to create first admin user
