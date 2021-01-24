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
      v-for="item in institutionTypesState.list"
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
      default: 'Tipo Institución'
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
      'institutionTypesState'
    ]),
    disabled() {
      return !this.institutionTypesState.list.length || this.institutionTypesState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchInstitutionTypes'
    ]),
    getOption() {
      return this.institutionTypesState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    this.fetchInstitutionTypes();
  }
};

</script>
