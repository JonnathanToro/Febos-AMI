<template>
  <div class="con-select w-100 autocompletex">
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="documentsState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="documentsState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: documentsState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay documentos para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('List', [
      'documentsState'
    ]),
    optionSelected() {
      return this.documentsState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.documentsState.list.length
        || this.documentsState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchDocuments'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.documentsState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    if (this.nested) {
      // TODO: this.clearDocuments();
      this.$watch('parentValue', (newValue, oldValue) => {
        if (newValue !== oldValue) {
          if (oldValue !== '') {
            this.$emit('input', '');
          }
          this.fetchDocuments(newValue);
        }
      });

      if (this.parentValue) {
        this.fetchDocuments(this.parentValue);
      }
    } else {
      this.fetchDocuments(this.parentValue.value);
    }
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Documentos' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    nested: { type: Boolean, default: true },
    parentValue: { type: String, required: true },
    disabled: { type: Boolean, default: false }
  }
};

</script>
