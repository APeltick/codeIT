const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const baseWebpackConfig         = require('./webpack.base.conf');
const imageminMozjpeg           = require('imagemin-mozjpeg');
const ImageminPlugin            = require('imagemin-webpack-plugin').default;
const merge                     = require('webpack-merge');

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=./[name].[ext]'
            }
        ]
    },
    plugins: [
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: ({quality: 50}),
            plugins: [imageminMozjpeg({quality: 50})]
        }),
        new CleanWebpackPlugin(),
    ]
});

module.exports = new Promise((resolve) => {
    resolve(buildWebpackConfig);
});