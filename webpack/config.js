/**
 * 全局配置文件
 */
const path = require('path');

const resolve = (dir) => {
    return path.resolve(__dirname, '..', dir);
};

// 路径定义
const srcPath = resolve('src');
const distPath = resolve('dist');
const pagePath = resolve('src/pages');
const nodeModPath = resolve('node_modules');
// 发布到服务器的文件夹
const publicPath = '/';

// 内联最大size限制，单位byte
const limit = {
    // html中的img标签
    imageInHtml: 10000,
    image: 10000,
    media: 10000,
    font: 10000,
};

// 开发服务器
const devServer = {
    port: 3000,
    contentBase: '/',
    open: true,
};

module.exports = {
    devServer,
    srcPath,
    distPath,
    pagePath,
    nodeModPath,
    publicPath,
    limit,
};
