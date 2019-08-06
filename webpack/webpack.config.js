const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        bundle: __dirname + '/src/main.js',
        'vender': ['vue', 'element-ui']
    },
    output: {
        path: __dirname + '/dist',
        filename: `[name].js`
    },
    module: {
        rules: [{
            test: /\.css$/,
            // use: ['style-loader', 'css-loader']
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000
            }
        }, {
            test: /\.js$/,
            include: /src/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }]
        }]
    },
    plugins: [ //插件
        new HtmlWebpackPlugin({
            title: 'my App',
            template: './index.html', //生成的新的html文件所依赖的模板
            filename: 'index.html', //生成的新的html文件的名字

        }),
        new webpack.HotModuleReplacementPlugin(), //热更新
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new webpack.optimize.SplitChunksPlugin({ name: 'vendor' }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        port: 9000,
        host: 'localhost',
        open: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/login': {}
        }
    },
    resolve: { //配置附属项
        extensions: ['.js', '.css', '.json'], //可以省略扩展名
        alias: { //配置路径别名
            "@css": './css' //相对于入口文件
        }
    }
}