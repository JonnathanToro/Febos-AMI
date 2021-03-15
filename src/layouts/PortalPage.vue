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
  }
};

</script>
