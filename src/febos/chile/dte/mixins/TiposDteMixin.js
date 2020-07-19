export default {
  data() {
    return {
      tipos: {
        33:'Factura Afecta Electrónica',
        34:'Factura Exenta Electrónica'
      }
    }
  },
  methods: {
    traducitTipoDocumentoEnPalabras(tipoDocumento) {
      let palabras = this.tipos[tipoDocumento];
      return typeof palabras == 'undefined'?'Desconocido':palabras;
    }
  }
}
