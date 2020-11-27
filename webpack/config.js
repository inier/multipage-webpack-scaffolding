/**
 * 全局配置文件
 */
const path = require('path');

const resolve = (dir) => {
    return path.resolve(__dirname, '..', dir);
};

const config = {
    PORT: 8888,
    PATH: {
        PUBLIC_PATH: '/public/',
    },
    DIR: {
        DIST: 'build',
        VIEW: 'pages',
        STYLE: 'css',
        SCRIPT: 'js',
        FONT: 'fonts',
        IMAGE: 'images',
    },
    EXT: 'ejs',
};

// 路径定义
const srcPath = resolve('src');
const distPath = resolve(config.DIR.DIST);
const pagePath = resolve(`src/${config.DIR.VIEW}`);
const nodeModPath = 'node_modules';

// 发布到服务器的文件夹
const publicPath = '/';
const staticPath = 'static';

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
    staticPath,
    limit,
};
