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
      v-for="item in activityStatesState.list"
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
      default: 'Estados'
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
      'activityStatesState'
    ]),
    disabled() {
      return !this.activityStatesState.list.length || this.activityStatesState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchActivityStates'
    ]),
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
  }
};

</script>
