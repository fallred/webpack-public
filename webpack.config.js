let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let LessExtract = new ExtractTextWebpackPlugin({
    filename: 'css/less.css',
    disable: true
});
let CssExtract = new ExtractTextWebpackPlugin({
    filename: 'css/css.css',
});
let PurifycssWebpack = require('purifycss-webpack');
let glob = require('glob');
// 基于node的 遵循commonjs规范的
module.exports = {
    entry: './src/index.js',// 入口
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
        CssExtract,
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['./build']),
        // 打包html插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: '珠峰架构',
            hash: true
        }),
        // 将没用的css删除掉，一定要放在HtmlWebpackPlugin后面
        new PurifycssWebpack({
            paths: glob.sync(path.resolve('src/*.html'))
        })
    ],// 插件的配置
    mode: 'development',//可以更改模式
    resolve: {},// 配置解析
    module:{
        rules:[ //从右往左写
            // {test: /\.css$/, use:['style-loader','css-loader']}
            {
                test: /\.css$/,
                // use:[{
                //     loader: 'style-loader'
                // },{
                //     loader: 'css-loader'
                // }]
                use: CssExtract.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader: 'css-loader',
                        loader: 'postcss-loader',
                    }]
                })
            },
        ]
    }
};
// 1.在webpack中如何配置开发服务器 webpack-dev-server
// 2. webpack插件 1将html打包到build下可以自动引入生产的js

