const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// ESLint选项
// 详见: https://webpack.docschina.org/plugins/eslint-webpack-plugin/
const ESLintOptions = {
  context: path.resolve(__dirname, "../src"),
  extensions: ["js", "ts"],
};

// HTML编译选项
const HtmlWebpackOptions = {
  template: path.resolve(__dirname, "../public/index.html"),
};

// CSS编译选项
const MiniCssExtractOptions = {
  filename: "static/css/main.css",
};

// POSTCSS解决样式兼容性问题
const PostCssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: ["postcss-preset-env"],
    },
  },
};

module.exports = {
  // 入口
  entry: "./src/main.ts",
  // 输出
  output: {
    // 文件的输出路径
    path: path.resolve(__dirname, "../dist"),
    // 文件的输出名称
    filename: "static/js/main.js",
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      // loader的配置

      // less-loader 编译less为css
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          PostCssLoader,
          "less-loader",
        ],
      },
      // babel-loader 兼容旧版js
      {
        test: /\.(?:js|ts)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // ts-loader 编译ts为js
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // 小于10kb的图片转base64
      // 优点: 减少请求数量。缺点: 体积会更大
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          // 输出图片名称
          filename: "static/images/[hash][ext][query]",
        },
      },
      // 处理其他资源
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  // 插件
  plugins: [
    // plugin的配置
    new ESLintPlugin(ESLintOptions),
    new HtmlWebpackPlugin(HtmlWebpackOptions),
    new MiniCssExtractPlugin(MiniCssExtractOptions),
  ],
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  // 模式
  mode: "production",
};
