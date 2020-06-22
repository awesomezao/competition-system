const {
  override,
  addWebpackAlias,
  overrideDevServer,
  fixBabelImports,
  disableEsLint,
} = require('customize-cra');
const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

const appPath = target => path.resolve(__dirname, target);
const devServerConfig = () => config => {
  return {
    ...config,
    compress: true,
    proxy: {
      '/meeting-v2/**': {
        target: '额，这个就不能暴露了',
        changeOrigin: true,
        pathRewrite: {
          '^/meeting-v2': '/meeting-v2'
        }
      }
    }
  }
}

module.exports = {
  webpack: override(
    (config, env) => {
      config = rewireReactHotLoader(config, env)
      return config
    },
    addWebpackAlias({
      '@': appPath('src'),
      '~': appPath('src/assets'),
      'react-dom':'@hot-loader/react-dom'
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    disableEsLint()
  ),
  devServer: overrideDevServer(
    devServerConfig()
  ),
  paths: (paths, env) => {
    return paths;
  }
};