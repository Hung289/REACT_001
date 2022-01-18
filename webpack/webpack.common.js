const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: "./src/index.js", // có thể nhiều entry dùng { } bandel nhiều entry or [] bandle ra 1 entry
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].bundle.js',
        // publicPath: '/',
        clean: true, // Xóa những file trong dist ~ CleanWebpackPlugin()
    },

    /*** 
     * Tránh sự trùng lặp giữa các mã
     * lấy tất cả các thư viện được import trong project, nó sẽ được tách ra thành các file riêng biệt,
     * đến khi nào code logic của ta cần những thư viện đó thì nó sẽ tự động import
     */
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
        }
    },
    // // watch: true,
  
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        }),
    ],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, '../src'),

        }
    }
}