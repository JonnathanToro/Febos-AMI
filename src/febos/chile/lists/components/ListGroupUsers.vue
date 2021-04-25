<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="groupUsersState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="groupUsersState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: groupUsersState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay usuarios para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('List', [
      'groupUsersState'
    ]),
    optionSelected() {
      return this.groupUsersState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.groupUsersState.list.length
        || !this.parentValue
        || this.groupUsersState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'getUsersGroup'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.groupUsersState.list.find((option) => option.value === this.value);
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
          if (newValue !== '') {
            this.getUsersGroup(newValue);
          }
        }
      });

      if (this.parentValue !== '') {
        this.getUsersGroup(this.parentValue);
      }
    } else if (this.parentValue !== '') {
      this.getUsersGroup(this.parentValue);
    }
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Nombre de Persona que Genera Documento' },
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
