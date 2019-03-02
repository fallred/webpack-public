let path = require('path');
// 基于node的 遵循commonjs规范的
module.exports = {
    entry:'./src/index.js',// 入口
    output: {
        filename: 'build.js',
        // 这个路径必须是绝对路径
        path:path.resolve('./build')
    },// 出口
    devServer: {
        contentBase: './build',
        port: 3000,
        compress: true,// 服务器压缩
        open: true, //自动打开浏览器
        hot: true
    },// 开发服务器
    module: {},//模块配置
    plugins: [],// 插件的配置
    mode: 'development',//可以更改模式
    resolve: {},// 配置解析
};
// 1.在webpack中如何配置开发服务器 webpack-dev-server

