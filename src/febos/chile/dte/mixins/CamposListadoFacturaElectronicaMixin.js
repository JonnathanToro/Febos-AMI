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
        },
        NCND:{
          ancho:'100',
          nombre:'NC/ND',
          camposApi:['tieneNc', 'tieneNd']
        },
        EstadoPago:{
          ancho:'100',
          nombre:'Estado Pago',
          camposApi:['estadoComercial']
        },
        Plazo:{
          ancho:'100',
          nombre:'Plazo',
          camposApi:['plazo']
        },
        RecepcionSii:{
          ancho:'100',
          nombre:'Recepción SII',
          camposApi:['fechaRecepcionSii']
        },
        RecepcionFebos:{
          ancho:'100',
          nombre:'Recepción Narvi',
          camposApi:['fechaRecepcion']
        },
        IndicadorEstadoComercial: {
          ancho: '140',
          nombre: 'Estados',
          camposApi: ['estadoComercial']
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
