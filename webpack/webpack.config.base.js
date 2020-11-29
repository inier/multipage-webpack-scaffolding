'use strict';
const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
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
            _: `${srcPath}/assets/js/lodash.js`,
            $: `${srcPath}/assets/js/jquery.js`,
            commonJS: `${srcPath}/assets/js/common.js`,
            commonCSS: `${srcPath}/assets/css/common.scss`,
        },
    },
    // loader配置
    module: {
        rules: [
            {
                test: /\.js$/i,
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
                test: /\.js$/i,
                use: {
                    loader: 'babel-loader',
                },
                include: [srcPath],
                exclude: /(node_modules|assets|server)/,
            },
            {
                test: /\.css$/i,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.less$/i,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.(sass|scss)$/i,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.(ejs|tpl)$/i,
                use: {
                    loader: 'ejs-compiled-loader',
                    options: {
                        htmlmin: true,
                        htmlminOptions: {
                            removeComments: true,
                        },
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            // html中的img标签
            {
                test: /\.(htm|html)$/i,
                use: {
                    loader: 'html-withimg-loader',
                    options: {
                        esModule: false,
                        limit: limit.imageInHtml,
                        name: `${staticPath}/images/[name].[hash:8].[ext]`,
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: limit.image,
                        name: `${staticPath}/images/[name].[hash:8].[ext]`,
                        esModule: false,
                        // fallback: {
                        //     loader: 'file-loader',
                        //     options: {
                        //         esModule: false,
                        //     },
                        // },
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            // do not base64-inline SVGs.
            // https://github.com/facebookincubator/create-react-app/pull/1180
            {
                test: /\.(svg)(\?.*)?$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: `${staticPath}/images/[name].[hash:8].[ext]`,
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: limit.media,
                        name: `${staticPath}/media/[name].[hash:8].[ext]`,
                    },
                },
                include: [srcPath],
                exclude: /(node_modules|server)/,
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: limit.font,
                        name: `${staticPath}/fonts/[name].[hash:8].[ext]`,
                    },
                },
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
        // 从js中提取css配置
        new MiniCssExtractPlugin({
            filename: env === 'prod' ? `${staticPath}/css/[name].[contenthash:8].css` : '[name].css',
            chunkFilename: env === 'prod' ? `${staticPath}/css/[name].[contenthash:8].css` : '[name].css',
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(process.cwd(), 'src/static'), // 打包的静态资源目录地址
        //             to: '/build/static', // 打包到build下面的static
        //         },
        //     ],
        // }),
    ],
};

module.exports = webpackConfig;
