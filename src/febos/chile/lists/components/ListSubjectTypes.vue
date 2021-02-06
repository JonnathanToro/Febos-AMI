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
      v-for="item in subjectTypesState.list"
    />
  </vs-select>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  props: {
    autocomplete: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Tipo Destino'
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
      'subjectTypesState'
    ]),
    disabled() {
      return !this.subjectTypesState.list.length || this.subjectTypesState.loading;
    }
  },
  methods: {
    getOption() {
      return this.subjectTypesState.list.find((option) => option.value === this.value);
    }
  }
};

</script>
