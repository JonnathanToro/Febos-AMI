export default [{
  header: 'Aprobaciones',
  icon: 'PackageIcon',
  i18n: 'Apps',
  items: [
    {
      url: '/aprobaciones/entrada',
      name: 'Bandeja entrada',
      icon: 'InboxIcon',
      slug: 'panel',
      permiso: '*' // TODO: set permission
    },
    {
      url: '/aprobaciones/salida',
      name: 'Bandeja salida',
      icon: 'ArchiveIcon',
      slug: 'panel',
      permiso: '*' // TODO: set permission
    },
    {
      url: '/aprobaciones/expedientes/todos',
      name: 'Expedientes Apr.',
      icon: 'FolderIcon',
      slug: 'panel',
      permiso: '*' // TODO: set permission
    },
    {
      url: '/aprobaciones/expedientes/mios',
      name: 'Mis Expedientes Apr.',
      icon: 'FolderIcon',
      slug: 'panel',
      permiso: '*' // TODO: set permission
    }
  ]
}];
