import moduloUsuario from "../global/usuario/store/moduloUsuario";

const autenticacion={
  tienePermiso:function(ruta){
    if(ruta.meta.permiso){
      console.log("usuarioStore",moduloUsuario.state.correo);
      console.log("esta vista requiere el permiso",ruta.meta.permiso);
      return true;
    }else{
      // si la vista no requiere permiso, se deja el paso libre
      return true;
    }
  },
  estaLogueado:function(){
    return true;
  }
}

export default autenticacion
