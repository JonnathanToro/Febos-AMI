<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="6">
        <vx-card title="Mi empresa" :subtitle="empresa.fantasia" class="mr-2" v-if="empresa">
          <vs-row>
            <vs-col vs-w="3">Razón Social</vs-col>
            <vs-col vs-w="9" style="font-weight: bolder;">{{ empresa.razonSocial }}</vs-col>
            <vs-col vs-w="3">Nombre de fantasía</vs-col>
            <vs-col vs-w="9" style="font-weight: bolder;">{{ empresa.fantasia }}</vs-col>
            <vs-col vs-w="3">RUT</vs-col>
            <vs-col vs-w="9" style="font-weight: bolder;">{{ empresa.iut }}</vs-col>
            <vs-col vs-w="3" class="mt-3">Usuario</vs-col>
            <vs-col vs-w="9" class="mt-3">{{ usuario.alias }}</vs-col>
          </vs-row>
        </vx-card>
      </vs-col>
      <!--<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vx-card title="Novedades" subtitle="Que hay de nuevo en Febos?" class="ml-2">
          <vs-list>
            <vs-list-item icon="check" title="Snickerdoodle" subtitle="An excellent companion"></vs-list-item>
            <vs-list-item icon="check" title="Sapporo Haru" subtitle="An excellent polish restaurant, quick delivery and hearty, filling meals"></vs-list-item>
            <vs-list-item icon="verified_user" title="Enid's" subtitle="At night a bar, during the day a delicious brunch spot."></vs-list-item>
            <vs-list-item icon="verified_user" title="Veronika Ossi" subtitle="Has not watched anything recently"></vs-list-item>
          </vs-list>
        </vx-card>
      </vs-col>-->
    <!--</vs-row>
    <vs-row>-->
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vx-card title="Mis módulos" class="ml-2">
          <div class="container">
          <div class="centrador">
            <div class="modulo mr-5 mt-5 pt-5" v-for="modulo in modulos" :key="modulo.nombre" v-if="modulo.visible && modulo.habilitado" v-on:click="seleccionarModulo(modulo.nombre)">
              <div class="nombre-modulo">{{ modulo.descripcion }}</div>
              <vs-icon :icon="modulo.icono" size="75px" color="#ffffff" class="mt-2"></vs-icon>
              <vs-icon icon="star" size="20px" color="#ffffff" class="modulo-actual" v-if="modulo.nombre == moduloActual"></vs-icon>
            </div>
            <div class="modulo modulo-deshabilitado mr-5 mt-5 pt-5" v-for="modulo in modulos" :key="modulo.nombre" v-if="modulo.visible && !modulo.habilitado">
              <div class="nombre-modulo">{{ modulo.descripcion }}</div>
              <vs-icon :icon="modulo.icono" size="75px" color="#ffffff" class="mt-2"></vs-icon>
            </div>
          </div>
          </div>
        </vx-card>
      </vs-col>
    </vs-row>

  </div>
</template>
<script>
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    components: {
      //VueApexCharts,
    },
    data() {
      return {
        empresa: null, usuario: null,
        modulos:[
          {nombre:'facturaElectronica',descripcion:"Factura Electrónica",tooltip:"",icono:"description",habilitado:true,visible:true},
          /*
          {nombre:'aprobaciones',descripcion:"Aprobaciones",tooltip:"",icono:"done_all",habilitado:true,visible:true},
          {nombre:'escritorioDigital',descripcion:"Escritorio Digital",tooltip:"",icono:"all_inbox",habilitado:false,visible:true},
          {nombre:'compras',descripcion:"Gestión de Compras",tooltip:"",icono:"shopping_cart",habilitado:false,visible:true},
          {nombre:'contratos',descripcion:"Gestión de Contratos",tooltip:"",icono:"supervisor_account",habilitado:false,visible:true},
          {nombre:'gastos',descripcion:"Rendición de Gastos",tooltip:"",icono:"receipt",habilitado:false,visible:true},
          {nombre:'partners',descripcion:"Partners",tooltip:"",icono:"widgets",habilitado:false,visible:true},
          {nombre:'configuracion',descripcion:"Configuración",tooltip:"",icono:"settings",habilitado:false,visible:true},
          */
        ]
      }
    },
    computed: {
      ...mapGetters("Usuario", {usuarioActual: "usuarioActual"}),
      ...mapState("Menus", {moduloActual: "moduloActual"})
    },
    mounted() {
      var data = JSON.parse(
        localStorage.getItem(`${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}` )
      );
      this.empresa = data.Empresas.empresa;
      this.usuario = data.Usuario;
      console.log(data);
    },
    methods: {
      ...mapActions("Menus", {seleccionarModulo: "seleccionarModulo"})
    },
    created() {

    }
  }
</script>

<style lang="css" scoped>
  .modulo{
    width:165px;
    height:130px;
    border: 1px solid #ccc;
    display: inline-block;
    vertical-align: bottom;
    border-radius: 10px;
    box-shadow: 3px 3px 10px #ccc;
    color: white;
    font-size:90%;
    background-color: rgb(var(--vs-primary));

  }
  .modulo:hover{
    box-shadow: 3px 3px 10px #aaa;
    cursor:pointer;
    text-shadow: 3px 3px 10px #fff;
  }
  .container{
    text-align:center;
  }
  .centrador{
    margin: auto;
  }
  .nombre-modulo{
    font-weight: bold;
  }
  .modulo-deshabilitado{
    background-color: #ccc!important;
  }
  .modulo-deshabilitado:hover{
    background-color: #ccc!important;
    box-shadow: 3px 3px 10px #ccc;
    cursor: default;
    text-shadow: none!important;
  }
  .modulo-actual{
    position:relative;
    right: -20px;
    bottom: -5px;
  }
</style>
