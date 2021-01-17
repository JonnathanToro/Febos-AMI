/* eslint-disable import/order */
/*
=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================
*/

import Vue from 'vue';
import 'jquery';
import 'bootstrap';
import App from './App';

import './filters/filters';

import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css';
import 'vuesax/dist/vuesax.css';

// Febos Config
// import febosConfig from './febos/servicios/febosConfig.js'

// axios
import clientApi from './febos/servicios/clienteFebosAPI';

// Theme Configurations
import '../themeConfig';

// Globally Registered Components
import './globalComponents';

// Date Time
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

// Styles: SCSS
import './assets/scss/vuexy/main.scss';
import './assets/scss/bootstrap/main.scss';

// Tailwind
import '@/assets/css/main.css';

// Vue Router
import router from './router';

// Vuex Store
import store from './store/store';
// import { sync } from 'vuex-router-sync'

// sync(store, router)

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer';

// idle
import IdleVue from 'idle-vue';

// PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

import VeeValidate from 'vee-validate';

import Fragment from 'vue-fragment';

Vue.use(Vuesax);
Vue.use(require('vue-moment'));

Vue.moment.locale('es', {
  months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  monthsShort: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
  monthsParseExact: true,
  weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado'],
  weekdaysShort: ['dom.', 'lun.', 'mar.', 'mie.', 'jue.', 'vie.', 'sab.'],
  weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY H:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
  },
  calendar: {
    sameDay() {
      return `[hoy a la${(this.hours() !== 1) ? 's' : ''}] LT`;
    },
    nextDay() {
      return `[mañana a la${(this.hours() !== 1) ? 's' : ''}] LT`;
    },
    nextWeek() {
      return `dddd [a la${(this.hours() !== 1) ? 's' : ''}] LT`;
    },
    lastDay() {
      return `[ayer a la${(this.hours() !== 1) ? 's' : ''}] LT`;
    },
    lastWeek() {
      return `[el] dddd [pasado a la${(this.hours() !== 1) ? 's' : ''}] LT`;
    },
    sameElse: 'L'
  },
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años'
  },
  ordinalParse: /\d{1,2}º/,
  ordinal: '%dº',
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
});

Vue.prototype.$http = clientApi;

Vue.component('datetime', Datetime);

Vue.use(VueHammer);
Vue.use(Fragment.Plugin);

const eventsHub = new Vue();
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 1000 * 60 * 15 // 15 minutos
});

// Feather font icon
require('./assets/css/iconfont.css');

Vue.use(VeeValidate);
// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
/* let archivoPackage=require('../package.json');
console.log('config',archivoPackage);
process.env.VUE_APP_VERSION = archivoPackage.version;
console.log('VERSION: ',process.env.VUE_APP_VERSION)
*/
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
