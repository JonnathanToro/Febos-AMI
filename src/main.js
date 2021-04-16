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
import './assets/scss/main.scss';
import './assets/scss/multiSelect.scss';
import './assets/scss/treeView.scss';
import '@core/assets/fonts/feather/iconfont.css'; // For form-wizard
import '@core/scss/core.scss';
import '@/assets/scss/style.scss';
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

import '../node_modules/timeline-vuejs/dist/timeline-vuejs.css';

import VeeValidate from 'vee-validate';
import spanish from 'vee-validate/dist/locale/es';

import vSelect from 'vue-select';

import VueLogger from 'vuejs-logger';
import './shame';

import VTooltip from 'v-tooltip';

Vue.use(Vuesax);
Vue.use(require('vue-moment'));

Vue.component('v-select', vSelect);

Vue.use(VTooltip);

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

const eventsHub = new Vue();
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 1000 * 60 * 15 // 15 minutos
});

// Feather font icon
require('./assets/css/iconfont.css');

Vue.use(VeeValidate, {
  locale: 'es',
  dictionary: {
    es: {
      messages: spanish.messages,
      attributes: {
        documentType: 'tipo de documento',
        matter: 'materia',
        institutionType: 'tipo de institución',
        subjectType: 'para el tipo de destino',
        subject: 'destino',
        subjectTypeDigitalDoc: 'lista de instituciones',
        subjectEmail: 'correo',
        copySubjectType: 'para el tipo dedistribución',
        copySubject: 'distribución',
        copySubjectTypeDigitalDoc: 'lista de instituciones',
        copySubjectEmail: 'correo',
        documentDetail: 'detalle',
        mainFileName: 'documento principal',
        relatedDocumentType: 'relacionado con',
        relatedDocumentNumber: 'nº de documento',
        stepType: 'tipo de paso',
        rolType: 'tipo de rol',
        userStep: 'usuario',
        groupStep: 'grupo',
        personEmail: 'correo de persona',
        creatorGroup: 'grupo asociado a expediente',
        approach: 'alcance',
        renew: 'reinicio',
        initialSheet: 'folio inicial',
        configId: 'elemento grupo',
        configIdUser: 'elemento usuario',
        configFolio: 'folio inicial'
      }
    }
  }
});
// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
/* let archivoPackage=require('../package.json');
console.log('config',archivoPackage);
process.env.VUE_APP_VERSION = archivoPackage.version;
console.log('VERSION: ',process.env.VUE_APP_VERSION)
*/
Vue.config.productionTip = false;

const isProduction = process.env.NODE_ENV === 'production';
const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger, options);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
