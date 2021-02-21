export default [{
  header: 'Docs. Escritorio Digital',
  icon: 'PackageIcon',
  i18n: 'Documentos',
  items: [
    {
      url: null,
      name: 'Expedientes',
      slug: 'files',
      icon: 'FolderIcon',
      permiso: 'ED008',
      submenu: [
        {
          url: '/documentos/numOf',
          name: 'Cargar Doc. Trámite',
          slug: 'uploads',
          icon: 'files',
          permiso: '*', // TODO set permission
          i18n: 'uploads'
        },
        {
          url: '/documentos/numInt',
          name: 'Cargar Doc. Interno',
          slug: 'uploads',
          icon: 'files',
          permiso: '*', // TODO set permission
          i18n: 'uploads'
        },
        {
          url: '/expedientes/entrada',
          name: 'Bandeja Entrada',
          slug: '/expedientes/entrada',
          icon: 'files',
          permiso: '*', // TODO set permission
          i18n: 'entrada'
        },
        {
          url: '/expedientes/finalizados',
          name: 'Bandeja Finalizados',
          slug: '/expedientes/finalizados',
          icon: 'files',
          permiso: '*', // TODO set permission
          i18n: 'finalizados'
        }
      ]
    },
    {
      url: null,
      name: 'Oficina de partes',
      slug: 'files',
      icon: 'FolderIcon',
      permiso: 'ED008',
      submenu: [
        {
          url: '/documentos/externo',
          name: 'Cargar Doc. Externo',
          slug: 'uploads',
          icon: 'files',
          permiso: 'ED012',
          i18n: 'uploads'
        },
        {
          url: '/documentos/interno',
          name: 'Cargar Doc. Interno',
          slug: 'uploads',
          icon: 'files',
          permiso: '*', // TODO set permission
          i18n: 'uploads'
        },
        {
          url: '/expedientes/en-curso',
          name: 'Bandeja Pendientes',
          slug: '/expedientes/en-curso',
          icon: 'files',
          permiso: 'ED009',
          i18n: 'expedientes'
        },
        {
          url: '/expedientes/general',
          name: 'Bandeja General',
          slug: '/expedientes/general',
          icon: 'files',
          permiso: 'ED011',
          i18n: 'expedientes'
        },
        {
          url: '/expedientes/tramitados',
          name: 'Bandeja Tramitados',
          slug: '/expedientes/tramitados',
          icon: 'files',
          permiso: 'ED010',
          i18n: 'expedientes'
        }
      ]
    },
    {
      url: null,
      name: 'Mantenedores',
      slug: 'settings',
      icon: 'FileIcon',
      permiso: 'ED004',
      submenu: [
        {
          url: '/mantenedores/documentos',
          name: 'Documentos',
          slug: '/herramientas/mantenedor-documentos',
          icon: 'library_books',
          i18n: 'Documents',
          permiso: 'ED005'
        },
        {
          url: '/mantenedores/instituciones',
          name: 'Instituciones',
          slug: '/herramientas/mantenedor-instituciones',
          icon: 'library_books',
          permiso: 'ED006',
          i18n: 'Instituciones'
        },
        {
          url: '/mantenedores/destinos',
          name: 'Destinos',
          slug: '/herramientas/mantenedor-destinos',
          icon: 'library_books',
          permiso: 'ED007',
          i18n: 'Destinos'
        }
      ]
    }
    /*
    {
      url: null,
      name: 'Plantillas',
      slug: 'templates',
      icon: 'GridIcon',
      permiso: '*', // TODO: setup permission
      submenu: [
        {
          url: '/templates-formio-docs',
          name: 'Builder Plantillas Docts',
          slug: 'settings',
          icon: 'playlist_add',
          permiso: '*'
        },
        {
          url: '/templates-docs',
          name: 'Plantillas Docts',
          slug: 'settings',
          icon: 'playlist_add',
          permiso: '*'
        },
        {
          url: '/templates-formio',
          name: 'Builder Plantillas',
          slug: 'settings',
          icon: 'playlist_add',
          permiso: '*'
        },
        {
          url: '/templates',
          name: 'Plantillas',
          slug: 'settings',
          icon: 'playlist_add',
          permiso: '*'
        }
      ]
    }
    */
  ]
}];
