// 头部引入
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')



module.exports = {
  configureWebpack: {
    // 解决路径问题
    resolve: {
      extensions: ['.js', '.vue', '.json', 'css'],
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        // router对象 和 store对象 可以直接拿取，因此这里不必配置
      },
      fallback: { fs: false }
    },
    plugins: [new NodePolyfillPlugin()]
    
  }
}
