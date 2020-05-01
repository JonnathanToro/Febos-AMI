export default {
  data(){
    return {
      definicionAcciones:{
        Bitacora:{
          icono:'list',
          nombre:'Bitacora',
          permiso: 'WB001'
        },
        EnviarAprobacion:{
          icono:'list',
          nombre:'Enviar a aprobación',
          permiso: 'WB001'
        },
        VerReferencias:{
          icono:'list',
          nombre:'Ver referencias',
          permiso: 'WB001'
        },
        AsociarDocumento:{
          icono:'list',
          nombre:'Asociar documento',
          permiso: 'WB001'
        },
        DescargarPdf:{
          icono:'list',
          nombre:'Descargar PDF',
          permiso: 'WB001'
        },
        DescargarXml:{
          icono:'list',
          nombre:'Descargar XML',
          permiso: 'WB001'
        },
        EnviarDte:{
          icono:'list',
          nombre:'Enviar DTE',
          permiso: 'WB001'
        },
        RecuperarCorreoSii:{
          icono:'list',
          nombre:'Recuperar correo SII',
          permiso: 'WB001'
        },
        ModificarTipoVenta:{
          icono:'list',
          nombre:'Modificar tipo venta',
          permiso: 'WB001'
        },
        CopiarDocumento:{
          icono:'list',
          nombre:'Copiar documento',
          permiso: 'WB001'
        },
        AyudaEnDocumento:{
          icono:'list',
          nombre:'Ayuda con este documento',
          permiso: 'WB001'
        }
      }
    }
  },
  methods:{
    obtenerAccion(nombreAccion){
      let accion=this.definicionAcciones[nombreAccion];
      accion.accion=nombreAccion;
      return accion;
    }
  }
}
