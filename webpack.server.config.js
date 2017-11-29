const {resolve} = require('path');
const webpack = require('webpack');

function root(path) {
    return resolve(__dirname, path);
}

module.exports = {
    entry: root('./api/app/app.ts'),
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        path: root('dist'),
        filename: 'api.js'
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

    // plugins : [
    //     new webpack.NormalModuleReplacementPlugin(
    //         /src\/environments\/environment.ts/,
    //         'environment.prod.ts'
    //     )
    // ]
};
