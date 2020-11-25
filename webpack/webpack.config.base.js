/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
const srcPath = path.join(process.cwd(), './src');
const distPath = path.join(process.cwd(), './dist/');

let webpackConfig = {
    // 配置入口
    entry: {},
    // 配置出口
    output: {
        path: distPath,
        filename: 'static/js/[name].[hash:8].js',
        publicPath: '/',
    },
    // 路径配置
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': srcPath,
        },
    },
    // loader配置
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [srcPath],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                },
            },
            {
                test: /\.(tpl|ejs)$/,
                loader: 'ejs-loader',
                include: [srcPath],
                query: {
                    variable: 'data',
                    // mustache模板：
                    // 具体参考lodash/underscore的template方法
                    // interpolate : '\\{\\{(.+?)\\}\\}',
                    // evaluate : '\\[\\[(.+?)\\]\\]'
                },
            },
            // html中的img标签
            {
                test: /\.html$/,
                loader: 'html-withimg-loader',
                include: [srcPath],
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [srcPath],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: [env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.(sass|scss)$/,
                use: [env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        // 全局引入lodash
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        // //设置每一次build之前先删除dist
        // new CleanWebpackPlugin(
        //     ['dist/*'], //匹配删除的文件
        //     {
        //         root: path.resolve(__dirname, '../'), //根目录
        //         verbose: true, //开启在控制台输出信息
        //         dry: false, //启用删除文件
        //     },
        // ),
        // 从js中提取css配置
        new MiniCssExtractPlugin({
            filename: env == 'prod' ? 'css/[name].[contenthash:8].css' : '[name].css',
            chunkFilename: env == 'prod' ? 'css/[name].[contenthash:8].css' : '[name].css',
            allChunks: true,
        }),
    ],
};

module.exports = webpackConfig;
