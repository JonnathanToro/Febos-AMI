import { fetchJSON, Metodo } from "../base";
import store from '@/store/store';

export default {

  /**
   * Obtener acceso del backend
   * @param cuerpo
   * @returns {void|Promise<{ok}|never>}
   */
  acceder(cuerpo) {
    return fetchJSON(
      Metodo.POST,
      'usuarios/login',
      cuerpo
    );
  },
  /**
   *
   * @param cuerpo
   * @returns {Promise<{ok}|never>}
   */
  modificarUsuario(cuerpo) {
    return fetchJSON(
      Metodo.PUT,
      `usuarios/${store.getters['configuraciones/usuarioId']}`,
      cuerpo,
      this.parametros()
    );
  },
  /**
   *
   * @returns {Promise<{ok}|never>}
   */
  actividades(id, pagina) {
    return fetchJSON(
      Metodo.GET,
      `usuarios/${id}/actividades`,
      null,
      this.parametrosActividades(id, pagina)
    );
  },
  /**
   *
   * @returns {Promise<{ok}|never>}
   */
  listarUsuarios() {
    return fetchJSON(
      Metodo.GET,
      'usuarios',
      null,
      this.parametrosUsuarios()
    );
  },
  /**
   *
   * @returns {{dominioPortal: string, usuarioId: *, simular: string}}
   */
  parametros() {
    return {
      dominioPortal: 'portal.febos.cl', // Solo para pruebas locales
      usuarioId: store.getters['configuraciones/usuarioId'],
      simular: 'no'
    }
  },
  /**
   *
   * @returns {{acciones: string, completado: string, debug: string, direccionIp: string, dominioPortal: string, fechaDesde: string, fechaHasta: string, itemsPorPagina: string, pagina: string, usuarioId: *, simular: string, usuarios: string}}
   */
  parametrosActividades(id, pagina) {
    return {
      acciones: '',
      completado: 'todos',
      direccionIp: '',
      dominioPortal: 'portal.febos.cl', // Solo para pruebas locales
      fechaDesde: '',
      fechaHasta: '',
      itemsPorPagina: '10',
      pagina: pagina,
      usuarioId: store.getters['configuraciones/usuarioId'],
      simular: 'no',
      usuarios: '',
      filtros:`usuarioId:${id}`
    }
  },
  /**
   *
   * @returns {{debug: string, dominioPortal: string, filas: number, pagina: number, simular: string}}
   */
  parametrosUsuarios() {
    return {
      debug: 'si',
      dominioPortal: 'portal.febos.cl',
      filas: 100,
      pagina: 1,
      simular: 'no'
    }
  }
}
