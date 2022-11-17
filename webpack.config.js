const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const conf =  {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  // devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, './dist'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use:  [
          {
            loader: 'html-loader',
            options: { minimize: false },
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.mp4$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/video/[name][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name][ext]'
        }
      },
      {
        test: /\.mp3$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new  HtmlWebPackPlugin({
      favicon: 'src/assets/icons/favicon.ico',
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  performance: {
    hints: false
  }
};

// module.exports = conf;
module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
  return conf;
}