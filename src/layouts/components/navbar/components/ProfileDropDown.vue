<template>
  <div class="the-navbar__user-meta flex items-center">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ alias }}</p>
      <small class="empresa" v-on:click="seleccionarEmpresa()">
        <span class="nombreEmpresa">{{ fantasia }}</span>:: {{ formatear(iutEmpresa) }}
      </small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img key="onlineImg" :src="avatar" alt="user-img" width="40"
             height="40" class="rounded-full shadow-md cursor-pointer block"/>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Profile</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Inbox</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Tasks</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Chat</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Wish List</span>
          </li>

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
      ...mapState("usuario", {
        iut: state => state.iut,
        alias: state => state.alias,
        avatar: state => state.avatar,
      }),
      ...mapState("empresas", {
        iutEmpresa: state => state.empresa.iut,
        fantasia: state => state.empresa.fantasia,
      })
    },
    methods: {
      ...mapActions("usuario", {salir: "salir"}),
      logout() {
        const $this=this;
        this.salir().then(function (salio) {
          console.log("salio",salio)
          $this.$router.push('/ingreso').catch(() => {
          })
        })
      },
      seleccionarEmpresa(){
        this.$router.push({name:"selectorEmpresa"})
      }
    }
  }
</script>
<style lang="scss">
  .empresa:hover{
    cursor:pointer;
  }
  .nombreEmpresa{
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    display: inline-flex;
    text-overflow: ellipsis;
  }
</style>
