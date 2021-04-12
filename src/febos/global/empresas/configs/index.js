export default {
  name: 'Parametros',
  searchable: true,
  children: [
    {
      name: 'Aprobaciones',
      isFolder: true,
      children: [
        {
          name: 'Correos',
          isFolder: true,
          children: [
            {
              name: 'Correo que llega cuando te llega la ejecución a la bandeja de entrada',
              isFolder: false,
              parametros: [
                {
                  name: 'Asunto',
                  type: 'text',
                  value: '',
                  parameter_id: 'aprobacion.bandeja.entrada.asunto'
                },
                {
                  name: 'Cuerpo',
                  type: 's3-html',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobacion'
                }
              ]
            },
            {
              name: 'Notificación cuando termina una ejecución',
              isFolder: false,
              parametros: [
                {
                  name: 'Asunto',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.finalizado.as'
                },
                {
                  name: 'Remitente Correo',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.finalizado.rmc'
                },
                {
                  name: 'Remitente Nombre',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.finalizado.rmn'
                },
                {
                  name: 'Cuerpo',
                  type: 's3-html',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.finalizado.bd'
                }
              ]
            },
            {
              name: 'Notificación cuando se anula una ejecución',
              isFolder: false,
              parameters: [
                {
                  name: 'Asunto',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.anulado.as'
                },
                {
                  name: 'Remitente Correo',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.anulado.rmc'
                },
                {
                  name: 'Remitente Nombre',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.anulado.rmn'
                },
                {
                  name: 'Cuerpo',
                  type: 's3-html',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.anulado.bd'
                }
              ]
            },
            {
              name: 'Notificación cuando se desestima una ejecución',
              isFolder: false,
              parameters: [
                {
                  name: 'Asunto',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.desestimado.as'
                },
                {
                  name: 'Remitente Correo',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.desestimado.rmc'
                },
                {
                  name: 'Remitente Nombre',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.desestimado.rmn'
                },
                {
                  name: 'Cuerpo',
                  type: 's3-html',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.desestimado.bd'
                }
              ]
            },
            {
              name: 'Notificación de aprobaciones pendientes',
              isFolder: false,
              parameters: [
                {
                  name: 'Asunto',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.pendientes.as'
                },
                {
                  name: 'Remitente Correo',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.pendientes.rmc'
                },
                {
                  name: 'Remitente Nombre',
                  type: 'text',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.pendientes.rmn'
                },
                {
                  name: 'Cuerpo',
                  type: 's3-html',
                  value: '',
                  parameter_id: 'plantilla.correo.aprobaciones.pendientes.bd'
                }
              ]
            }
          ]
        },
        {
          name: 'Estampar QR',
          isFolder: false,
          parameters: [
            {
              name: 'Se encuentra Activo',
              type: 'switch',
              value: '',
              config: {
                option_true: 'Y',
                option_false: 'N',
                label_true: 'Si',
                label_false: 'No'
              },
              parameter_id: 'poner.qr.aprobacion'
            }
          ]
        }
      ]
    }
  ]
};
