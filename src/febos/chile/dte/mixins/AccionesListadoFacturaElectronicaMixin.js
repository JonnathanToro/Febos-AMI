export default {
  data() {
    return {
      definicionAcciones: {
        Bitacora: {
          icono: 'list',
          nombre: 'Bitacora',
          permiso: 'WB001'
        },
        EnviarAprobacion: {
          icono: 'call_split',
          nombre: 'Enviar a aprobación',
          permiso: 'WB001'
        },
        VerReferencias: {
          icono: 'visibility',
          nombre: 'Ver referencias',
          permiso: 'WB001'
        },
        AsociarDocumento: {
          icono: 'assignment',
          nombre: 'Asociar documento',
          permiso: 'WB001'
        },
        DescargarPdf: {
          icono: 'picture_as_pdf',
          nombre: 'Descargar PDF',
          permiso: 'WB001'
        },
        DescargarPdfCedible: {
          icono: 'picture_as_pdf',
          nombre: 'Descargar PDF Cedible',
          permiso: 'WB001'
        },
        DescargarAmbosPdf: {
          icono: 'picture_as_pdf',
          nombre: 'Descargar ambos PDF',
          permiso: 'WB001'
        },
        DescargarXml: {
          icono: 'code',
          nombre: 'Descargar XML',
          permiso: 'WB001'
        },
        InfoPago: {
          icono: 'attach_money',
          nombre: 'Información de pago',
          permiso: 'WB001'
        },
        AnotacionesSii: {
          icono: 'account_balance',
          nombre: 'Ver anotaciones SII',
          permiso: 'WB001'
        },
        EnviarDte: {
          icono: 'email',
          nombre: 'Enviar DTE',
          permiso: 'WB001'
        },
        RecuperarCorreoSii: {
          icono: 'drafts',
          nombre: 'Recuperar correo SII',
          permiso: 'WB001'
        },
        ModificarTipoVenta: {
          icono: 'edit',
          nombre: 'Modificar tipo venta',
          permiso: 'WB001'
        },
        CopiarDocumento: {
          icono: 'add_to_photos',
          nombre: 'Copiar documento',
          permiso: 'WB001'
        },
        AyudaEnDocumento: {
          icono: 'help_outline',
          nombre: 'Ayuda con este documento',
          permiso: 'WB001'
        }
      }
    }
  },
  methods: {
    obtenerAccion(nombreAccion) {
      let accion = this.definicionAcciones[nombreAccion];
      accion.accion = nombreAccion;
      return accion;
    }
  }
}
