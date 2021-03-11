<template>
  <div style="cursor: pointer;width: fit-content">
    <div v-on:click="getFile()" v-if="this.mood === 'normal'">
      {{name}}
    </div>
    <span
      v-on:click="getFile()" v-if="this.mood === 'compact'"
      style="cursor:pointer;width: fit-content;"
    >
      <vs-icon icon="description" size="small" :title="name"/>
    </span>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  components: {},
  mixins: [],
  props: {
    path: {
      type: String,
      required: true,
      default: () => ''
    },
    name: {
      type: [String],
      required: true,
      default: () => ''
    },
    mood: {
      type: String,
      required: false,
      default: 'normal'
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions('Dnts', [
      'downloadPrivateFile'
    ]),
    getFile() {
      this.downloadPrivateFile({ path: this.path, nombre: this.name });
    }
  }
};
</script>

<style lang="css" scoped>

  .margin-top {
    margin-top: 20px;
  }
  .margin-right {
    margin-right: 10px;
  }

  .wrap-option {
    background:  #f8f8f8;
    margin-bottom: 6px;
  }

  .input-option {
    color: inherit;
    margin-top: 4px;
    width: 100%;
    background: transparent;
  }

  .input-blocked {
    color: inherit;
    border: none !important;
    padding: 4px 4px 6px 4px;
    border-radius: 5px;
  }

  .input-edit {
    color: inherit;
    border: 1px solid #66258324;
    padding: 4px 4px 6px 4px;
    border-radius: 5px;
  }

  .selected {
    background: #cfe7f3;
  }

</style>
