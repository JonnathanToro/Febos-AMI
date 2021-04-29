<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="institutionsDocDigitalState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="institutionsDocDigitalState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: institutionsDocDigitalState.loading ? 1 : 0 }"
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
      'institutionsDocDigitalState'
    ]),
    optionSelected() {
      return this.institutionsDocDigitalState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.institutionsDocDigitalState.list.length
        || this.institutionsDocDigitalState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchInstitutionsDocDigital'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.institutionsDocDigitalState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    console.log('this webo', this);
    if (this.nested) {
      // TODO: this.clearDocuments();
      this.$watch('parentValue', (newValue, oldValue) => {
        this.$emit('input', '');
        if (newValue !== oldValue) {
          this.fetchInstitutionsDocDigital(newValue);
        }
      });
    } else {
      this.fetchInstitutionsDocDigital(this.parentValue);
    }
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Lista Instituciones Doc Digital' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    nested: { type: Boolean, default: true },
    parentValue: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: true }
  },
};

</script>
