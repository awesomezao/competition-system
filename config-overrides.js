const {
  override,
  addWebpackAlias,
  overrideDevServer,
  fixBabelImports
} = require('customize-cra');
const path = require('path');

const appPath = target => path.resolve(__dirname, target);
const devServerConfig = () => config => {
  return {
    ...config,
    compress: true,
    // proxy: {
    //   '/api/**': {
    //     target: 'http://localhost:3001',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
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

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': appPath('src'),
      '~': appPath('src/assets')
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    })
  ),
  devServer: overrideDevServer(
    devServerConfig()
  ),
  paths: (paths, env) => {
    return paths;
  }
};