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
      v-for="item in documentsState.list"
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
      default: 'Documentos'
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
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('List', [
      'documentsState'
    ]),
    disabled() {
      return !this.documentsState.list.length || this.documentsState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchDocuments'
    ]),
    getOption() {
      return this.documentsState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    if (this.nested) {
      // TODO: this.clearDocuments();
      this.$watch('parentValue', (newValue, oldValue) => {
        this.$emit('input', '');
        if (newValue !== oldValue) {
          this.fetchDocuments(newValue);
        }
      });
    } else {
      this.fetchDocuments(this.parentValue.value);
    }
  }
};

</script>
