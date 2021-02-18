<template>
  <vs-select
    v-bind="$props"
    :value="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
  >
    <vs-select-item
      :key="item.id"
      :value="item.value"
      :text="item.label"
      v-for="item in groupsState.list"
    />
  </vs-select>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    autocomplete: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Dirección / Región'
    },
    value: {
      type: String
    },
    danger: {
      type: Boolean
    },
    dangerText: {
      type: String
    }
  },
  computed: {
    ...mapGetters('List', [
      'groupsState'
    ]),
    disabled() {
      return !this.groupsState.list.length || this.groupsState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchGroups'
    ]),
    getOption() {
      console.log('ACA', this.groupsState.list.find((option) => option.value === this.value));
      return this.groupsState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    this.fetchGroups();
  }
};

</script>
