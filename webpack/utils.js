const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { pagePath } = require('./config');

// 入口文件定义
const entries = function () {
    const entryFiles = glob.sync(`${pagePath}/*/*.{js,jsx}`);
    const map = {};

    entryFiles.forEach((filePath) => {
        const tArr = filePath.split('/');
        const filename = tArr[tArr.length - 2];

        map[filename] = filePath;
    });

    return map;
};

// 多页面 HtmlWebpackPlugin 定义
exports.pushHtmlWebpackPlugins = (webpackConfig, options = {}) => {
    const entriesFiles = entries();

    if (Object.keys(entriesFiles).length) {
        const entryTpl = glob.sync(`${pagePath}/*/*.{ejs,tpl,html}`);
        webpackConfig.entry = entriesFiles;

        entryTpl.forEach((filePath) => {
            const tArr = filePath.split('/');
            const filename = tArr[tArr.length - 2];

            let template = filePath;

            // 如果是ejs文件，启用ejs-loader编译
            if (['.tpl', '.ejs'].includes(path.extname(filePath))) {
                template = `${template}`;
            }

            const conf = {
                template: template,
                filename: `${filename}.html`,
            };

            // 如果和入口js文件同名
            if (filename in entriesFiles) {
                conf.inject = 'body';
                conf.chunks = ['vendor', filename];
                conf.inlineSource = '.(js|css)$';
            }

            webpackConfig.plugins.push(
                new HtmlWebpackPlugin({
                    ...conf,
                    ...options,
                }),
            );
        });
    }

    return webpackConfig;
};
