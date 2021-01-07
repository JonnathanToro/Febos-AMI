export default [{
  header: 'Plantillas',
  icon: 'PackageIcon',
  i18n: 'Apps',
  items: [
    {
      url: null,
      name: 'Templates',
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
  ]
}];
