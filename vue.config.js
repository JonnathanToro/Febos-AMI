const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');

/*= ========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
function loadConfiguration(product, envFile, global = false, local = false) {
  try {
    const globalEnvironmentPath = global ? 'environments/' : `environments/${product}`;
    const localEnvironmentPath = local ? `${envFile}.local` : `${envFile}`;
    const environmentPath = path.resolve(globalEnvironmentPath, localEnvironmentPath);
    const envConfig = dotenv.parse(fs.readFileSync(environmentPath));

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in envConfig) {
      process.env[key] = envConfig[key];
    }
  } catch (e) {
    if (!local) {
      console.error(`No se encontro la configuracion en environments/${product}/${envFile}`);
    }
  }
}

function loadExtraEnvironment(mode) {
  const [product, environment, portal] = mode.split('.');
  const envFile = '.env';
  loadConfiguration(product, `${environment}${envFile}`, true);
  loadConfiguration(product, `${environment}${envFile}`, true, true);
  loadConfiguration(product, envFile);
  loadConfiguration(product, envFile, false, true);
  loadConfiguration(product, `${environment}${envFile}`);
  loadConfiguration(product, `${environment}${envFile}`, false, true);
  loadConfiguration(product, `${portal}${envFile}`);
  loadConfiguration(product, `${portal}${envFile}`, false, true);
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

function getMode() {
  if (process.VUE_CLI_SERVICE && process.VUE_CLI_SERVICE.mode) {
    return process.VUE_CLI_SERVICE.mode;
  }
  if (process.env && (process.env.npm_lifecycle_script || '').includes('mode')) {
    return (process.env.npm_lifecycle_script || '').replace(/(vue-)(.*)(--mode )/g, '').trim();
  }
  return undefined;
}

module.exports = () => {
  const mode = getMode();
  if (mode) loadExtraEnvironment(mode);

  return {
    lintOnSave: false,
    publicPath: '/',
    transpileDependencies: ['vue-echarts', 'resize-detector', 'vuex-persist'],
    devServer: {
      disableHostCheck: true,
      host: '127.0.0.1',
      port: 8081,
      public: `${getHost()}:8081/`,
      https: {
        key: fs.readFileSync('./certs/cert.dev.key.pem'),
        cert: fs.readFileSync('./certs/cert.dev.pem'),
      },
    },
    css: {
      loaderOptions: {
        sass: {
          sassOptions: {
            includePaths: ['./node_modules', './src/assets'],
          },
        },
      },
    },
    configureWebpack: {
      devtool: 'cheap-module-source-map',
      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@core': path.resolve(__dirname, 'src/@core')
        },
      },
    }
  };
};
