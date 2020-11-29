// .env-cmdrc.js
// 环境变量值会被识别为string，在使用时需要处理类型，特别是bool值，需要 === "true"判断真值。

module.exports = {
    development: {
        NODE_ENV: 'dev',
    },
    production: {
        NODE_ENV: 'prod',
    },
    debug: {
        NODE_ENV: 'debug',
    },
    lint: {
        NODE_ENV: 'lint',
    },
    test: {},
    uat: {
        PORT: 8080,
    },
};
