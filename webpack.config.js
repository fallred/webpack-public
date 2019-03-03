let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
// 基于node的 遵循commonjs规范的
module.exports = {
    entry: {
       index: './src/index.js',
       a: './src/a.js'
    },// 入口
    output: {
        filename: '[name].[hash:8].js',
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
    plugins: [
        new CleanWebpackPlugin(['./build']),
        // 打包html插件
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',
            title: '珠峰架构',
            hash: true,
            chunks:['index']
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // }
        }),
        new HtmlWebpackPlugin({
            filename: 'b.html',
            template: './src/index.html',
            title: '珠峰架构',
            hash: true,
            chunks:['a']
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // }
        })
    ],// 插件的配置
    mode: 'development',//可以更改模式
    resolve: {}// 配置解析
};
// 1.在webpack中如何配置开发服务器 webpack-dev-server
// 2. webpack插件 1将html打包到build下可以自动引入生产的js

