'use strict'

const HTMLWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const {join} = require('path')
const {HotModuleReplacementPlugin} = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
    mode: 'development',
    entry: [
        join(__dirname, '..', 'src', 'app.js')
    ],
    output: {
        path: join(__dirname, '..', 'dist'),
        filename: "app.bundled.js"
    },
    devServer: {
        port: 1234,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1},
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [autoprefixer()],
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            showErrors: true,
            cache: true,
            template: join(__dirname, '..', 'public', 'index.html')
        })
    ]
}
