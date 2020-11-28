/**
 * 生产环境配置
 */
/* eslint-disable */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBaseConfig = require('./webpack.config.base');
// UglifyJsPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 优化打包css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const utils = require('./utils');

const env = process.env.NODE_ENV;

let prodWebpackConfig = {
    mode: 'production',
    stats: {
        children: false,
    },
    devtool: 'nosources-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // 默认js
                test: /\.js(\?.*)?$/i,
                exclude: /\.min\.js$/,
                // 开启 sourceMap
                sourceMap: true,
                // 启用文件缓存
                cache: true,
                // 推荐，开启多线程（可设置运行线程数量）
                parallel: true,
                // 配置项
                uglifyOptions: {
                    compress: {
                        unused: true,
                        // warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        reduce_vars: true,
                    },
                    output: {
                        comments: false,
                    },
                },
                // 是否把注释提到单独的文件中（[name].[ext].LICENSE）
                extractComments: false,
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    preset: [
                        'default',
                        {
                            autoprefixer: true,
                            discardComments: {
                                removeAll: true,
                            },
                            zindex: false,
                        },
                    ],
                },
                canPrint: false,
            }),
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors/vendors',
                    reuseExistingChunk: true,
                    chunks: 'async',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    name: 'vendors/common',
                    reuseExistingChunk: true,
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
        }),
    ],
    performance: {
        hints: false,
    },
};

prodWebpackConfig = utils.pushHtmlWebpackPlugins(merge(webpackBaseConfig, prodWebpackConfig), {
    minify: false,
});

module.exports = prodWebpackConfig;
