export default [{
  header: 'Factura Electrónica',
  icon: 'PackageIcon',
  permiso:'M01',
  items: [
    {
      url: '/factura-electronica/panel',
      name: 'Panel',
      icon: 'GridIcon',
      slug: 'panel',
      permiso: 'WB000'
    },
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
      url: '/factura-electronica/emision/basica',
      name: "Nuevo",
      slug: 'fe-emision-basica',
      icon: "FileIcon",
      permiso:'WB000'
    },
    {
      url: null,
      name: "Configuraciones",
      icon: "HomeIcon",
      permiso:'WB000',
      submenu: [
        {
          url: '/configuraciones/empresa',
          name: 'Empresa',
          slug: 'configuracion-empresa',
          icon: 'HomeIcon',
          permiso:'WB000',
        },
        {
          url: '/configuraciones/usuarios',
          name: 'Usuarios',
          slug: 'configuracion-usuarios',
          icon: 'HomeIcon',
          permiso:'WB000',
        },
      ]
    },/*
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
    },*/
  ]
}]
