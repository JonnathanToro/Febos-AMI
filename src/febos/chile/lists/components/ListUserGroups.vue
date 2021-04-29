<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="userGroupsState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="userGroupsState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: userGroupsState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay grupos para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('Usuario', [
      'currentUserId'
    ]),
    ...mapGetters('List', [
      'userGroupsState'
    ]),
    optionSelected() {
      return this.userGroupsState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.userGroupsState.list.length
        || this.userGroupsState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchUserGroups'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.userGroupsState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    this.fetchUserGroups();
  },
  props: {
    name: { type: String, required: true },
    autocomplete: { type: Boolean, default: false },
    label: { type: String, default: 'Grupos a los que perteneces' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: true }
  }
};

</script>
