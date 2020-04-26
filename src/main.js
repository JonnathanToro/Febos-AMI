/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)

// Febos Config
//import febosConfig from "./febos/servicios/febosConfig.js"

// axios
import clienteFebosAPI from "./febos/servicios/clienteFebosAPI";
Vue.prototype.$http = clienteFebosAPI


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'
//import { sync } from 'vuex-router-sync'

//sync(store, router)

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// idle
import IdleVue from 'idle-vue'

const eventsHub = new Vue()
Vue.use(IdleVue, {
    eventEmitter: eventsHub,
    idleTime: 1000*60*15 //idle al no hacer nada por 15 minutos
})

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

process.env.VUE_APP_VERSION = require('../package.json').version

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

