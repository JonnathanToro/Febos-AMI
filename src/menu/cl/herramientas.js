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
      submenu: [
        {
          url: '/mantenedores/documentos',
          name: 'Documentos',
          slug: '/herramientas/mantenedor-documentos',
          icon: 'library_books',
          i18n: 'Documents'
        },
      ]
    },
  ]
}];
