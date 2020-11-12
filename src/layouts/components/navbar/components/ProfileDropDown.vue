<template>
  <div class="the-navbar__user-meta flex items-center">
    <div class="text-right leading-tight hidden sm:block">
    </div>
    <div class="text-right leading-tight hidden sm:block">
      &nbsp;
    </div>
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold" style="margin-top:-5px">{{ alias }}</p>
      <vx-tooltip text="Click para cambiar de empresa" position="left" style="display:inline-block">
        <small class="empresa" v-on:click="seleccionarEmpresa()">
          <div style="margin-top:-2px" class="nombreEmpresa">{{ fantasia }}</div>
          <div style="margin-top:-2px">{{ formatear(iutEmpresa) }}</div>
        </small>
      </vx-tooltip>
      <vx-tooltip v-if="esPortalProveedores" text="Click para cambiar cliente" position="bottom"
                  style="display:inline-block" class="ml-5">
        <small class="empresa" v-on:click="seleccionarEmpresa()">
          <div style="margin-top:-2px" class="nombreEmpresa">{{ fantasia }}</div>
          <div style="margin-top:-2px">{{ formatear(iutEmpresa) }}</div>
        </small>
      </vx-tooltip>
    </div>
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img key="onlineImg" :src="avatar" alt="user-img" width="40"
             height="40" class="rounded-full shadow-md cursor-pointer block"/>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="$router.push('/usuario/perfil')">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4"></feather-icon>
            <span class="ml-2">Perfil</span>
          </li>
<!--          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Tareas</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Soporte</span>
          </li>-->

          <vs-divider class="m-1"/>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Salir</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import RutMixin from "../../../../febos/chile/_vue/mixins/RutMixin";

  export default {
    mixins: [RutMixin],
    data() {
      return {}
    },
    computed: {
      ...mapState("Usuario", {
        iut: state => state.iut,
        alias: state => state.alias,
        correo: state => state.correo,
        avatarOriginal: state => state.avatar,
      }),
      ...mapState("Empresas", {
        iutEmpresa: state => state.empresa.iut,
        fantasia: state => state.empresa.fantasia,
        empresaSeleccionada: state => state.empresa
      }),
      esPortalProveedores(){
        let portal=process.env.VUE_APP_PORTAL;
        return portal=='proveedores';
      },
      avatar(){
        if(this.avatarOriginal && this.avatarOriginal!='' && this.avatarOriginal!=null)return this.avatarOriginal;
        // else return 'https://api.adorable.io/avatars/285/'+this.correo;
        else return 'https://www.flaticon.es/svg/static/icons/svg/149/149071.svg';
      }
    },
    methods: {
      ...mapActions("Usuario", {salir: "salir"}),
      logout() {
        const $this = this;
        this.salir().then(function () {
          $this.$router.push('/ingreso').catch(() => {
          })
        })
      },
      seleccionarEmpresa() {
        this.$router.push({name: "selectorEmpresa"})
      }
    }
  }
</script>
<style lang="scss">
  .empresa:hover {
    cursor: pointer;
  }

  .nombreEmpresa {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    display: inline-flex;
    text-overflow: ellipsis;
  }
</style>
