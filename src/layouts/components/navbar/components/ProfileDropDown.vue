<template>
  <div class="the-navbar__user-meta flex items-center">
    <div class="text-right leading-tight hidden sm:block">
    </div>
    <div class="text-right leading-tight hidden sm:block">
      &nbsp;
    </div>
    <div class="text-right leading-tight hidden sm:block" v-if="view !== 'compartido'">
      <p class="font-semibold" style="margin-top:-5px">{{ currentUser.alias }}</p>
      <vx-tooltip text="Click para cambiar de empresa" position="left" style="display:inline-block">
        <small class="empresa" v-on:click="selectCompany()">
          <div style="margin-top:-2px" class="nombreEmpresa">{{ company.fantasia }}</div>
          <div style="margin-top:-2px">{{ formatear(company.iut) }}</div>
        </small>
      </vx-tooltip>
      <vx-tooltip
        v-if="isProviderPortal"
        text="Click para cambiar cliente" position="bottom"
        style="display:inline-block" class="ml-5"
      >
        <small class="empresa" v-on:click="selectCompany()">
          <div style="margin-top:-2px" class="nombreEmpresa">{{ fantasia }}</div>
          <div style="margin-top:-2px">{{ formatear(company.iut) }}</div>
        </small>
      </vx-tooltip>
    </div>
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          key="onlineImg"
          :src="avatar"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>
      <vs-dropdown-menu v-if="view !== 'compartido'" class="vx-navbar-dropdown">
        <ul style="min-width: 200px">
          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="$router.push('/usuario/perfil')">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4"></feather-icon>
            <span class="ml-2">Perfil</span>
          </li>
          <CheckPermission permission="ED033">
            <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="$router.push('/administracion/usuarios')">
              <feather-icon icon="UsersIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">Admin. Usuarios</span>
            </li>
          </CheckPermission>
          <!--
          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Tareas</span>
          </li>
          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Soporte</span>
          </li>
          -->

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
import { mapActions, mapGetters } from 'vuex';

import RutMixin from '../../../../febos/chile/_vue/mixins/RutMixin';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  mixins: [RutMixin],
  components: {
    CheckPermission
  },
  data() {
    return {
      view: this.$route.params.view,
      noAvatar: require('../../../../assets/images/no-avatar.svg')
    };
  },
  computed: {
    ...mapGetters('Usuario', ['currentUser']),
    ...mapGetters('Empresas', ['company']),
    isProviderPortal() {
      return process.env.VUE_APP_PORTAL === 'proveedores';
    },
    avatar() {
      if (this.currentUser.avatar
        && this.currentUser.avatar !== ''
        && this.currentUser.avatar !== null
      ) {
        return this.currentUser.avatar;
      }

      return this.noAvatar;
    }
  },
  methods: {
    ...mapActions('Usuario', ['signOut']),
    logout() {
      this.signOut();
      this.$router.push('/ingreso');
    },
    selectCompany() {
      this.$router.push({ name: 'selectorEmpresa' });
    }
  }
};
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
