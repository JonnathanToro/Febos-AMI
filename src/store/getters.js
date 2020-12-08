/*= ========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

// added so later we can keep breakpoint in sync automatically using this config file
// import tailwindConfig from "../../tailwind.config.js"

export const windowBreakPoint = (state) => {
  // This should be same as tailwind. So, it stays in sync with tailwind utility classes
  if (state.windowWidth >= 1200) return 'xl';
  if (state.windowWidth >= 992) return 'lg';
  if (state.windowWidth >= 768) return 'md';
  if (state.windowWidth >= 576) return 'sm';
  return 'xs';
};

export const scrollbarTag = (state) => (state.is_touch_device ? 'div' : 'VuePerfectScrollbar');

export const currentModule = (state) => state.moduloActual;
