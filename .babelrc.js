// .babelrc.js

module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'lodash-es',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'lodash',
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],

    presets: [
        [
            '@babel/preset-env',
            {
                modules: false, //设置ES6 模块转译的模块格式 默认是 commonjs
                debug: false, // debug，编译时的打印
                useBuiltIns: 'usage', // 配合 browserList 自动按需导入 polyfill
                corejs: { version: 3, proposals: true },
                targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
                },
            },
        ],
    ],
};
