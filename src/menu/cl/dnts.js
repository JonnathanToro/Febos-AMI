export default [{
  header: 'Documentos',
  icon: 'PackageIcon',
  i18n: 'Documentos',
  items: [
    {
      url: null,
      name: 'Expedientes',
      slug: 'files',
      icon: 'FileIcon',
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
        }
      ]
    },
  ]
}];