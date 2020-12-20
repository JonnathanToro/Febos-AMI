<template>
  <div class="wrapper-items">
    <vs-td :data="item.valor">
      {{item.valor}}
    </vs-td>

    <vs-td :data="item.descripcion">
      {{item.descripcion}}
    </vs-td>

    <vs-td :data="item.extra.descripcion">
      {{item.extra.descripcion}}
    </vs-td>

    <vs-td :data="item.extra.fechaCreacion">
      {{item.extra.fechaCreacion}}
    </vs-td>

    <vs-td>
      <vs-switch
        color="primary"
        v-model="selected"
        v-on:click="toggleEnableTemplate({ item, selected })"
      />
    </vs-td>
    <vs-td>
      <vs-dropdown vs-custom-content vs-trigger-click >
        <a class="a-icon" href.prevent>
          <vs-icon
            class=""
            icon="bubble_chart"
            size="medium"
            bg="#E4E4E4"
            round
            color="gray"
          />
        </a>

        <vs-dropdown-menu>
          <div>
            <vs-icon
              class=""
              icon="edit"
              color="gray"
            />
            Editar
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-td>
  </div>
</template>
<script>

import { mapActions } from 'vuex';

export default {
  components: {},
  mixins: [],
  data() {
    return {
      selected: this.item.deshabilitado !== 1
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions('Templates', [
      'toggleEnableTemplate'
    ])
  },
  mounted() {
    console.log('item template', this.item);
  }
};
</script>

<style lang="css" scoped>
.wrapper-items {
  display: contents;
}
</style>
