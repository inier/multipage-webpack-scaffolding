/**
 * 开发环境配置
 */

const chalk = require('chalk');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { merge } = require('webpack-merge');
const { devServer, srcPath } = require('./config');
const utils = require('./utils');
// 引入基础配置文件
const webpackBase = require('./webpack.config.base');

const webpackConfig = utils.pushHtmlWebpackPlugins(
    merge(webpackBase, {
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
                    server._watch(srcPath);
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
            devServer,
        ),
    }),
);

// const compiler = webpack(webpackConfig);
// // 拿到 devServer 参数
// const chainDevServer = compiler.options.devServer;
// const server = new WebpackDevServer(compiler, Object.assign(chainDevServer, {}));

// ['SIGINT', 'SIGTERM'].forEach((signal) => {
//     process.on(signal, () => {
//         server.close(() => {
//             process.exit(0);
//         });
//     });
// });

// // 端口被占用的处理
// const portFinder = require('portfinder');
// portFinder.basePort = process.env.PORT || devServer.port;
// portFinder.getPort((err, port) => {
//     if (err) {
//         reject(err);
//     } else {
//         // 在进程中存储下当前最新端口
//         process.env.PORT = port;

//         // 监听端口
//         server.listen(port);
//     }

//     Promise.resolve(() => {
//         compiler.hooks.done.tap('dev', (stats) => {
//             const empty = '    ';
//             const common = `start running at:
//     - Local: http://127.0.0.1:${port}${publicPath}\n`;
//             console.log(chalk.cyan(`\n${empty}${common}`));
//         });
//     });
// });

// 合并配置文件
module.exports = webpackConfig;
