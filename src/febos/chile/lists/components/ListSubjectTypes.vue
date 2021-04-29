<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="subjectTypesState.list"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="subjectTypesState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: subjectTypesState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay destinos para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      subjects: []
    };
  },
  computed: {
    ...mapGetters('List', [
      'subjectTypesState'
    ]),
    optionSelected() {
      return this.subjectTypesState.list.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.subjectTypesState.list.length
        || this.subjectTypesState.loading;
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.subjectTypesState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    const { wizard } = this.$route.params;
    const internSubjects = ['usuarios', 'unidades', 'oficinas'];
    if (wizard.includes('externo')) {
      this.subjects = this.subjectTypesState.list
        .filter((subject) => internSubjects.includes(subject.value));
    } else {
      this.subjects = this.subjectTypesState.list;
    }
  },
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Tipo Destino' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: true }
  }
};

</script>
