export default {
  esEjecucionLocal(){
    let dominio=window.location.href.split("/")[2].split(":").shift();
    let locales=["localhost","local.febos.cl","127.0.0.1"];
    return locales.includes(dominio);
  },
  obtenerAmbiente() {
    const posiblesAmbientes = /desarrollo|produccion|certificacion|pruebas/i;
    try {
      const partes = window.location.href
        .replace('https://', '')
        .replace('http://', '')
        .split('/');

      return partes[1].match(posiblesAmbientes) != null
        ? partes[1]
        : process.env.VUE_APP_POR_DEFECTO_AMBIENTE;
    } catch (e) {
      return process.env.VUE_APP_POR_DEFECTO_AMBIENTE;
    }
  },
  obtenerAmbito() {
    const posiblesAmbitos = /cloud|proveedores|cliente/i;
    try {
      const partes = window.location.href
        .replace('https://', '')
        .replace('http://', '')
        .split('/');

      if (partes[0].includes('localhost')) {
        return partes[2].match(posiblesAmbitos)
          ? partes[2]
          : process.env.VUE_APP_POR_DEFECTO_AMBITO;
      } else {
        return partes[3].match(posiblesAmbitos)
          ? partes[3]
          : process.env.VUE_APP_POR_DEFECTO_AMBITO;
      }
    } catch (e) {
      return process.env.VUE_APP_POR_DEFECTO_AMBITO;
    }
  },

  obtenerDominio() {
    const resultados = window.location.href
      .match(/^https?:\/\/([^/:?#]+)(?:[/:?#]|$)/i);
    return resultados != null && resultados.length >= 2 ? resultados[1] : '';
  },

  obtenerTld() {
    try {
      return window.location.origin.match(/\.\w{2,3}\b/g).join('').substring(1);
    }catch(e){
      return process.env.VUE_APP_POR_DEFECTO_DOMINIO;
    }
  }

}
