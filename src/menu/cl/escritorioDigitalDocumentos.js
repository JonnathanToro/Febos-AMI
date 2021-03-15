export default [{
  header: 'Docs. Escritorio Digital',
  icon: 'PackageIcon',
  i18n: 'Documentos',
  items: [
    {
      url: null,
      name: 'Oficina de partes',
      slug: 'files',
      icon: 'FolderIcon',
      permiso: 'ED008',
      submenu: [
        {
          url: { name: 'files-wizard', params: { wizard: 'externo' } },
          name: 'Cargar Doc. Externo',
          icon: 'files',
          permiso: 'ED012',
          i18n: 'uploads'
        },
        {
          url: { name: 'files', params: { view: 'en-curso' } },
          name: 'Bandeja Pendientes',
          icon: 'files',
          permiso: 'ED009',
          i18n: 'expedientes'
        },
        {
          url: { name: 'files', params: { view: 'general' } },
          name: 'Bandeja General',
          icon: 'files',
          permiso: 'ED011',
          i18n: 'expedientes'
        },
        {
          url: { name: 'files', params: { view: 'finalizados' } },
          name: 'Bandeja Tramitados',
          icon: 'files',
          permiso: 'ED010',
          i18n: 'expedientes'
        }
      ]
    },
    {
      url: null,
      name: 'Mantenedores',
      slug: 'settings',
      icon: 'FileIcon',
      permiso: 'ED004',
      submenu: [
        {
          url: { name: 'maintainer-files' },
          name: 'Documentos',
          icon: 'library_books',
          i18n: 'Documents',
          permiso: 'ED005'
        },
        {
          url: { name: 'maintainer-institutions' },
          name: 'Instituciones',
          icon: 'library_books',
          permiso: 'ED006',
          i18n: 'Instituciones'
        },
        {
          url: { name: 'maintainer-subjects' },
          name: 'Destinos',
          icon: 'library_books',
          permiso: 'ED007',
          i18n: 'Destinos'
        }
      ]
    }
    /*
    {
      url: null,
      name: 'Plantillas',
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
    */
  ]
}];
