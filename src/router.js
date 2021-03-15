import Vue from 'vue';
import Router from 'vue-router';
import localForage from 'localforage';

import * as authentication from './febos/servicios/authentication';

import routes from '@/routes';
import store from '@/store/store';

Vue.use(Router);

const getRoutes = () => routes[process.env.VUE_APP_CODIGO_PAIS]() || [];

const originalPush = Router.prototype.push;

Router.prototype.push = function portalPush(location) {
  const { params: { portal: routePortal } } = this.history.current;
  console.log('ROUTE PORTAL', routePortal);
  const portal = routePortal || process.env.VUE_APP_DEFAULT_PORTAL;

  if (typeof location === 'string' || location instanceof String) {
    console.log(location);
    const path = location.includes(`/${portal}`) ? location : `/${portal}${location}`;
    return originalPush.call(this, {
      path,
      params: { portal }
    });
  }

  const params = { portal, ...(location.params || {}) };

  const updatedLocation = location.path
    ? {
      ...location,
      path: location.path.includes(`/${portal}`) ? location.path : `/${portal}${location.path}`,
      params
    }
    : {
      ...location,
      params
    };

  return originalPush.call(this, updatedLocation);
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    ...getRoutes(),
    {
      path: '*',
      redirect: {
        name: 'page-error-404',
        params: { portal: process.env.VUE_APP_DEFAULT_PORTAL }
      }
    }
  ]
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  const portal = to.params.portal || process.env.VUE_APP_DEFAULT_PORTAL;
  const key = `${process.env.VUE_APP_CODIGO_PAIS}.${portal}.${process.env.VUE_APP_AMBIENTE}.redirect`;

  console.log('TO', to);
  console.log('FROM', from);
  if (!to.meta.requiereLogin) {
    return next();
  }

  if (!authentication.isLogged()) {
    return next({ name: 'sign-in', params: { portal } });
  }

  if (!authentication.hasPermission(to)) {
    await localForage.setItem(key, to.fullPath);
    return next({ name: 'page-error-404', params: { portal } });
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
