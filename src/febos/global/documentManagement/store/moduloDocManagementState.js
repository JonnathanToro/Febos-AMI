export default {
  myRepository: [
    {
      febosId: 'repo1',
      nombre: 'Mi repositorio',
      type: 'folder',
      isOpen: true,
      fechaCreacion: '2021-01-05',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      size: '220 MB',
      estado: '2',
      fechaPublicacion: '2021-01-06',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER4', 'PER5', 'PER7', 'PER8'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER7',
          nombre: 'Copiar'
        },
        {
          codigo: 'PER8',
          nombre: 'DesPublicar'
        }
      ],
    },
    {
      padreId: 'repo1',
      febosId: '1doc',
      nombre: 'Documentos Técnicos',
      type: 'folder',
      isOpen: true,
      fechaCreacion: '2021-01-05',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      size: '100 MB',
      estado: '2',
      fechaPublicacion: '2021-03-06',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER4', 'PER5'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        }
      ],
      suscriptores: [
        {
          id: '1',
          nombre: 'Ronald Benavides',
          fechaSuscripcion: '2021-04-03',
          rango: '2 meses',
          correo: 'ronald@febos.cl'
        },
        {
          id: '2',
          nombre: 'Veronica Veronica',
          fechaSuscripcion: '2021-03-03',
          rango: '15 días',
          correo: 'vero@febos.cl'
        },
        {
          id: '3',
          nombre: 'Michel Muñoz',
          fechaSuscripcion: '2021-05-03',
          rango: '1 mes',
          correo: 'michel@febos.cl'
        },
        {
          id: '4',
          nombre: 'Claudio Miranda',
          fechaSuscripcion: '2021-04-03',
          rango: '2 meses',
          correo: 'claudio@febos.cl'
        },
      ]
    },
    {
      padreId: '1doc',
      febosId: '1pro',
      nombre: 'Proyectos',
      size: '2 MB',
      type: 'folder',
      isOpen: false,
      fechaCreacion: '2021-01-06',
      estado: '2',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-03-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182930966d11de80-7452-11eb-be96-4de17b26b998.pdf&nombre=6feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER5', 'PER7', 'PER8'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER7',
          nombre: 'Copiar'
        },
        {
          codigo: 'PER8',
          nombre: 'DesPublicar'
        }
      ],
    },
    {
      padreId: '1pro',
      febosId: '1req',
      nombre: 'Requerimiento Proyecto uno es un nombre extremadamente largo',
      size: '2 MB',
      type: 'document',
      fechaCreacion: '2021-01-06',
      estado: '2',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-03-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182930966d11de80-7452-11eb-be96-4de17b26b998.pdf&nombre=6feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER5', 'PER6', 'PER7', 'PER8'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER6',
          nombre: 'Envío a flujo'
        },
        {
          codigo: 'PER7',
          nombre: 'Copiar'
        },
        {
          codigo: 'PER8',
          nombre: 'DesPublicar'
        }
      ],
      suscriptores: [
        {
          id: '1',
          nombre: 'Claudio Miranda',
          fechaSuscripcion: '2021-04-03',
          rango: '2 meses',
          correo: 'claudio@febos.cl'
        },
        {
          id: '2',
          nombre: 'Josefina Aguilar',
          fechaSuscripcion: '2021-03-03',
          rango: '15 días',
          correo: 'josefina@febos.cl'
        },
        {
          id: '3',
          nombre: 'Michel Muñoz',
          fechaSuscripcion: '2021-05-03',
          rango: '1 mes',
          correo: 'michel@febos.cl'
        },
        {
          id: '4',
          nombre: 'Braulio Santibañez',
          fechaSuscripcion: '2021-02-03',
          rango: '1 mes',
          correo: 'braulio@febos.cl'
        },
        {
          id: '5',
          nombre: 'Nicolas Anabalon',
          fechaSuscripcion: '2021-02-03',
          rango: '2 mes',
          correo: 'nicolas@febos.cl'
        }
      ]
    },
    {
      padreId: '1pro',
      febosId: '2req',
      nombre: 'Requerimiento Proyecto dos',
      size: '2 MB',
      type: 'document',
      fechaCreacion: '2021-03-06',
      estado: '2',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-03-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182930966d11de80-7452-11eb-be96-4de17b26b998.pdf&nombre=6feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER4', 'PER5', 'PER7', 'PER8'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER6',
          nombre: 'Envío a flujo'
        },
        {
          codigo: 'PER7',
          nombre: 'Copiar'
        },
        {
          codigo: 'PER8',
          nombre: 'DesPublicar'
        }
      ]
    },
    {
      padreId: '1doc',
      febosId: '2doc',
      nombre: 'Documentos versionados',
      size: '4 MB',
      type: 'document',
      fechaCreacion: '2021-04-06',
      estado: '2',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-04-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        }
      ],
      suscriptores: [
        {
          id: '1',
          nombre: 'Claudio Miranda',
          fechaSuscripcion: '2021-04-03',
          rango: '2 meses',
          correo: 'claudio@febos.cl'
        },
        {
          id: '2',
          nombre: 'Josefina Aguilar',
          fechaSuscripcion: '2021-03-03',
          rango: '15 días',
          correo: 'josefina@febos.cl'
        },
        {
          id: '3',
          nombre: 'Michel Muñoz',
          fechaSuscripcion: '2021-05-03',
          rango: '1 mes',
          correo: 'michel@febos.cl'
        }
      ]
    },
    {
      padreId: '1doc',
      febosId: '3pap',
      nombre: 'Papeles oficiales',
      size: '5 MB',
      type: 'document',
      fechaCreacion: '2021-04-06',
      estado: '2',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-04-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        }
      ],
    },
    {
      padreId: 'repo1',
      febosId: '2int',
      nombre: 'Documentos internos',
      type: 'folder',
      isOpen: false,
      fechaCreacion: '2021-03-05',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      size: '100 MB',
      estado: '2',
      fechaPublicacion: '2021-03-06',
      permisosCodigo: ['PER1', 'PER3', 'PER4', 'PER7', 'PER8'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER7',
          nombre: 'Copiar'
        },
        {
          codigo: 'PER8',
          nombre: 'DesPublicar'
        }
      ]
    },
    {
      padreId: '2int',
      febosId: '1lis',
      nombre: 'Listado usuarios Febos',
      size: '4 MB',
      type: 'document',
      fechaCreacion: '2021-03-06',
      estado: '2',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-03-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182930966d11de80-7452-11eb-be96-4de17b26b998.pdf&nombre=6feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER4', 'PER5', 'PER6', 'PER7', 'PER8'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER6',
          nombre: 'Envío a flujo'
        },
        {
          codigo: 'PER7',
          nombre: 'Copiar'
        },
        {
          codigo: 'PER8',
          nombre: 'DesPublicar'
        }
      ],
      suscriptores: [
        {
          id: '1',
          nombre: 'Claudio Miranda',
          fechaSuscripcion: '2021-04-03',
          rango: '2 meses',
          correo: 'claudio@febos.cl'
        },
        {
          id: '2',
          nombre: 'Josefina Aguilar',
          fechaSuscripcion: '2021-03-03',
          rango: '15 días',
          correo: 'josefina@febos.cl'
        },
        {
          id: '3',
          nombre: 'Michel Muñoz',
          fechaSuscripcion: '2021-05-03',
          rango: '1 mes',
          correo: 'michel@febos.cl'
        }
      ]
    },
    {
      padreId: '2int',
      febosId: '2mi',
      nombre: 'Mi contrato',
      size: '2 MB',
      type: 'document',
      fechaCreacion: '2021-04-06',
      estado: '1',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-04-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER4', 'PER5', 'PER7', 'PER8'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER6',
          nombre: 'Envío a flujo'
        },
        {
          codigo: 'PER7',
          nombre: 'Copiar'
        },
        {
          codigo: 'PER8',
          nombre: 'DesPublicar'
        }
      ],
    },
    {
      padreId: '2int',
      febosId: '3min',
      nombre: 'Minuta reunion SAVAL',
      size: '5 MB',
      type: 'document',
      fechaCreacion: '2021-04-06',
      estado: '2',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-04-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        }
      ],
      suscriptores: [
        {
          id: '1',
          nombre: 'Claudio Miranda',
          fechaSuscripcion: '2021-04-03',
          rango: '2 meses',
          correo: 'claudio@febos.cl'
        },
        {
          id: '2',
          nombre: 'Josefina Aguilar',
          fechaSuscripcion: '2021-03-03',
          rango: '15 días',
          correo: 'josefina@febos.cl'
        },
        {
          id: '3',
          nombre: 'Michel Muñoz',
          fechaSuscripcion: '2021-05-03',
          rango: '1 mes',
          correo: 'michel@febos.cl'
        },
        {
          id: '4',
          nombre: 'Braulio Santibañez',
          fechaSuscripcion: '2021-02-03',
          rango: '1 mes',
          correo: 'braulio@febos.cl'
        },
        {
          id: '5',
          nombre: 'Nicolas Anabalon',
          fechaSuscripcion: '2021-02-03',
          rango: '2 mes',
          correo: 'nicolas@febos.cl'
        }
      ]
    },
    {
      padreId: '2int',
      febosId: '4min',
      nombre: 'Minuta reunion Cliente 1',
      size: '5 MB',
      type: 'document',
      fechaCreacion: '2021-04-06',
      estado: '1',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-04-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER4', 'PER5', 'PER6'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER6',
          nombre: 'Envío a flujo'
        }
      ],
    },
    {
      padreId: 'repo1',
      febosId: '1Subs',
      nombre: 'Mis suscripciones',
      size: '40 MB',
      type: 'folder',
      isOpen: true,
      fechaCreacion: '2021-03-06',
      estado: '2',
      responsable: 'Letty Villamizar',
      correoResponsable: 'letty@febos.cl',
      fechaPublicacion: '2021-03-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER4', 'PER5'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        }
      ],
    },
    {
      padreId: '1Subs',
      febosId: '1ClaPro',
      nombre: 'Proyecto Claudio',
      size: '4 MB',
      type: 'folder',
      isOpen: false,
      fechaCreacion: '2021-03-06',
      estado: '2',
      responsable: 'Claudio Miranda',
      correoResponsable: 'claudio@febos.cl',
      fechaPublicacion: '2021-03-06',
      permisosCodigo: ['PER1', 'PER3', 'PER4', 'PER5', 'PER6'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER6',
          nombre: 'Envío a flujo'
        }
      ],
      suscriptores: [
        {
          id: '1',
          nombre: 'Letty Villamizar',
          fechaSuscripcion: '2021-02-03',
          rango: '2 meses',
          correo: 'letty@febos.cl'
        },
        {
          id: '2',
          nombre: 'Josefina Aguilar',
          fechaSuscripcion: '2021-03-03',
          rango: '15 días',
          correo: 'josefina@febos.cl'
        },
        {
          id: '3',
          nombre: 'Michel Muñoz',
          fechaSuscripcion: '2021-05-03',
          rango: '1 mes',
          correo: 'michel@febos.cl'
        },
        {
          id: '4',
          nombre: 'Braulio Santibañez',
          fechaSuscripcion: '2021-02-03',
          rango: '1 mes',
          correo: 'braulio@febos.cl'
        }
      ],
      comentarios: []
    },
    {
      padreId: '1ClaPro',
      febosId: '1pro1',
      nombre: 'Requerimientos principales',
      size: '4 MB',
      type: 'document',
      fechaCreacion: '2021-03-06',
      estado: '2',
      responsable: 'Claudio Miranda',
      correoResponsable: 'claudio@febos.cl',
      fechaPublicacion: '2021-03-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER3', 'PER4', 'PER5', 'PER6', 'PER10'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER6',
          nombre: 'Envío a flujo'
        },
        {
          codigo: 'PER10',
          nombre: 'Comentarios'
        }
      ],
      suscriptores: [
        {
          id: '1',
          nombre: 'Letty Villamizar',
          fechaSuscripcion: '2021-02-03',
          rango: '2 meses',
          correo: 'letty@febos.cl'
        },
        {
          id: '2',
          nombre: 'Josefina Aguilar',
          fechaSuscripcion: '2021-03-03',
          rango: '15 días',
          correo: 'josefina@febos.cl'
        },
        {
          id: '3',
          nombre: 'Michel Muñoz',
          fechaSuscripcion: '2021-05-03',
          rango: '1 mes',
          correo: 'michel@febos.cl'
        },
        {
          id: '4',
          nombre: 'Braulio Santibañez',
          fechaSuscripcion: '2021-02-03',
          rango: '1 mes',
          correo: 'braulio@febos.cl'
        }
      ],
      comentarios: []
    },
    {
      padreId: '1ClaPro',
      febosId: '1pro2',
      nombre: 'Funcionalidades y permisos',
      size: '4 MB',
      type: 'document',
      fechaCreacion: '2021-03-06',
      estado: '2',
      responsable: 'Claudio Miranda',
      correoResponsable: 'claudio@febos.cl',
      fechaPublicacion: '2021-03-06',
      url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
      permisosCodigo: ['PER1', 'PER2', 'PER3', 'PER4', 'PER5'],
      permisos: [
        {
          codigo: 'PER1',
          nombre: 'Revisión'
        },
        {
          codigo: 'PER2',
          nombre: 'Edición'
        },
        {
          codigo: 'PER3',
          nombre: 'Visor'
        },
        {
          codigo: 'PER4',
          nombre: 'Descargas'
        },
        {
          codigo: 'PER5',
          nombre: 'Suscripción'
        },
        {
          codigo: 'PER6',
          nombre: 'Envío a flujo'
        }
      ],
      suscriptores: [
        {
          id: '1',
          nombre: 'Letty Villamizar',
          fechaSuscripcion: '2021-02-03',
          rango: '2 meses',
          correo: 'letty@febos.cl'
        },
        {
          id: '2',
          nombre: 'Josefina Aguilar',
          fechaSuscripcion: '2021-03-03',
          rango: '15 días',
          correo: 'josefina@febos.cl'
        },
        {
          id: '3',
          nombre: 'Michel Muñoz',
          fechaSuscripcion: '2021-05-03',
          rango: '1 mes',
          correo: 'michel@febos.cl'
        },
        {
          id: '4',
          nombre: 'Braulio Santibañez',
          fechaSuscripcion: '2021-02-03',
          rango: '1 mes',
          correo: 'braulio@febos.cl'
        }
      ],
      comentarios: []
    }
  ],
  loading: false,
  element: {}
};
