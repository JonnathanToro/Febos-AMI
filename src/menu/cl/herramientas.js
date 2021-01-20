export default [{
  header: 'Herramientas',
  icon: 'PackageIcon',
  i18n: 'Apps',
  items: [
    {
      url: null,
      name: 'Mantenedores',
      slug: 'settings',
      icon: 'FileIcon',
      permiso: '*',
      submenu: [
        {
          url: '/mantenedores/documentos',
          name: 'Documentos',
          slug: '/herramientas/mantenedor-documentos',
          icon: 'library_books',
          i18n: 'Documents',
          permiso: '*' // TODO: setup permission
        },
        {
          url: '/mantenedores/instituciones',
          name: 'Instituciones',
          slug: '/herramientas/mantenedor-instituciones',
          icon: 'library_books',
          permiso: 'WB000',
          i18n: 'Instituciones'
        },
        {
          url: '/mantenedores/destinos',
          name: 'Destinos',
          slug: '/herramientas/mantenedor-destinos',
          icon: 'library_books',
          permiso: 'WB000',
          i18n: 'Destinos'
        }
      ]
    },
  ]
}];
