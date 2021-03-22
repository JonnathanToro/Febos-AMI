import Vue from 'vue';
import Router from 'vue-router';
import localForage from 'localforage';

import * as authentication from './febos/servicios/authentication';

import routes from '@/routes';
import store from '@/store/store';

Vue.use(Router);

const ROUTES_WITHOUT_PORTAL = ['root', 'page-error-404'];

const getRoutes = () => {
  const children = routes[process.env.VUE_APP_CODIGO_PAIS]() || [];

  return [
    {
      path: '/:portal',
      name: 'portal',
      meta: { requiereLogin: true },
      component: () => import('@/layouts/PortalPage'),
      children
    },
    {
      path: '/',
      name: 'root',
      component: () => import('@/febos/global/inicio/vistas/PortalSelector'),
      children
    },
    {
      path: '/error-404',
      name: 'page-error-404',
      meta: { layout: 'full-page' },
      component: () => import('@/views/pages/Error404.vue')
    },
    {
      path: '*',
      redirect: {
        name: 'page-error-404'
      }
    }
  ];
};

const originalPush = Router.prototype.push;

Router.prototype.push = function portalPush(location) {
  const { params: { portal: currentPortal } } = this.history.current;
  const { params: { portal: routePortal } = {} } = location;
  const portal = routePortal || currentPortal;

  if (!portal) {
    return originalPush.call(this, '/');
  }

  if (typeof location === 'string' || location instanceof String) {
    const path = location.includes(portal) ? `${location}` : `/${portal}${location}`;
    return originalPush.call(this, {
      path,
      params: { portal }
    })
      // https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a
      // https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
      // comment this to solve route navigation errors.
      .catch((e) => e);
  }

  const params = { portal, ...(location.params || {}) };

  const updatedLocation = location.path
    ? {
      ...location,
      path: location.path.includes(portal) ? `${location.path}` : `/${portal}${location.path}`,
      params
    }
    : {
      ...location,
      params
    };

  return originalPush.call(this, updatedLocation)
    // https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a
    // https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
    // comment this to solve route navigation errors.
    .catch((e) => e);
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: getRoutes()
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  const { params: { portal }, name } = to;
  const key = `${process.env.VUE_APP_CODIGO_PAIS}.${portal}.${process.env.VUE_APP_AMBIENTE}.redirect`;

  if (!ROUTES_WITHOUT_PORTAL.includes(name) && !portal) {
    return next({ name: 'root' });
  }

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
