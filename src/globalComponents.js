/*= ========================================================================================
  File Name: globalComponents.js
  Description: Here you can register components globally
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import Vue from 'vue';
import vSelect from 'vue-select';
import VTooltip from 'v-tooltip';
import {
  ToastPlugin, ModalPlugin, BootstrapVue, BootstrapVueIcons,
} from 'bootstrap-vue';

import VxTooltip from './layouts/components/vx-tooltip/VxTooltip';
import VxCard from './components/vx-card/VxCard';
import VxList from './components/vx-list/VxList';
import VxBreadcrumb from './layouts/components/VxBreadcrumb';
import FeatherIcon from './components/FeatherIcon';
import VxInputGroup from './components/vx-input-group/VxInputGroup';
import HasPermission from './directives/HasPermission';
// v-select component

Vue.component(VxTooltip.name, VxTooltip);
Vue.component(VxCard.name, VxCard);
Vue.component(VxList.name, VxList);
Vue.component(VxBreadcrumb.name, VxBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);
Vue.component(VxInputGroup.name, VxInputGroup);
Vue.directive('has-permission', HasPermission);
// BSV Plugin Registration
Vue.use(VTooltip);
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: (createElement) => createElement('feather-icon', {
      props: {
        icon: 'XIcon',
        svgClasses: 'w-4 h-4 mt-1'
      }
    }),
  },
  OpenIndicator: {
    render: (createElement) => createElement('feather-icon', {
      props: {
        icon: 'ChevronDownIcon',
        svgClasses: 'w-5 h-5'
      }
    }),
  },
});

Vue.component(vSelect);
