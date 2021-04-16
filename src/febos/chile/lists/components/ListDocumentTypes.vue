<template>
  <div class="con-select w-100 autocompletex">
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="documentTypesState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="documentTypesState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: documentTypesState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay tipos de documentos para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('List', [
      'documentTypesState'
    ]),
    optionSelected() {
      return this.documentTypesState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.documentTypesState.list.length
        || this.documentTypesState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchDocumentTypes'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.documentTypesState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    this.fetchDocumentTypes();
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Tipo Documento' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    disabled: { type: Boolean, default: false }
  }
};

</script>
