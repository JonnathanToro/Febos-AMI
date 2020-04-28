export default {
  tipoDocumento(codigo) {
    switch(codigo){
      case "33": return "Factura Afecta Electrónica";
      case "34": return "Factura Exenta Electrónica";
      case "39": return "Boleta Afecta Electrónica";
      case "41": return "Boleta Afecta Electrónica";
      case "43": return "Liquidación de Factura Electrónica";
      case "46": return "Factura de Compra Electrónica";
      case "52": return "Guía de Despacho Electrónica";
      case "56": return "Nota de Débito Electrónica";
      case "61": return "Nota de Crédito Electrónica";
      case "110": return "Factura de Exportación Electrónica";
      case "111": return "Nota de Débito de Electrónica";
      case "112": return "Nota de Crédito de Electrónica";
    }
  }

}
