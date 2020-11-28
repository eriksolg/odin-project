const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        }, ]
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
    performance: {
        maxAssetSize: 10240000
    },
};