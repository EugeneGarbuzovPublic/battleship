const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/*todo look for webpack deprecated API checker*/
module.exports = {
    entry: {
        main: [
            'react-hot-loader/patch',
            'regenerator-runtime/runtime',
            './ClientApp/index.jsx',
            './ClientApp/styles/styles.css'
        ]
    },
    /*todo add production build*/
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist/'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    /*todo remove from production*/
    devtool: 'eval-source-map',
    plugins: [
        new CleanWebpackPlugin()
    ]
};
