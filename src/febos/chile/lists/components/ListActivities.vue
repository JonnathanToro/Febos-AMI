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
      v-for="item in activitiesState.list"
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
      default: 'Actividad'
    },
    value: {
      type: String
    },
    danger: {
      type: Boolean
    },
    dangerText: {
      type: String
    }
  },
  computed: {
    ...mapGetters('List', [
      'activitiesState'
    ]),
    disabled() {
      return !this.activitiesState.list.length || this.activitiesState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchActivities'
    ]),
    getOption() {
      return this.activitiesState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    this.fetchActivities();
  }
};

</script>
