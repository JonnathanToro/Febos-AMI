import entorno from './entorno'
export default{
  tienePermiso(permiso){
    let pais=entorno.obtenerTld();
    let ambiente=entorno.obtenerAmbiente();
    // por mientras, para pruebas se definen permisos locales de ejemplo, pero se tienen que setear en el login
    localStorage.setItem(`${pais}-${ambiente}-permisos`,"FEB99,WB000,WB001,WB002")

    let permisos=localStorage.getItem(`${pais}-${ambiente}-permisos`).split(",");
    if(Array.isArray(permiso)){
      var tienePermiso=false;
      permiso.forEach(function(p){
        if(permisos.includes(p)){
          tienePermiso=true;
        }
      });
      return tienePermiso;
    }else return permisos.includes(permiso);
  }
}
