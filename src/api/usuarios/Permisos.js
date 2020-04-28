import {fetchJSON, Metodo} from "../base";

export default {
  /**
   *
   * @returns {Promise<{ok}|never>}
   */
  listarPermisos(id) {
    return fetchJSON(
      Metodo.GET,
      `permisos/${id}/`,
      null,
      this.parametros()
    );
  },
  /**
   *
   * @returns {{dominioPortal: string}}
   */
  parametros() {
    return {
      dominioPortal: 'portal.febos.cl', // Solo para pruebas locales
    }
  },
}
