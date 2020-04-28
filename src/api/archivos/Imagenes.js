import { fetchJSON, uploadFile, Metodo } from "../base";
import entorno from '../../utils/entorno';
import store from '../../store/store';

export default {
  cargarAvatar(url, imagen) { return uploadFile(Metodo.PUT, url, imagen) },
  solicitarURL() {
    return fetchJSON(
      Metodo.GET,
      `/herramientas/archivos`,
      null,
      this.parametros)
  },
  parametros() {
    return {
      tipo: 'upload',
      contentType: 'image/jpg',
      dominioPortal: 'portal.febos.cl',
      key: `febos-io/publicar/archivos.febos.io/${entorno.obtenerTld()}/${entorno.obtenerAmbiente()}/usuario/${store.getters['configuraciones/usuarioIut']}/perfil.jpg`
    }
  }
}
