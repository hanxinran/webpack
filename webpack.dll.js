const webpack = require('webpack');
const path = require('path');
const isDebug = process.env.NODE_ENV === 'development';
const outputPath = isDebug ? path.join(__dirname, 'dist') : path.join(__dirname, 'src/dll/dist');

// 资源依赖包，提前编译
const lib = [
    'react'
];

module.exports = {
    devtool: '#source-map',
    entry: {
        lib: lib
    },
    output: {
        path: outputPath,
        filename: '[name]_[chunkhash].js',
        library: '[name]_lib',
        // libraryTarget: 'umd',
        // umdNamedDefine: true
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(path.join(__dirname, 'dist'), 'manifest.json'),
            name: '[name]_lib',
            context: __dirname,
        }),
    ]
};