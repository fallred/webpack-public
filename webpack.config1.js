let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// 不能分开抽离，只能抽离成一个
let MiniCssTractPlugin = require('mini-css-extract-plugin');

let LessExtract = new ExtractTextWebpackPlugin('css/less.css');
let CssExtract = new ExtractTextWebpackPlugin('css/css.css');
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
        new MiniCssTractPlugin({
            filename:'css/index.css',
        }),
        LessExtract,
        CssExtract,
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['./build']),
        // 打包html插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: '珠峰架构',
            hash: true
        }),
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

                // use: CssExtract.extract({
                //     use:[{
                //         loader: 'css-loader'
                //     }]
                // })

                use: [
                    MiniCssTractPlugin.loader,
                    { loader: 'css-loader'}
                ]
            },
            {
                test:/\.less$/,
                // use: [
                //     { loader: 'style-loader' },
                //     { loader: 'css-loader' },
                //     { loader: 'less-loader' },
                // ]

                // use: LessExtract.extract({
                //     use:[
                //         { loader: 'css-loader' },
                //         { loader: 'less-loader' },
                //     ]
                // })

                 use: [
                    MiniCssTractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },
                ]
            }
        ]
    }
};
// 1.在webpack中如何配置开发服务器 webpack-dev-server
// 2. webpack插件 1将html打包到build下可以自动引入生产的js

