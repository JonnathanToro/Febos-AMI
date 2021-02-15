export default [{
  header: 'Documentos',
  icon: 'PackageIcon',
  i18n: 'Documentos',
  items: [
    {
      url: null,
      name: 'Cargar documento',
      slug: 'uploads',
      icon: 'FolderPlusIcon',
      permiso: 'ED013',
      submenu: [
        {
          url: '/documentos/externo',
          name: 'Externos',
          slug: 'uploads',
          icon: 'files',
          permiso: 'ED012',
          i18n: 'uploads'
        }
      ]
    },
    {
      url: null,
      name: 'Ofic. de Partes',
      slug: 'files',
      icon: 'FolderIcon',
      permiso: 'ED008',
      submenu: [
        {
          url: '/expedientes/en-curso',
          name: 'Pendientes',
          slug: '/expedientes/en-curso',
          icon: 'files',
          permiso: 'ED009',
          i18n: 'expedientes'
        },
        {
          url: '/expedientes/finalizados',
          name: 'Tramitados',
          slug: '/expedientes/finalizados',
          icon: 'files',
          permiso: 'ED010',
          i18n: 'expedientes'
        },
        {
          url: '/expedientes/general',
          name: 'General',
          slug: '/expedientes/general',
          icon: 'files',
          permiso: 'ED011',
          i18n: 'expedientes'
        },
      ]
    },
    /*
    {
      url: null,
      name: 'DocDigital',
      slug: 'doc-digital',
      icon: 'FileIcon',
      permiso: '*', // TODO: setup permission
      submenu: [
        {
          url: '/doc-digital/entrada',
          name: 'Entrada',
          slug: '/doc-digital/entrada',
          icon: 'files',
          permiso: '*', // TODO: setup permission
          i18n: 'doc-digital'
        }
      ]
    }
    */
  ]
}];
