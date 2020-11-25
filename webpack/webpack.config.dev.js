/**
 * 开发环境配置
 */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const config = require('./config');
const utils = require('./utils');
// 引入基础配置文件
const webpackBase = require('./webpack.config.base');

// 合并配置文件
module.exports = utils.pushHtmlWebpackPlugins(
    webpackMerge(webpackBase, {
        mode: 'development',
        devtool: 'source-map',
        // 插件
        plugins: [new webpack.HotModuleReplacementPlugin()],
        // 配置 webpack-dev-server
        devServer: Object.assign(
            {},
            {
                // 项目根目录
                contentBase: '/',
                port: 8080,
                inline: true,
                open: true,
                hot: true,
                before(_, server) {
                    server._watch('../src/pages');
                },
                publicPath: '/',
                historyApiFallback: true,
                disableHostCheck: true,
                // 错误、警告展示设置
                overlay: {
                    warnings: true,
                    errors: true,
                },
                // 配置在命令行中出现的提示信息
                stats: {
                    all: false,
                    hash: true,
                    timings: true,
                    version: true,
                    modules: true,
                    maxModules: 0,
                    errors: true,
                    warnings: true,
                    moduleTrace: true,
                    errorDetails: true,
                },
            },
            config.devServer,
        ),
    }),
);
