## Webpack ?
- Là công cụ giúp đóng gói các tài nguyên thành 1 hoặc nhiều file 

### Tại sao sử dụng webpack? 
- Giúp bundle các file JS , Css thành 1 file
- Minify assets
- Biên dịch tự động Scss, Es6, 
- Có mode Dev và Prod
- Dễ dàng cài đặt và sử dụng React
- Tăng tốc Project
- Phân chia các module và chỉ load khi cần 

### Đặc điểm
- Mỗi dự án sẽ có 1 kiểu setup khác nhau 

### Một số core concepts Webpack 
**-  Bable**
**-  Entry**
**-  OutPut**
**-  Loaders**
**-  Plugin**
**-  Mode**

## Bable
- Biến đổi ES6 -> ES5
- Giúp kết nối các module lại với nhau
> Một số các module 
- `Babel-loader`:  giúp bable làm việc với webpack 
- `Bable-core`:  giúp lấy và phân tích code ra 1 file output
- `Bable-preset-evn`: Bộ quy tắc để nói và giải thích với bable về cú pháp ES6 và làm thế nào để chuyển đổi về Es5
- `Bable-preset-react`: Chuyển đổi code Jsx => Reactjs

## Entry
- Là file webpack bắt đầu làm việc (input)
- Có 1 số các option (Single Entry,Object , Arr)
- Dự vào kiểu option webpack sẽ bundle ra kiểu khác nhau 
```javascript

module.exports = {
  entry: './path/to/my/entry/file.js',
};
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
    test: './path/to/my/entry/file.js',
  },
};
// => Obj sẽ được bundle ra nhiều file 
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
};


// => Arr sẽ được bundle thành 1 file duy nhất
```
## OutPut 
- Nơi cấu hình cho tên file thư mục sẽ được lưu ở đâu sau khi được webpack complie

## Loader
- `Mặc định webpack chỉ hiểu được Javascript và Json files`
- Loader như là tiền xử lý sẽ can thiệp hoặc biến đổi vào file mà webpack không hiểu để làm cho webpack có thể hiểu
- Các loader thì được xây dựng sẵn
- Phạm vi ở các module
> 2 thành phần chính Loader
- Test : đề cập tới file mình mình can thiệp biến đổi
- Use : để xác định kiểu loader nào được sử dụng

```javascript
module.exports = {
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
};

// Can thiệp vào file đuôi css và sử dụng các loader như Style-loader, Css-loader
```

## Plugin
- Cũng tương tự như loader nhưng phạm vi can thiệp sẽ rộng hơn giúp có thể mở rộng nhiều tính năng.
> Có 2 loại Plugin
1. Plugin Có săn của webpack
2. Plugin build in do cộng động phát triển phải cần cài đặt 

## Mode 
> Có 2 mode chính `Development` và `Production`
- tùy vào mode mà có những cấu hình khác nhau


```javascript 

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        app: "./src/index.js", // có thể nhiều entry dùng { } bandel nhiều entry or [] bandle ra 1 entry
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].bundle.js',
        clean: true, // Xóa những file trong dist ~ CleanWebpackPlugin()
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    watch: true, // Theo dõi sự thay đổi của code
    devServer: {
        open: true,
        historyApiFallback: true,
        port: 9999
    },

    // Các loader
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, // không file node 
                loader: 'babel-loader',
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                loader: 'babel-loader'
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
```
- DefinePlugin
  - Định nghĩa các biến của dự án tại thời điểm thực thi, thường là các biến môi trường
