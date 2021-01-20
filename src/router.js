import Vue from 'vue';
import Router from 'vue-router';
import localForage from 'localforage';

import routesCL from './router/chile';
import * as authentication from './febos/servicios/authentication';

import store from '@/store/store';

Vue.use(Router);

const getRoutes = () => {
  switch (process.env.VUE_APP_CODIGO_PAIS) {
    case 'cl':
      return routesCL;

    default:
      return [];
  }
};

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    ...getRoutes(),
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  const key = `${process.env.VUE_APP_CODIGO_PAIS}.${process.env.VUE_APP_PORTAL}.${process.env.VUE_APP_AMBIENTE}.redirect`;

  if (!to.meta.requiereLogin) {
    return next();
  }

  if (!authentication.isLogged()) {
    return next('/ingreso');
  }

  if (!authentication.hasPermission(to)) {
    await localForage.setItem(key, to.fullPath);
    return next('/no-autorizado');
  }

  return next();
};

router.beforeEach(waitForStorageToBeReady);

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
  // document.getElementById('app').style.display = 'none';
});

export default router;
