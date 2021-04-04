export default [{
  header: 'Aprobaciones',
  icon: 'PackageIcon',
  i18n: 'Apps',
  items: [
    {
      url: { name: 'approval-trays', params: { view: 'entrada' } },
      name: 'Bandeja entrada',
      icon: 'InboxIcon',
      permiso: '*' // TODO: set permission
    },
    {
      url: { name: 'approval-trays', params: { view: 'salida' } },
      name: 'Bandeja salida',
      icon: 'ArchiveIcon',
      permiso: '*' // TODO: set permission
    }
    /*
    {
      url: { name: 'approval-files', params: { view: 'todos' } },
      name: 'Expedientes Apr.',
      icon: 'FolderIcon',
      permiso: '*' // TODO: set permission
    },
    {
      url: { name: 'approval-files', params: { view: 'mios' } },
      name: 'Mis Expedientes Apr.',
      icon: 'FolderIcon',
      permiso: '*' // TODO: set permission
    }
    */
  ]
}];
