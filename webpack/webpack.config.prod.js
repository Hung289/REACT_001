const Webpack = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    stats: 'errors-only', // chỉ xuất khi có lỗi
    devtool: 'source-map',  // khuyên dùng (Tránh inline-***và eval-***sử dụng trong prod vì có thể làm tăng kích thước và giảm hiệu suất tổng thể)
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
});