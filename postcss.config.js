module.exports = {
    plugins: [
        require('autoprefixer')({
        browsers: ['last 5 version','Android >= 4.0'],
        //是否美化属性值 默认：true
        cascade: true,
        //是否去掉不必要的前缀 默认：true
        remove: true
    }),
        require('postcss-import'),
        require('postcss-nested'),
        require('css-mqpacker')(), 
        require('cssnano')(),
        require('postcss-preset-env')({
            features: {
                'custom-media-queries': true,
            },
        }),
        require('postcss-reporter'),
    ],
};
