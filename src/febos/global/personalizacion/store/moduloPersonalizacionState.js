//configuracion por defecto
// el JSON debe ser subido a s3://archivos.febos.io/cl/desarrollo/portales/portal.febos.cl.json
// donde portal.febos.cl se puede reemplazar por el dominio correspondiente

export default {
  "colores": {
    "primario": "#ff8000",
    "navbar": "#03a9f4"
  },
  "menu": {
    "logo": "https://archivos.febos.io/publico/portales/header_full.png",
    "miniLogo": "https://archivos.febos.io/publico/portales/header_mini.png"
  },
  "ingreso": {
    "imagenIngreso": "http://...",
    "colorFondoImagenIngreso": "#eff2f7",
    "imagenFondo": "http://...",
    "tituloIngreso": "Ingreso",
    "textoHtml": "Hola! porfavor ingresa tus credenciales de acceso. Si tu empresa utiliza <b>Single Sign On</b> con <b>Febos</b>, no debes ingresar tu correo, si no que tu usuario de organización de siempre!",
    "nombreCampoUsuario": "Correo o nombre de usuario",
    "nombreCampoClave": "Contraseña",
    "nombreBotonIngreso": "Ingresar",
    "nombreBotonRegistroProveedores": "Registrarme como proveedor",
    "botonClaveUnica": true,
    "botonRegistroProveedor": true
  },
  "general": {
    "favicon": "https://s3.amazonaws.com/archivos.febos.io/publico/portales/narvi/favicon-narvi.png",
    "titulo": "Cargando...",
    "footer":"Este es un servicio de <B>Febos AMI SpA</B>"
  }
}
