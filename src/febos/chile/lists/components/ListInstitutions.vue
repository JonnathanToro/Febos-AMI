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
      v-for="item in institutionsState.list"
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
      default: 'Instituciones'
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
      'institutionsState'
    ]),
    disabled() {
      return !this.institutionsState.list.length
        || !this.parentValue || this.institutionsState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchInstitutions'
    ]),
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
  }
};

</script>
