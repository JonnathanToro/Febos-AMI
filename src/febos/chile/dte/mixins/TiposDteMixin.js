export default {
  data() {
    return {
      tipos: {
        33:'Factura Afecta Electrónica',
        34:'Factura Exenta Electrónica',
        39:'Boleta Afecta Electrónica',
        41:'Boleta Exenta Electrónica',
        52:'Guía de Despacho Electrónica',
        56:'Nota de Débito Electrónica',
        61:'Nota de Crédito Electrónica',
        110:'Factura de Exportación Electrónica',
        111:'Nota de Débito de Exportación Electrónica',
        112:'Nota de Crédito de Exportación Electrónica'
      }
    }
  },
  methods: {
    traducitTipoDocumentoEnPalabras(tipoDocumento) {
      let palabras = this.tipos[tipoDocumento];
      return typeof palabras == 'undefined'?'(' + tipoDocumento + ') Desconocido':palabras;
    }
  }
}
