export default {
  myRepository: {
    nombre: 'Mi repositorio',
    type: 'folder',
    isOpen: true,
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
    children: [
      {
        febosId: '1doc',
        nombre: 'Documentos Técnicos',
        type: 'folder',
        fechaCreacion: '2021-03-05',
        responsable: 'Letty Villamizar',
        correoResponsable: 'letty@febos.cl',
        size: '100 MB',
        estado: '2',
        fechaPublicacion: '20201-03-06',
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
        children: [
          {
            febosId: '1pro',
            nombre: 'Proyectos',
            size: '2 MB',
            type: 'folder',
            fechaCreacion: '2021-03-06',
            estado: '2',
            responsable: 'Letty Villamizar',
            correoResponsable: 'letty@febos.cl',
            fechaPublicacion: '20201-03-06',
            url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182930966d11de80-7452-11eb-be96-4de17b26b998.pdf&nombre=6feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
            children: [
              {
                febosId: '1req',
                nombre: 'Requerimiento Proyecto uno',
                size: '2 MB',
                type: 'document',
                fechaCreacion: '2021-03-06',
                estado: '2',
                responsable: 'Letty Villamizar',
                correoResponsable: 'letty@febos.cl',
                fechaPublicacion: '20201-03-06',
                url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182930966d11de80-7452-11eb-be96-4de17b26b998.pdf&nombre=6feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
                ]
              },
              {
                febosId: '2req',
                nombre: 'Requerimiento Proyecto dos',
                size: '2 MB',
                type: 'document',
                fechaCreacion: '2021-03-06',
                estado: '2',
                responsable: 'Letty Villamizar',
                correoResponsable: 'letty@febos.cl',
                fechaPublicacion: '20201-03-06',
                url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182930966d11de80-7452-11eb-be96-4de17b26b998.pdf&nombre=6feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
                ]
              }
            ]
          },
          {
            febosId: '2doc',
            nombre: 'Documentos versionados',
            size: '4 MB',
            type: 'document',
            fechaCreacion: '2021-04-06',
            estado: '2',
            responsable: 'Letty Villamizar',
            correoResponsable: 'letty@febos.cl',
            fechaPublicacion: '20201-04-06',
            url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
            febosId: '3pap',
            nombre: 'Papeles oficiales',
            size: '5 MB',
            type: 'document',
            fechaCreacion: '2021-04-06',
            estado: '2',
            responsable: 'Letty Villamizar',
            correoResponsable: 'letty@febos.cl',
            fechaPublicacion: '20201-04-06',
            url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
          }
        ]
      },
      {
        febosId: '2int',
        nombre: 'Documentos internos',
        type: 'folder',
        fechaCreacion: '2021-03-05',
        responsable: 'Letty Villamizar',
        correoResponsable: 'letty@febos.cl',
        size: '100 MB',
        estado: '2',
        fechaPublicacion: '20201-03-06',
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
        children: [
          {
            febosId: '1lis',
            nombre: 'Listado usuarios Febos',
            size: '4 MB',
            type: 'document',
            fechaCreacion: '2021-03-06',
            estado: '2',
            responsable: 'Letty Villamizar',
            correoResponsable: 'letty@febos.cl',
            fechaPublicacion: '20201-03-06',
            url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182930966d11de80-7452-11eb-be96-4de17b26b998.pdf&nombre=6feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
            febosId: '2mi',
            nombre: 'Mi contrato',
            size: '2 MB',
            type: 'document',
            fechaCreacion: '2021-04-06',
            estado: '1',
            responsable: 'Letty Villamizar',
            correoResponsable: 'letty@febos.cl',
            fechaPublicacion: '20201-04-06',
            url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
            febosId: '3min',
            nombre: 'Minuta reunion SAVAL',
            size: '5 MB',
            type: 'document',
            fechaCreacion: '2021-04-06',
            estado: '2',
            responsable: 'Letty Villamizar',
            correoResponsable: 'letty@febos.cl',
            fechaPublicacion: '20201-04-06',
            url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
            febosId: '4min',
            nombre: 'Minuta reunion Cliente 1',
            size: '5 MB',
            type: 'document',
            fechaCreacion: '2021-04-06',
            estado: '1',
            responsable: 'Letty Villamizar',
            correoResponsable: 'letty@febos.cl',
            fechaPublicacion: '20201-04-06',
            url: 'https://api.febos.cl/desarrollo/herramientas/archivos/privados?path=febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/16139182846416807bd10-7452-11eb-be96-4de17b26b998.pdf&nombre=20-feb.pdf&dominioPortal=portal.escritoriodigital.cl',
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
          }
        ]
      },
    ],
    loading: false
  }
};
