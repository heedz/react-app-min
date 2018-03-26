var webpack = require('webpack'),
path = require('path');
var PROD = (process.env.NODE_ENV === 'production');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
// entry: [
//      //'webpack-dev-server/client?http://0.0.0.0:3000'
//     './src/index.js'
// ],
entry:'./src/index.js',
output: {
    path: __dirname + "/scripts/",
    publicPath: "/scripts/",
    filename: "bundle.js",
},
devtool: "source-map",
devServer: {
    inline:true,
    port: 3000,
    //historyApiFallback: true, 
    contentBase: './public',
},
resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js",".jsx", ".json", ".less", ".svg"],
    alias: {
         "jquery": path.join(__dirname, "./src/js/jquery-stub.js")
    }
},
module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            // exclude: /(node_modules|bower_components)/,
            loader :'babel-loader',
            query  :{
                presets: ['es2015', 'react'],
				plugins: ["transform-class-properties"]
            }
        },
        {
            test: /\.less$/,
            use:  ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'less-loader']
            })
        },
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
},
plugins:PROD ? [
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: { 
            warnings: false,
            drop_console: true,
            unused: true,
            dead_code: true
            }
        }),
    new ExtractTextPlugin("styles.css")
    ] : [
        new ExtractTextPlugin("styles.css")
    ],
};
