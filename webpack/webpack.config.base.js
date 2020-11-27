'use strict';

const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { srcPath, distPath, nodeModPath, publicPath, staticPath, limit } = require('./config');
const env = process.env.NODE_ENV;
const isDev = env === 'development';

const webpackConfig = {
    // 配置入口
    entry: {},
    // 配置出口
    output: {
        path: distPath,
        filename: `${staticPath}/js/[name].[hash:8].js`,
        chunkFilename: `${staticPath}/js/[chunkhash:8].chunk.js`,
        publicPath: publicPath,
    },
    // 路径配置
    resolve: {
        extensions: ['.js', '.json', '.css', '.less', '.scss', '.tpl', '.ejs', '.html'],
        alias: {
            '@': srcPath,
            _: `${srcPath}/assets/lib/lodash.js`,
            jQuery: `${srcPath}/assets/lib/jquery.js`,
            commonJS: `${srcPath}/assets/js/common.js`,
            commonCSS: `${srcPath}/assets/css/common.css`,
        },
    },
    // loader配置
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                    },
                },
                enforce: 'pre',
                include: [srcPath],
                exclude: /(node_modules|assets|server)/,
            },
            {
                test: /\.(ejs|tpl)$/,
                use: {
                    loader: 'ejs-loader',
                    options: {
                        variable: 'data',
                        esModule: false,
                        // mustache模板：
                        // 具体参考lodash/underscore的template方法
                        interpolate: '\\{\\{(.+?)\\}\\}',
                        evaluate: '\\[\\[(.+?)\\]\\]',
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            // html中的img标签
            {
                test: /\.html$/,
                use: {
                    loader: 'html-withimg-loader',
                    options: {
                        limit: limit.imageInHtml,
                        name: `${staticPath}/images/[name].[hash:8].[ext]`,
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                include: [srcPath],
                exclude: /(node_modules|assets|server)/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: limit.image,
                        name: `${staticPath}/images/[name].[hash:8].[ext]`,
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: limit.media,
                        name: `${staticPath}/media/[name].[hash:8].[ext]`,
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: limit.font,
                        name: `${staticPath}/fonts/[name].[hash:8].[ext]`,
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.css$/,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.less$/,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.(sass|scss)$/,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
        ],
    },
    plugins: [
        // 全局引入lodash
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        // // 设置每一次build之前先删除dist
        // new CleanWebpackPlugin(
        //     ['dist/*'], // 匹配删除的文件
        //     {
        //         root: path.resolve(__dirname, '../'), // 根目录
        //         verbose: true, // 开启在控制台输出信息
        //         dry: false, // 启用删除文件
        //     },
        // ),
        // 从js中提取css配置
        new MiniCssExtractPlugin({
            filename: env === 'prod' ? `${staticPath}/css/[name].[contenthash:8].css` : '[name].css',
            chunkFilename: env === 'prod' ? `${staticPath}/css/[name].[contenthash:8].css` : '[name].css',
        }),
    ],
};

module.exports = webpackConfig;
