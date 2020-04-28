import { fetchJSON, Metodo } from "../base";
import entorno from '../../utils/entorno';

export default {

  listarEmitidos() {
    if(entorno.obtenerTld()=='cl'){
      // integración antigua, solo para chile
      return fetchJSON(Metodo.GET, 'documentos', undefined, {
        categoria: 'emitidos',
        cantidad: 10,
        inicio: 0,
        orden: 'fecha_emision desc',
      });
    }else {
      //integración de documentos estandard para todos los paises
      return fetchJSON(Metodo.GET, 'v2/documentos', undefined, {
        categoria: 'emitidos',
        cantidad: 10,
        inicio: 0,
        orden: 'fecha_emision desc',
      });
    }
  },
}
