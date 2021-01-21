<!-- eslint-disable-next-line -->
<template>
  <div :class="containerClass" v-if="canIUse">
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      canIUse: false
    };
  },
  props: {
    permission: {
      type: String,
      required: true
    },
    containerClass: {
      type: String
    }
  },
  computed: {
    ...mapGetters('Usuario', ['hasPermission'])
  },
  mounted() {
    this.canIUse = this.hasPermission(this.permission);
  }
};
</script>
