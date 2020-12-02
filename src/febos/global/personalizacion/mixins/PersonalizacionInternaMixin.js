import clienteAPI from "@/febos/servicios/clienteAPI";
import { mapActions} from "vuex";

export default {
  computed:{
    _dominioActual: function(){
      if(window.location.hostname.toLocaleLowerCase() == 'localhost'){
        return `portal.febos.${process.env.VUE_APP_CODIGO_PAIS}`
      }else return window.location.hostname.toLocaleLowerCase();
    }
  },
  methods:{
    ...mapActions('Empresas',{_cargarPersonalizacionEnState:'cargarPersonalizacion'}),
    async _cargarPersonalizacion(){
      let pais=`${process.env.VUE_APP_CODIGO_PAIS}`;
      let ambiente=`${process.env.VUE_APP_AMBIENTE}`;
      let url=`https://s3.amazonaws.com/archivos.febos.io/${pais}/${ambiente}/portales/${this._dominioActual}.json`;
      var self=this;
      clienteAPI.get(url).then(function(response){
        self._cargarPersonalizacionEnState(response.data);
        self.$emit('updateNavbarColor', response.data.colores.navbar);
        self.$vs.theme({ primary: response.data.colores.primario });
        //self.$store.commit('UPDATE_PRIMARY_COLOR', response.data.colores.primario);
      });
    },
  },
  created(){
    this._cargarPersonalizacion();
  }
}
