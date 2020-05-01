import facturaElectronica from "./cl/facturaElectronica";
//import aprobaciones from "./cl/aprobaciones";
//import compras from "./cl/compras";
//import rendiciones from "./cl/rendiciones";
//import proyectos from "./cl/proyectos";
//import configuracion from "./cl/configuracion";

export default [
  {
    url: "/",
    name: "Inicio",
    slug: "inicio",
    icon: "HomeIcon",
  },
  //...aprobaciones,
  ...facturaElectronica,
  //...compras,
  //...rendiciones,
  //...proyectos,
  //...configuracion
]
