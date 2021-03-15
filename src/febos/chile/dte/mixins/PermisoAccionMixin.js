export default {
  data() {
    return {
      usuarioPermisos: null
    };
  },
  created() {
    // console.log("permiso created");
  },
  methods: {
    _tienePermiso(permiso) {
      // TODO: Verificar si el usuario actual tiene el permiso indicado
    //  console.log("Validando si usuario tiene el permiso ",permiso);
      return permiso == permiso;
    }
  }
};
