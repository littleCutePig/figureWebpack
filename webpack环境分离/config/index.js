//生产环境与开发环境区分的配置
const path = require('path');
const config = {
    entryPath: path.resolve('src/app.js'),
    development: {
        port: process.env.PORT || 3000, //process.env.PORT  node全局对象,通过set设置set PORT=端口号
        mode: 'development'
    },
    production: {
        outputPath: path.resolve('dist'), //绝对路径  得到工程目录
        mode: 'production'
    }
}
module.exports = config;