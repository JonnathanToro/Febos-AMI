export default [{
  header: 'Escritorio Digital',
  icon: 'PackageIcon',
  i18n: 'Apps',
  items: [
    {
      url: '/escritorio-digital/panel',
      name: 'Panel',
      icon: 'GridIcon',
      slug: 'panel',
      permiso: 'WB000'
    },
    {
      url: null,
      name: 'Bandeja de Entrada',
      slug: 'page2',
      icon: 'FileIcon',
      /* submenu: [
        {
          url: '/dashboard/analytics',
          name: 'Analytics',
          slug: 'dashboard-analytics',
          icon: 'HomeIcon',
          i18n: 'Analytics'
        },
      ] */
    },
  ]
}];
