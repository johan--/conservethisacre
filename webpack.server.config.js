const {resolve, join} = require('path');
const webpack = require('webpack');

function root(path) {
  return resolve(__dirname, path);
}

module.exports = {
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
    'tedious'
  ],

  module: {
    rules: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
};
