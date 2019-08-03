const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const webpack               = require('webpack');
const path                  = require('path');


const PATHS = {
    src:    path.join(__dirname, '../src'),
    dist:   path.join(__dirname, '../dist'),
    assets: 'assets'
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}/js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: ['/node_modules/']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                //exclude: '/node_modules/',
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search:'',
                            replace:'',
                            flags:'g'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.jpg|cur|gif|png|svg$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin({
            contextRegExp: /\.DS_Store$/
        }),
        new webpack.ProvidePlugin({
            // $: 'jquery',
            // jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].[hash].css`
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img/`, to: `${PATHS.assets}/img/` },
            { from: `${PATHS.src}/static/`, to: '' },
        ]),
    ]
};