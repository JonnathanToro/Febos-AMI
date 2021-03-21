<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>

import MainPage from '@/layouts/MainPage';
import FullPage from '@/layouts/FullPage';

export default {
  components: {
    MainPage,
    FullPage
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'main-page';
    }
  },
  created() {
    const availablePortals = (process.env.VUE_APP_AVAILABLE_PORTALS || '').split(',');
    if (!availablePortals.includes(this.$route.params.portal)) {
      this.$router.push({ name: 'root' });
    }
  }
};

</script>
