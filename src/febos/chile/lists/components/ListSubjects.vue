<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="subjectsState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="subjectsState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: subjectsState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay destinos para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('List', [
      'subjectsState'
    ]),
    optionSelected() {
      return this.subjectsState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.subjectsState.list.length
        || this.subjectsState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchSubjects'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.subjectsState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    if (this.nested) {
      // TODO: this.clearDocuments();
      this.$watch('parentValue', (newValue, oldValue) => {
        this.$emit('input', '');
        if (newValue !== oldValue) {
          if (oldValue !== '') {
            this.$emit('input', '');
          }
          this.fetchSubjects(newValue);
        }
      });

      if (this.parentValue) {
        this.fetchSubjects(this.parentValue);
      }
    } else {
      this.fetchSubjects(this.parentValue);
    }
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Destinos' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    nested: { type: Boolean, default: true },
    parentValue: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: true }
  }
};

</script>
