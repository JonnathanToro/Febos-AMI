<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="activityStatesState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="activityStatesState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: activityStatesState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay estados para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('List', [
      'activityStatesState'
    ]),
    optionSelected() {
      return this.activityStatesState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.activityStatesState.list.length
        || this.activityStatesState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchActivityStates'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.activityStatesState.list.find((option) => option.value === this.value);
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
          this.fetchActivityStates(newValue);
        }
      });

      if (this.parentValue) {
        this.fetchActivityStates(this.parentValue);
      }
    } else {
      this.fetchActivityStates(this.parentValue.value);
    }
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Estados' },
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
