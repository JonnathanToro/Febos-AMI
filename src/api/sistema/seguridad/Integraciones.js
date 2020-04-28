import { fetchJSON, Metodo } from "@/api/base";
import store from '@/store/store';

export default {
  /**
   *
   * @returns {*}
   */
  listar() {
    return fetchJSON(
      Metodo.GET,
      `usuarios/${store.getters['configuraciones/usuarioIut']}/token`, null, this.parametros());
  },
  /**
   *
   * @param alias
   * @returns {*}
   */
  crear(alias) {
    return fetchJSON(
      Metodo.PUT,
      `usuarios/${store.getters['configuraciones/usuarioIut']}/token`, null, this.parametrosCrear(alias));
  },
  /**
   *
   * @param token
   * @returns {*}
   */
  borrar(token) {
    return fetchJSON(
      Metodo.DELETE,
      `usuarios/${store.getters['configuraciones/usuarioIut']}/token`, null, this.parametrosBorrar(token));
  },
  /**
   *
   * @param payload
   * @returns {*}
   */
  editar(payload) {
    return fetchJSON(
      Metodo.POST,
      `usuarios/${store.getters['configuraciones/usuarioIut']}/token`, null, this.parametrosEditar(payload));
  },
  /**
   *
   * @returns {{dominioPortal: string, usuarioId: *}}
   */
  parametros() {
    return {
      dominioPortal: 'portal.febos.cl', // Solo para pruebas locales
      usuarioId: store.getters['configuraciones/usuarioId']
    }
  },
  /**
   *
   * @param tokenEspecifico
   * @returns {{tokenEspecifico: *}}
   */
  parametrosBorrar(tokenEspecifico) {
    return {
      ...this.parametros(),
      tokenEspecifico
    }
  },
  /**
   *
   * @param alias
   * @returns {{alias: *}}
   */
  parametrosCrear(alias) {
    return {
      ...this.parametros(),
      alias
    }
  },
  /**
   *
   * @param payload
   * @returns {{alias: *, tokenEspecifico: *}}
   */
  parametrosEditar(payload) {
    return {
      ...this.parametros(),
      alias: payload.alias,
      tokenEspecifico: payload.token
    }
  }
}
