const {resolve, join} = require('path');
const webpack = require('webpack');

function root(path) {
  return resolve(__dirname, path);
}

module.exports = function (options, webpackOptions) {

  options = options || {};

  const config = {
    entry: root('./server.ts'),
    resolve: {extensions: ['.js', '.ts']},
    target: 'node',
    // this makes sure we include node_modules and other 3rd party libraries
    // externals: [/(node_modules|main\..*\.js)/],
    output: {
      path: join(__dirname, 'dist'),
      filename: 'server.js'
    },

    externals: [
      'pg-hstore',
      'tedious',
      'redis',
      'sqlite3',
      'pg-native',
      /(node_modules|main\..*\.js)/
    ],

    module: {
      rules: [
        {test: /\.ts$/, loader: 'ts-loader'}
      ]
    },
    plugins: [
      new webpack.DefinePlugin({"global.GENTLY": false}),

      new webpack.DefinePlugin({
        DATABASE_URL: JSON.stringify(process.env.CLEARDB_DATABASE_URL),
        S3_BUCKET: JSON.stringify(process.env.S3_BUCKET),
        S3_REGION: JSON.stringify(process.env.S3_REGION),
        AWS_ACCESS_KEY_ID: JSON.stringify(process.env.AWS_ACCESS_KEY_ID),
        AWS_SECRET_ACCESS_KEY: JSON.stringify(process.env.AWS_SECRET_ACCESS_KEY),
        STRIPE_PUBLIC_API_KEY: JSON.stringify(process.env.STRIPE_PUBLIC_API_KEY),
        STRIPE_SECRET_API_KEY: JSON.stringify(process.env.STRIPE_SECRET_API_KEY)
      })
    ]
  }

  return config;
};
