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
            console.log("pdf es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de pdf");
          }
        },
        {
          accion: "Bitacora",
          icono: "picture_as_pdf",
          nombre: "Bitácora",
          permiso: "DTE03",
          esAplicable: () => {
            console.log("bitácora es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de bitácora");
          }
        },
        {
          accion: "EnviarAprobacion",
          icono: "picture_as_pdf",
          nombre: "Enviar a Aprobación",
          permiso: "WB166",
          esAplicable: () => {
            console.log("aprobacion es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de aprobacion");
          }
        },
        {
          accion: "NotificarCobranza",
          icono: "picture_as_pdf",
          nombre: "Notificar Cobranza",
          permiso: "DTE44",
          esAplicable: () => {
            console.log("bitácora es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de bitácora");
          }
        },
        {
          accion: "VerReferencias",
          icono: "picture_as_pdf",
          nombre: "Ver Referencias",
          permiso: "DTE26",
          esAplicable: () => {
            console.log("verReferencia es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de verReferencia");
          }
        },
        {
          accion: "AsociarDocumento",
          icono: "picture_as_pdf",
          nombre: "Asociar Documento",
          permiso: "DTE26",
          esAplicable: () => {
            console.log("asociarDocumento es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de asociarDocumento");
          }
        },
        {
          accion: "NuevaRendicion",
          icono: "picture_as_pdf",
          nombre: "Nueva Rendición",
          permiso: "RND01",
          esAplicable: () => {
            console.log("nuevaRendicion es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de nuevaRendicion");
          }
        },
        {
          accion: "DescargarXml",
          icono: "picture_as_pdf",
          nombre: "Descargar XML",
          permiso: "DTE15",
          esAplicable: () => {
            console.log("DescargarXML es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de DescargarXML");
          }
        },
        {
          accion: "DescargarAec",
          icono: "picture_as_pdf",
          nombre: "Descargar AEC",
          permiso: "DTE01",
          esAplicable: () => {
            console.log("descargarAec es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de descargarAec");
          }
        },
        {
          accion: "CertificadoCesion",
          icono: "picture_as_pdf",
          nombre: "Certificado de Cesión",
          permiso: "SII27",
          esAplicable: () => {
            console.log("certificadoCesion es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de certificadoCesion");
          }
        },
        {
          accion: "ProcesarNuevamente",
          icono: "picture_as_pdf",
          nombre: "Procesar Nuevamente",
          permiso: "DTE01",
          esAplicable: () => {
            console.log("procesarNuevamente es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de procesarNuevamente");
          }
        },
        {
          accion: "InformacionPago",
          icono: "picture_as_pdf",
          nombre: "Información de Pago",
          permiso: "DTE18",
          esAplicable: () => {
            console.log("informacionPago es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de informacionPago");
          }
        },
        {
          accion: "AnularGuia",
          icono: "picture_as_pdf",
          nombre: "Anular Guía",
          permiso: "DTE41",
          esAplicable: () => {
            console.log("anularGuia es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de anularGuia");
          }
        },
        {
          accion: "ConsultarEstadoSii",
          icono: "picture_as_pdf",
          nombre: "Consultar Estado SII",
          permiso: "SII08",
          esAplicable: () => {
            console.log("consultarEstadosii es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de consultarEstadosii");
          }
        },
        {
          accion: "VerAnotacionesSii",
          icono: "picture_as_pdf",
          nombre: "Ver Anotaciones SII",
          permiso: "",
          esAplicable: () => {
            console.log("veranotacionsii es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de veranotacionsii");
          }
        },
        {
          accion: "FechaRecepcionSii",
          icono: "picture_as_pdf",
          nombre: "Fecha Recepción SII",
          permiso: "",
          esAplicable: () => {
            console.log("fecharecep es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de fecharecep");
          }
        },
        {
          accion: "EnviarDte",
          icono: "picture_as_pdf",
          nombre: "Enviar DTE",
          permiso: "DTE21",
          esAplicable: () => {
            console.log("enviarDTE es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de enviarDTE");
          }
        },
        {
          accion: "ReenviarSii",
          icono: "picture_as_pdf",
          nombre: "Reenviar al SII",
          permiso: "DTE21",
          esAplicable: () => {
            console.log("reenviarSii es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de reenviarSii");
          }
        },
        {
          accion: "AsociarHes",
          icono: "picture_as_pdf",
          nombre: "Asociar HES",
          permiso: "DTE05",
          esAplicable: () => {
            console.log("asociarHes es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de asociarHes");
          }
        },
        {
          accion: "AsociarHem",
          icono: "picture_as_pdf",
          nombre: "Asociar HEM/MIGO",
          permiso: "DTE05",
          esAplicable: () => {
            console.log("asociarHem es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de asociarHem");
          }
        },
        {
          accion: "AsociarOc",
          icono: "picture_as_pdf",
          nombre: "Asociar OC",
          permiso: "DTE05",
          esAplicable: () => {
            console.log("asociarOc es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de asociarOc");
          }
        },
        {
          accion: "SolicitarDte",
          icono: "picture_as_pdf",
          nombre: "Solicitar DTE",
          permiso: "DTE22",
          esAplicable: () => {
            console.log("enviarDTE es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de enviarDTE");
          }
        },
        {
          accion: "ReprocesarDocumento",
          icono: "picture_as_pdf",
          nombre: "Reprocesar Documento",
          permiso: "DTE22",
          esAplicable: () => {
            console.log("enviarDTE es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de enviarDTE");
          }
        },
        {
          accion: "Ceder",
          icono: "picture_as_pdf",
          nombre: "Ceder",
          permiso: "CES01",
          esAplicable: () => {
            console.log("ceder es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de ceder");
          }
        },
        {
          accion: "RecuperarCorreoSii",
          icono: "picture_as_pdf",
          nombre: "Recuperar Correo SII",
          permiso: "DTE31",
          esAplicable: () => {
            console.log("recuperarCorreo es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de recuperarCorreo");
          }
        },
        {
          accion: "ModificarTipoVenta",
          icono: "picture_as_pdf",
          nombre: "Modificar Tipo Venta",
          permiso: "DTE28",
          esAplicable: () => {
            console.log("modificarVenta es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de modificarVenta");
          }
        },
        {
          accion: "EmitirDocumento",
          icono: "picture_as_pdf",
          nombre: "Enviar DTE",
          permiso: "DTE30",
          esAplicable: () => {
            console.log("emitirDoc es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de emitirDoc");
          }
        },
        {
          accion: "CopiarDocumento",
          icono: "picture_as_pdf",
          nombre: "Copiar Documento",
          permiso: "DTE09",
          esAplicable: () => {
            console.log("copiarDoc es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de copiarDoc");
          }
        },
        {
          accion: "EditarDocumento",
          icono: "picture_as_pdf",
          nombre: "Editar Documento",
          permiso: "DTE90",
          esAplicable: () => {
            console.log("enviarDTE es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de enviarDTE");
          }
        },
        {
          accion: "InformeActividades",
          icono: "picture_as_pdf",
          nombre: "Informe de Actividades",
          permiso: "WB208",
          esAplicable: () => {
            console.log("enviarDTE es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de enviarDTE");
          }
        },
        {
          accion: "VerInformes",
          icono: "picture_as_pdf",
          nombre: "Ver Informes",
          permiso: "WB208",
          esAplicable: () => {
            console.log("enviarDTE es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de enviarDTE");
          }
        },
        {
          accion: "GenerarTicket",
          icono: "picture_as_pdf",
          nombre: "Generar Ticket",
          permiso: "",
          esAplicable: () => {
            console.log("enviarDTE es aplicable");
            return true;
          },
          ejecutar: () => {
            console.log("ejecutar acción de enviarDTE");
          }
        }
      ]
    }
  }
}
