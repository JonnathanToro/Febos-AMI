<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColorLocal"
        :class="textColor"
      >

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          v-if="view !== 'compartido'"
          class="sm:inline-flex xl:hidden cursor-pointer p-2"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" />

        <vs-spacer />

        <!--<search-bar />-->

        <!--<notification-drop-down />-->

        <profile-drop-down />

      </vs-navbar>
    </div>
  </div>
</template>

<script>
import Bookmarks from './components/Bookmarks';
import ProfileDropDown from './components/ProfileDropDown';

export default {
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff',
    },
  },
  data() {
    return {
      view: this.$route.params.view
    };
  },
  components: {
    Bookmarks,
    ProfileDropDown,
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    textColor() {
      return {
        'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark')
          || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')
      };
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth === 'default') return 'navbar-default';
      if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced';
      if (this.verticalNavMenuWidth) return 'navbar-full';
      return '';
    },
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
    }
  }
};
</script>
