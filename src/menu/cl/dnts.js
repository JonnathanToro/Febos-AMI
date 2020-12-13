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
      submenu: [
        {
          url: '/expedientes/en-curso',
          name: 'En curso',
          slug: '/expedientes/en-curso',
          icon: 'files',
          i18n: 'expedientes'
        },
        {
          url: '/expedientes/finalizados',
          name: 'Finalizados',
          slug: '/expedientes/finalizados',
          icon: 'files',
          i18n: 'expedientes'
        }
      ]
    },
  ]
}];
