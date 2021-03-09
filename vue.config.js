/*= ========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
function loadExtraEnviroment(producto) {
  // eslint-disable-next-line import/no-dynamic-require
  const extras = require(`./config/${producto}.json`);
  process.env.VUE_APP_FAV_ICON = extras.general.favicon;
  process.env.VUE_APP_FOOTER = extras.general.footer;
  process.env.VUE_APP_TITULO = extras.general.titulo;
  process.env.VUE_APP_COLOR_PRIMARIO = extras.colores.primario;
  process.env.VUE_APP_COLOR_NAV_VAR = extras.colores.navbar;
}

// eslint-disable-next-line consistent-return
function getHost() {
  // eslint-disable-next-line default-case
  switch (process.env.VUE_APP_PRODUCTO) {
    case 'ed':
      return 'vue.portal.escritoriodigital.cl';
    case 'narvi':
      return 'vue.portal.narvi.cl';
    case 'febos':
      return 'vue.portal.febos.cl';
  }
}

const fs = require('fs');

module.exports = {
  lintOnSave: false,
  publicPath: `/${process.env.VUE_APP_PORTAL}/`,
  transpileDependencies: ['vue-echarts', 'resize-detector', 'vuex-persist'],
  devServer: {
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 8081,
    public: `${getHost()}:8081/${process.env.VUE_APP_PORTAL}/`,
    https: {
      key: fs.readFileSync('./certs/cert.dev.key.pem'),
      cert: fs.readFileSync('./certs/cert.dev.pem'),
    },
  },
  configureWebpack: {
    devtool: 'cheap-module-source-map',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
};
loadExtraEnviroment(process.env.VUE_APP_PRODUCTO);
