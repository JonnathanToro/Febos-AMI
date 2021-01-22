<template>
  <vs-select
    v-bind="$props"
    :value="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
  >
    <vs-select-item
      :key="item.opcionId"
      :value="item.valor"
      :text="item.descripcion"
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
    ])
  },
  created() {
    this.fetchInstitutionTypes();
  }
};

</script>
