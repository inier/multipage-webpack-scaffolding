// .env-cmdrc.js
// 环境变量值会被识别为string，在使用时需要处理类型，特别是bool值，需要 === "true"判断真值。

module.exports = {
    development: {
        // NODE_ENV: 'development',
    },
    production: {
        // NODE_ENV: 'production',
        // BUNDLE_VISUALIZE: false,
    },
    debug: {
        GENERATE_SOURCEMAP: true, // 开启SOURCEMAP
        DROP_CONSOLE: false, // 不去除console
        VCONSOLE: true, // 开启Vconsole
    },
    test: {},
    uat: {
        PORT: 8080,
    },
};
