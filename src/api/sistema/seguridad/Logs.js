import { fetchJSON, Metodo } from "@/api/base";
import store from '@/store/store';

export default {
  consultarLogs(id) {
    return fetchJSON(
      Metodo.GET,
      `logs/${id}`,
      null,
      this.parametros());
  },
  solicitarUrl(idSeguimiento, pathFile) {
    return fetchJSON(
      Metodo.GET,
      'herramientas/archivos/privados',
      null,
      this.parametrosSolicitudUrl(idSeguimiento, pathFile)
    );
  },
  parametros() {
    return {
      dominioPortal: 'portal.febos.cl', // Solo para pruebas locales
      usuarioId: store.getters['configuraciones/usuarioId']
    }
  },
  parametrosSolicitudUrl(idSeguimiento, pathFile) {
    return {
      descargable: 'no',
      dominioPortal: 'portal.febos.cl',
      nombre: idSeguimiento,
      path: pathFile
    }
  },
}
