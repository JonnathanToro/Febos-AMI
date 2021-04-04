<template>
  <vs-row v-if="show">
    <vs-col vs-w="12" class="mt-4">
      <fb-paginacion
        :total="pagination.pages"
        :max="10"
        v-model="page"
      />
    </vs-col>
  </vs-row>
</template>
<script>

import { mapGetters } from 'vuex';

import FbPaginacion from '@/febos/chile/_vue/componentes/FbPaginacion';

export default {
  props: ['show', 'value'],
  components: { FbPaginacion },
  computed: {
    ...mapGetters('Dnts', [
      'pagination'
    ]),
  },
  watch: {
    value(newValue) {
      this.page = newValue;
    },
    page(newValue) {
      this.$emit('input', newValue);
    }
  },
  data() {
    return {
      page: this.value
    };
  }
};

</script>
