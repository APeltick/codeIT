const baseWebpackConfig = require('./webpack.base.conf');
const webpack           = require('webpack');
const merge             = require('webpack-merge');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        contentBase: baseWebpackConfig.externals.paths.dist,
        overlay: true
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});

module.exports = new Promise((resolve) => {
    resolve(devWebpackConfig);
});