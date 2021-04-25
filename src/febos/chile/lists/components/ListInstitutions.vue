<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="institutionsState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="institutionsState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: institutionsState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay instituciones para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('List', [
      'institutionsState'
    ]),
    optionSelected() {
      return this.institutionsState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.institutionsState.list.length
        || !this.parentValue
        || this.institutionsState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchInstitutions'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.institutionsState.list.find((option) => option.value === this.value);
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
          this.fetchInstitutions(newValue);
        }
      });

      if (this.parentValue) {
        this.fetchInstitutions(this.parentValue);
      }
    } else {
      this.fetchInstitutions(this.parentValue);
    }
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Instituciones' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    nested: { type: Boolean, default: true },
    parentValue: { type: String },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: true }
  }
};

</script>
