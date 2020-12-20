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
          url: '/templates-formio',
          name: 'Template Maker',
          slug: 'settings',
          icon: 'playlist_add',
          permiso: '*'
        },
        {
          url: '/templates',
          name: 'Templates',
          slug: 'settings',
          icon: 'playlist_add',
          permiso: '*'
        }
      ]
    }
  ]
}];
