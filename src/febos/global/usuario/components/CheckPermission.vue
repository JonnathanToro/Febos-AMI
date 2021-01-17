<!-- eslint-disable-next-line -->
<template>
  <div v-if="canIUse">
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
