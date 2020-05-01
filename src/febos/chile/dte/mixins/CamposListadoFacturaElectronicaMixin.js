export default {
  data(){
    return {
      definicionCampos:{
        EstadosEmision:{
          ancho:'100',
          nombre:'Estados',
          camposApi:['estadoSii','estadoComercial']
        },
        MontoTotal:{
          ancho:'140',
          nombre:'Monto Total',
          camposApi:['montoTotal']
        },
        Documento:{
          ancho:'',
          nombre:'Documento',
          camposApi:['razonSocialEmisor','razonSocialReceptor','folio']
        },
        TrackId:{
          ancho:'40',
          nombre:'Track ID',
          camposApi:['trackId']
        },
        FechaEmision:{
          ancho:'130',
          nombre:'Fch. Emisión',
          camposApi:['fechaEmision']
        },
        FechaEnvioSii:{
          ancho:'130',
          nombre:'Envío al SII',
          camposApi:['fechaEnvioSii']
        }
      }
    }
  },
  methods:{
    obtenerCampoTabla(nombreCampo){
      let campo=this.definicionCampos[nombreCampo];
      campo.campo=nombreCampo;
      return campo;
    }
  }
}
