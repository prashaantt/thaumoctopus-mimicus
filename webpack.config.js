const Path = require('path');
// const Webpack = require('webpack');

module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://127.0.0.1:8080/',
        // 'webpack/hot/only-dev-server',
        './dist/client'
    ],
    output: {
        path: Path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'shared'],
        extensions: ['', '.js', '.jsx']
    }
    // module: {
    //     loaders: [
    //         {
    //             test: /\.jsx?$/,
    //             exclude: /node_modules/,
    //             loaders: ['react-hot', 'babel', 'react']
    //         }
    //     ]
    // },
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin(),
    //     new webpack.NoErrorsPlugin()
    // ],
    // devtool: 'inline-source-map',
    // devServer: {
    //     hot: true,
    //     proxy: {
    //         '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    //     },
    //     host: '127.0.0.1'
    // }
};
