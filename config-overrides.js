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
        target: 'http://www.ljhhhx.com:8080',
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
    disableEsLint()
  ),
  devServer: overrideDevServer(
    devServerConfig()
  ),
  paths: (paths, env) => {
    return paths;
  }
};