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
      permiso: '*', // TODO: setup permission
      submenu: [
        {
          url: '/documentos/externo',
          name: 'Externos',
          slug: 'uploads',
          icon: 'files',
          permiso: '*', // TODO: setup permission
          i18n: 'uploads'
        }
      ]
    },
    {
      url: null,
      name: 'Expedientes',
      slug: 'files',
      icon: 'FolderIcon',
      permiso: '*', // TODO: setup permission
      submenu: [
        {
          url: '/expedientes/en-curso',
          name: 'En curso',
          slug: '/expedientes/en-curso',
          icon: 'files',
          permiso: '*', // TODO: setup permission
          i18n: 'expedientes'
        },
        {
          url: '/expedientes/finalizados',
          name: 'Finalizados',
          slug: '/expedientes/finalizados',
          icon: 'files',
          permiso: '*', // TODO: setup permission
          i18n: 'expedientes'
        },
        {
          url: '/oficinas/of-entrada',
          name: 'Entrada',
          slug: '/oficinas/of-entrada',
          icon: 'files',
          permiso: '*', // TODO: setup permission
          i18n: 'expedientes'
        },
      ]
    },
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
  ]
}];
