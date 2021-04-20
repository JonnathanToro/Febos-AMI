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
      v-for="item in listOptions"
    />
  </vs-select>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import StepTypes from '@/febos/chile/dnt/mixins/StepTypes';

export default {
  data() {
    return {
      stepTypes: StepTypes
    };
  },
  props: {
    autocomplete: {
      type: Boolean,
      default: false
    },
    typeList: {
      type: Number
    },
    label: {
      type: String,
      default: 'Dirección / Región'
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
      'groupsState'
    ]),
    disabled() {
      return !this.groupsState.list.length || this.groupsState.loading;
    },
    listOptions() {
      if (this.typeList === this.stepTypes.GROUP) {
        return this.groupsState.list
          .filter((group) => group.isOffice === 'N');
      }
      if (this.typeList === this.stepTypes.OFFICE) {
        return this.groupsState.list
          .filter((group) => group.isOffice && group.isOffice === 'Y');
      }
      return this.groupsState.list;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchGroups'
    ]),
    getOption() {
      return this.groupsState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    this.fetchGroups();
  }
};

</script>
