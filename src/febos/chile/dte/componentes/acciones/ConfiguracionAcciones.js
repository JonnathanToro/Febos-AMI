export default {
  props: ["documento"],
  data() {
    return {
      acciones: [
        {
          accion: "DescargarPdf",
          icono: "picture_as_pdf",
          nombre: "Descargar PDF",
          permiso: "DTE15",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "Bitacora",
          icono: "picture_as_pdf",
          nombre: "Bitácora",
          permiso: "DTE03",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "EnviarAprobacion",
          icono: "picture_as_pdf",
          nombre: "Enviar a Aprobación",
          permiso: "WB166",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "NotificarCobranza",
          icono: "picture_as_pdf",
          nombre: "Notificar Cobranza",
          permiso: "DTE44",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "VerReferencias",
          icono: "picture_as_pdf",
          nombre: "Ver Referencias",
          permiso: "DTE26",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "AsociarDocumento",
          icono: "picture_as_pdf",
          nombre: "Asociar Documento",
          permiso: "DTE26",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "NuevaRendicion",
          icono: "picture_as_pdf",
          nombre: "Nueva Rendición",
          permiso: "RND01",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "DescargarXml",
          icono: "picture_as_pdf",
          nombre: "Descargar XML",
          permiso: "DTE15",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "DescargarAec",
          icono: "picture_as_pdf",
          nombre: "Descargar AEC",
          permiso: "DTE01",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "CertificadoCesion",
          icono: "picture_as_pdf",
          nombre: "Certificado de Cesión",
          permiso: "SII27",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "ProcesarNuevamente",
          icono: "picture_as_pdf",
          nombre: "Procesar Nuevamente",
          permiso: "DTE01",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "InformacionPago",
          icono: "picture_as_pdf",
          nombre: "Información de Pago",
          permiso: "DTE18",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "AnularGuia",
          icono: "picture_as_pdf",
          nombre: "Anular Guía",
          permiso: "DTE41",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "ConsultarEstadoSii",
          icono: "picture_as_pdf",
          nombre: "Consultar Estado SII",
          permiso: "SII08",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "VerAnotacionesSii",
          icono: "picture_as_pdf",
          nombre: "Ver Anotaciones SII",
          permiso: "",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "FechaRecepcionSii",
          icono: "picture_as_pdf",
          nombre: "Fecha Recepción SII",
          permiso: "",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "EnviarDte",
          icono: "picture_as_pdf",
          nombre: "Enviar DTE",
          permiso: "DTE21",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "ReenviarSii",
          icono: "picture_as_pdf",
          nombre: "Reenviar al SII",
          permiso: "DTE21",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "AsociarHes",
          icono: "picture_as_pdf",
          nombre: "Asociar HES",
          permiso: "DTE05",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "AsociarHem",
          icono: "picture_as_pdf",
          nombre: "Asociar HEM/MIGO",
          permiso: "DTE05",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "AsociarOc",
          icono: "picture_as_pdf",
          nombre: "Asociar OC",
          permiso: "DTE05",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "SolicitarDte",
          icono: "picture_as_pdf",
          nombre: "Solicitar DTE",
          permiso: "DTE22",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "ReprocesarDocumento",
          icono: "picture_as_pdf",
          nombre: "Reprocesar Documento",
          permiso: "DTE22",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "Ceder",
          icono: "picture_as_pdf",
          nombre: "Ceder",
          permiso: "CES01",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "RecuperarCorreoSii",
          icono: "picture_as_pdf",
          nombre: "Recuperar Correo SII",
          permiso: "DTE31",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "ModificarTipoVenta",
          icono: "picture_as_pdf",
          nombre: "Modificar Tipo Venta",
          permiso: "DTE28",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "EmitirDocumento",
          icono: "picture_as_pdf",
          nombre: "Enviar DTE",
          permiso: "DTE30",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "CopiarDocumento",
          icono: "picture_as_pdf",
          nombre: "Copiar Documento",
          permiso: "DTE09",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "EditarDocumento",
          icono: "picture_as_pdf",
          nombre: "Editar Documento",
          permiso: "DTE90",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "InformeActividades",
          icono: "picture_as_pdf",
          nombre: "Informe de Actividades",
          permiso: "WB208",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "VerInformes",
          icono: "picture_as_pdf",
          nombre: "Ver Informes",
          permiso: "WB208",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "GenerarTicket",
          icono: "picture_as_pdf",
          nombre: "Generar Ticket",
          permiso: "",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
        {
          accion: "ModificarTipoCompra",
          icono: "picture_as_pdf",
          nombre: "Modificar Tipo Compra",
          permiso: "DTE28",
          esAplicable: () => {
            return true;
          },
          ejecutar: () => {
          }
        },
      ]
    }
  }
}
