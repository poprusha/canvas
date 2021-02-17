import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { FileDescriptor, WebpackManifestPlugin } from 'webpack-manifest-plugin';
import path from 'path';

module.exports = {
  context: path.join(__dirname, './'),
  mode: 'production',
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.ts'],
  },
  target: 'web',
  entry: {
    app: ['regenerator-runtime/runtime', './src/main.ts'],
    styles: ['./styles/main.scss'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/',
      basePath: 'public/',
      writeToFileEmit: true,
      generate: (seed, files: FileDescriptor[]) => {
        const manifestFiles = files.reduce((manifest, file: FileDescriptor) => {
          manifest[file.name!] = file.path;

          return manifest;
        }, seed);

        return { files: manifestFiles };
      },
    }),
    new FaviconsWebpackPlugin({
      logo: './public/logo.jpg',
    }),
  ],
};
