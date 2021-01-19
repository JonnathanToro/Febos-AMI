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
      v-for="item in documentTypesState.list"
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
      default: 'Tipo Documento'
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
      'documentTypesState'
    ]),
    disabled() {
      return !this.documentTypesState.list.length || this.documentTypesState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchDocumentTypes'
    ])
  },
  created() {
    this.fetchDocumentTypes();
  }
};

</script>
