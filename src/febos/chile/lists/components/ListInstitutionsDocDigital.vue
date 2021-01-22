<template>
  <vs-select
    v-bind="$props"
    :value="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
  >
    <vs-select-item
      :key="item.opcionId"
      :value="item.valor"
      :text="item.descripcion"
      v-for="item in institutionsDocDigitalState.list"
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
      default: 'Lista Instituciones Doc Digital'
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
      'institutionsDocDigitalState'
    ]),
    disabled() {
      return !this.institutionsDocDigitalState.list.length
        || this.institutionsDocDigitalState.loading;
    }
  },
  methods: {
    ...mapActions('List', [
      'fetchInstitutionsDocDigital'
    ])
  },
  created() {
    console.log('this webo', this);
    if (this.nested) {
      // TODO: this.clearDocuments();
      this.$watch('parentValue', (newValue, oldValue) => {
        this.$emit('input', '');
        if (newValue !== oldValue) {
          this.fetchInstitutionsDocDigital(newValue);
        }
      });
    } else {
      this.fetchInstitutionsDocDigital(this.parentValue);
    }
  }
};

</script>
