export default [{
  header: 'Docs. Escritorio Digital',
  icon: 'PackageIcon',
  i18n: 'Documentos',
  items: [
    {
      url: { name: 'files', params: { view: 'borradores' } },
      name: 'Bandeja Borradores',
      icon: 'PackageIcon',
      permiso: 'ED009',
      i18n: 'borradores'
    },
    {
      url: { name: 'files', params: { view: 'pendientes' } },
      name: 'Bandeja Pendientes',
      icon: 'InboxIcon',
      permiso: 'ED009',
      i18n: 'expedientes'
    },
    {
      url: { name: 'files', params: { view: 'general' } },
      name: 'Bandeja General',
      icon: 'HardDriveIcon',
      permiso: 'ED011',
      i18n: 'expedientes'
    },
    {
      url: { name: 'files', params: { view: 'tramitados' } },
      name: 'Bandeja Tramitados',
      icon: 'ArchiveIcon',
      permiso: 'ED010',
      i18n: 'expedientes'
    },
    {
      url: null,
      name: 'Expedientes',
      slug: 'files',
      icon: 'FolderIcon',
      permiso: 'ED008',
      submenu: [
        {
          url: { name: 'files-wizard', params: { wizard: 'numOf' } },
          name: 'Iniciar Trámite',
          icon: 'files',
          permiso: '*', // TODO set permission
          i18n: 'uploads'
        },
        {
          url: { name: 'files-wizard', params: { wizard: 'numInt' } },
          name: 'Iniciar Trámite Interno.',
          icon: 'files',
          permiso: '*', // TODO set permission
          i18n: 'uploads'
        }
      ]
    },
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
          url: { name: 'files-wizard', params: { wizard: 'interno' } },
          name: 'Cargar Doc. Interno',
          icon: 'files',
          permiso: '*', // TODO set permission
          i18n: 'uploads'
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
        },
        {
          url: '/mantenedores/actividades',
          name: 'Actividades',
          slug: '/herramientas/mantenedor-actividades',
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
