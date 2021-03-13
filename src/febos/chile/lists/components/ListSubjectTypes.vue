<template>
  <vs-select
    v-bind="$props"
    :value="value"
    @input="$emit('input', $event)"
  >
    <vs-select-item
      :key="item.id"
      :value="item.value"
      :text="item.label"
      v-for="item in subjects"
    />
  </vs-select>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      subjects: []
    };
  },
  props: {
    autocomplete: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Tipo Destino'
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
      'subjectTypesState'
    ])
  },
  methods: {
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
  }
};

</script>
