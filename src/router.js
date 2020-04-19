import Vue from 'vue'
import Router from 'vue-router'
import rutasChile from "./router/chile/rutasChile";
import autenticacion from "./febos/servicios/autenticacion";

Vue.use(Router)

var rutas = [];

switch (`${process.env.VUE_APP_CODIGO_PAIS}`) {
  case "cl":
    rutas = rutasChile
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes: [
    ...rutas,
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})


router.beforeEach((hacia, desde, siguiente) => {
  if(autenticacion.estaLogueado()){
    if(autenticacion.tienePermiso(hacia)){
      siguiente();
    }else{
      siguiente('/no-autorizado')
    }
  }else{
    siguiente('/ingreso')
  }
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

export default router
