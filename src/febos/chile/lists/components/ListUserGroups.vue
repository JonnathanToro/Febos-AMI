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
      v-for="item in userGroupsState.list"
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
      default: 'Grupos a los que perteneces'
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
    ...mapGetters('Usuario', [
      'currentUserId'
    ]),
    ...mapGetters('List', [
      'userGroupsState'
    ]),
    disabled() {
      return !this.userGroupsState.list.length || this.userGroupsState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchUserGroups'
    ]),
    getOption() {
      return this.userGroupsState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    console.log('joder???');
    this.fetchUserGroups();
  }
};

</script>
