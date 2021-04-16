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
      v-for="item in usersState.list"
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
      default: 'Nombre de Persona que Genera Documento'
    },
    value: {
      type: String
    },
    danger: {
      type: Boolean
    },
    dangerText: {
      type: String
    },
    nested: {
      type: Boolean,
      default: true
    },
    parentValue: {
      type: String
    }
  },
  computed: {
    ...mapGetters('List', [
      'usersState'
    ]),
    disabled() {
      return !this.usersState.list.length || !this.parentValue || this.usersState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'getUsersGroup'
    ]),
    getOption() {
      return this.usersState.list.find((option) => option.value === this.value);
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
  }
};

</script>
