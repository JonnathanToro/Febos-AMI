/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
let host='';
switch(process.env.VUE_APP_PRODUCTO){
  case 'ed': host='vue.portal.escritoriodigital.cl';break;
  case 'narvi': host='vue.portal.narvi.cl';break;
  case 'febos': host='vue.portal.febos.cl';break;
}

module.exports = {
  publicPath: `/${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}/`,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
    'vuex-persist'
  ],
  devServer: {
    disableHostCheck: true,
    host: host
  },
  configureWebpack: {
    devtool: 'cheap-module-source-map'
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}

