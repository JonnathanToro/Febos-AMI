import { fetchJSON, Metodo } from "../base";
import entorno from "../../utils/entorno";

export default {
  listar() {
    return fetchJSON(Metodo.GET, 'empresas', '', this.parametrosColombia);
  },
  // TODO: Normalizacion - Enpoint de CL distinto a CO
  parametrosColombia() {
    if (entorno.obtenerTld() === 'co') return {
      filas: 1,
      pagina: 1
    };
    return null
  }
}
