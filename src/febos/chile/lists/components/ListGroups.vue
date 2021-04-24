<template>
  <div
    class="con-select autocompletex"
    :class="{ 'w-100': block }"
  >
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="listOptions"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      @input="onInput"
    >
      <template #spinner>
        <div
          v-if="groupsState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: groupsState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        no hay instituciones para el criterio de búsqueda
      </template>
    </v-select>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import StepTypes from '@/febos/chile/dnt/mixins/StepTypes';

export default {
  computed: {
    ...mapGetters('List', [
      'groupsState'
    ]),
    optionSelected() {
      return this.listOptions.find((option) => option.value === this.value);
    },
    isDisabled() {
      return this.disabled
        || !this.listOptions.length
        || this.groupsState.loading;
    },
    listOptions() {
      const officeType = this.officeType === 'numOf' ? 'ext' : 'int';

      if (this.typeList === StepTypes.GROUP) {
        return this.groupsState.list
          .filter((group) => group.isOffice === 'N');
      }
      if (this.typeList === StepTypes.OFFICE) {
        return this.groupsState.list
          .filter((group) => (group.isOffice && group.isOffice === 'Y')
            && group.type === officeType);
      }
      return this.groupsState.list;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchGroups'
    ]),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    getOption() {
      return this.groupsState.list.find((option) => option.value === this.value);
    }
  },
  created() {
    this.fetchGroups();
  },
  props: {
    name: { type: String, required: true },
    typeList: { type: Number },
    officeType: { type: String },
    label: { type: String, default: 'Dirección / Región' },
    value: { type: String },
    danger: { type: Boolean },
    dangerText: { type: String },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: true }
  }
};

</script>
