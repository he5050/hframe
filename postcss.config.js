// browser support list see here: https://github.com/ai/browserslist#queries
module.exports = {
  plugins: [
    require('postcss-import')(),
    require('autoprefixer')({
      browsers: [
        '> 1%',
        'last 2 versions',
        'Chrome >= 15',
        'Explorer >= 9',
        'Firefox >= 12',
        'Safari >= 5.1',
        'Opera >= 12',
        'Android >= 4.1',
        'iOS >= 8'
      ],
      cascade: true, // 是否美化属性值 默认：true 像这样：
      remove: true // 是否去掉不必要的前缀 默认：true
    }), // CSS浏览器兼容
    require('cssnano')() // 压缩css
  ]
};
