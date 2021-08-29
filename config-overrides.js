const {
  override,
  addWebpackAlias,
  overrideDevServer,
  fixBabelImports,
  disableEsLint,
  addWebpackPlugin,
  setWebpackOptimizationSplitChunks,
  addWebpackModuleRule
} = require('customize-cra');
const path = require('path');
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const HardSourcePlugin = require('hard-source-webpack-plugin')

const fs = require('fs')

const isProd = process.env.NODE_ENV === 'production'
const needAnalyzer = process.env.REACT_APP_ANALYZER === 'true'
const appPath = target => path.resolve(__dirname, target);
const devServerConfig = () => config => {
  return {
    ...config,
    compress: true,
    proxy: {
      '/meeting-v2/**': {
        target: '这个不能暴露',
        changeOrigin: true,
        pathRewrite: {
          '^/meeting-v2': '/meeting-v2'
        }
      }
    }
  }
}
const rewireHotLoader = () => config => {
  config = rewireReactHotLoader(config, config.mode)
  return config
}
const addCompression = () => config => {
  if (isProd) {
    config.plugins.push(
      // 开启gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        threshold: 1024,
        minRatio: 0.9
      })
    )
  }
  return config
}
const addAnalyzer = () => config => {
  if (needAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }
  return config
}
const addSplitChunks = () => config => {
  config.optimization.splitChunks = {//分割代码块
    cacheGroups: {
      vendor: {
        //第三方依赖
        priority: 10, //设置优先级，首先抽离第三方模块
        name: 'vendor',
        test: /node_modules/,
        chunks: 'initial',
        minSize: 0,
        minChunks: 1 //最少引入了1次
      },
      //缓存组
      common: {
        //公共模块
        priority: 5,
        chunks: 'all',
        name: 'common',
        // minSize: 100, //大小超过100个字节
        minChunks: 2, //最少引入了3次
        enforce: true
      }
    }
  }
  return config
}


module.exports = {
  webpack: override(
    rewireHotLoader(),
    addWebpackAlias({
      '@': appPath('src'),
      '~': appPath('src/assets'),
      'react-dom': '@hot-loader/react-dom'
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    disableEsLint(),
    // addCompression(),
    // addWebpackModuleRule({
    //   test: /\.(ts|tsx)$/,
    //   loader: 'babel-loader',
    //   exclude: /node_modules/,
    //   include: [appPath('src')],
    //   options: { plugins: ['lodash'] }
    // }),
    addAnalyzer(),
    addSplitChunks(),
    addWebpackPlugin(
      new ProgressBarPlugin(),
      new HardSourcePlugin(),
      new LodashModuleReplacementPlugin()
    )
  ),
  devServer: overrideDevServer(
    devServerConfig()
  ),
  paths: (paths, env) => {
    return paths;
  }
};