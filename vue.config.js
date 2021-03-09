// eslint-disable-next-line import/order,no-unused-vars
const dotenv = require('dotenv');
// eslint-disable-next-line import/order,no-unused-vars
const path = require('path');

/*= ========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
function cargarConfiguracion(producto, envFile, global = false) {
  try {
    dotenv.config({
      path: path.resolve(global ? 'environments/' : `environments/${producto}`, envFile)
    });
  } catch (e) {
    console.error(`No se encontro la configuracion en environments/${producto}/${envFile}`);
  }
}

function loadExtraEnviroment() {
  const mode = process.env.npm_lifecycle_script.replace(/(vue-)(.*)(--mode )/g, '').trim();
  const producto = mode.split('.')[0];
  const ambiente = mode.split('.')[1];
  const portal = mode.split('.')[2];
  const envFile = '.env';
  cargarConfiguracion(producto, `${ambiente}${envFile}`, true);
  cargarConfiguracion(producto, `${ambiente}${envFile}.local`, true);
  cargarConfiguracion(producto, envFile);
  cargarConfiguracion(producto, `${envFile}.local`);
  cargarConfiguracion(producto, `${ambiente}${envFile}`);
  cargarConfiguracion(producto, `${ambiente}${envFile}.local`);
  cargarConfiguracion(producto, `${portal}${envFile}`);
  cargarConfiguracion(producto, `${portal}${envFile}.local`);
  console.log('CARGADO process.env.VUE_APP_PRODUCTO ', process.env.VUE_APP_AMBIENTE);
  console.log('CARGADO process.env.VUE_APP_PRODUCTO ', process.env.VUE_APP_DOMINIO_DEFAULT);
  console.log('CARGADO process.env.VUE_APP_PRODUCTO ', process.env.VUE_APP_PORTAL);
}

loadExtraEnviroment();

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
