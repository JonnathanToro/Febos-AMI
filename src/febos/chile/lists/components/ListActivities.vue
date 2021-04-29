<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="activitiesState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="activitiesState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: activitiesState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay actividades para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('List', [
      'activitiesState'
    ]),
    optionSelected() {
      return this.activitiesState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.activitiesState.list.length
        || this.activitiesState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchActivities'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.activitiesState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    this.fetchActivities();
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Actividad' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: true }
  },
};

</script>
