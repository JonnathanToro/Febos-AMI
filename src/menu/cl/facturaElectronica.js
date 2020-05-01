export default [{
  header: 'Factura Electrónica',
  icon: 'PackageIcon',
  permiso:'M01',
  items: [
    {
      url: null,
      name: "Emitidos",
      icon: "ExternalLinkIcon",
      slug: "emitidos",
      permiso:'WB000',
      submenu: [
        {
          url: '/factura-electronica/emitidos/todos',
          name: 'Todos',
          slug: 'emitidos-todos',
          permiso: 'WB000',
          descripcion:'Visualización de todos los documentos emitidos'
        },
      ]
    },
    {
      url: null,
      name: "Recibidos",
      icon: "InboxIcon",
      permiso:'WB000',
      submenu: [
        {
          url: '/factura-electronica/recibidos/todos',
          name: 'Todos',
          slug: 'fe-emision-afecta',
          permiso:'WB000',
          descripcion:'Visualización de todos los documentos recibidos'
        },
      ]
    },
    {
      url: null,
      name: "Nuevo",
      icon: "FileIcon",
      permiso:'WB000',
      submenu: [
        {
          url: '/factura-electronica/emision/33',
          name: 'Factura Afecta',
          slug: 'fe-emision-afecta',
          icon: 'HomeIcon',
          permiso:'WB000',
        },
        {
          url: '/factura-electronica/emision/34',
          name: 'Factura Exenta',
          slug: 'fe-emision-exenta',
          icon: 'HomeIcon',
          permiso:'WB000',
        },
      ]
    },
    {
      url: null,
      name: "Configuraciones",
      icon: "BellIcon",
      permiso:'WB000',
      submenu: [
        {
          url: '/factura-electronica/emision/33',
          name: 'Factura Afecta',
          slug: 'fe-emision-afecta',
          icon: 'HomeIcon',
          permiso:'WB000',
        },
      ]
    },
    {
      url: null,
      name: "Eventos",
      icon: "BellIcon",
      permiso:'WB000',
      submenu: [
        {
          url: '/factura-electronica/emision/33',
          name: 'Factura Afecta',
          slug: 'fe-emision-afecta',
          icon: 'HomeIcon',
          permiso:'WB000',
        },
      ]
    },
  ]
}]
