// configuracion por defecto
// el JSON debe ser subido a s3://archivos.febos.io/cl/desarrollo/portales/portal.febos.cl.json
// donde portal.febos.cl se puede reemplazar por el dominio correspondiente

export default {
  moduloActual: '',
  inicio: [{
    url: { name: 'start' },
    name: 'Inicio',
    slug: 'start',
    icon: 'HomeIcon',
    permiso: '*'
  }],
  menus: [
    {
      url: { name: 'start' },
      name: 'Inicio',
      slug: 'start',
      icon: 'HomeIcon',
      permiso: '*'
    }
  ]
};
