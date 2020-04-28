import { fetchFile, Metodo } from "../base";

export default {
  obtenerArchivo(url) {
    return fetchFile(
      Metodo.GET,
      url
    );
  },
}
