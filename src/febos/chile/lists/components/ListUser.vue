<template>
  <div class="con-select w-100 autocompletex">
    <label :for="name" class="vs-select--label">{{ label }}</label>
    <v-select
      :name="name"
      :value="optionSelected"
      :options="paginatedValues"
      :class="{ 'v-select-danger': danger }"
      :disabled="isDisabled"
      :filterable="false"
      @search="onSearch"
      @input="onInput"
      @search:focus="onFocus"
    >
      <template #spinner>
        <div
          v-if="usersState.loading"
          style="border-left-color: rgba(88,151,251,0.71)"
          :style="{ opacity: usersState.loading ? 1 : 0 }"
          class="vs__spinner"
        />
      </template>
      <template slot="no-options">
        escribe para buscar usuarios..
      </template>
      <template #search="{ attributes, events }">
        <input
          :id="name"
          class="vs__search"
          v-bind="attributes"
          v-on="events"
        >
      </template>
      <li v-if="hasNextPage" slot="list-footer" class="pagination">
        <button
          class="btn btn-block btn-primary btn-sm"
          type="button"
          @click="searchPage"
          :disabled="!hasNextPage"
        >
          buscar mas usuarios...
        </button>
      </li>
    </v-select>
    <div
      v-if="danger"
      class="con-text-validation span-text-validation-danger v-enter-to"
      style="height: 19px;">
      <span class="span-text-validation">
        {{ dangerText }}
      </span>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  data() {
    return {
      query: '',
      limit: 10,
      page: 1,
      pages: 1
    };
  },
  computed: {
    ...mapGetters('List', ['usersState']),
    isDisabled() {
      return this.disabled;
    },
    optionSelected() {
      return this.usersState.value.find((option) => option.value === this.value);
    },
    hasNextPage() {
      return this.page < Math.max(this.pages, this.filteredPages);
    },
    filteredValues() {
      return this.usersState.value
        .filter(({ label }) => new RegExp(`.*${this.query}.*`, 'i').test(label));
    },
    paginatedValues() {
      return this.filteredValues.slice(0, this.limit * this.page);
    },
    filteredPages() {
      return this.filteredValues.length / this.limit;
    }
  },
  methods: {
    ...mapActions('List', ['fetchUsers']),
    onInput(event) {
      this.$emit('input', event?.value);
    },
    onFocus() {
      this.page = 1;
      this.query = '';
      this.debounceFetchUsers();
    },
    searchPage() {
      this.debounceFetchUsers({ page: this.page += 1, query: this.query });
    },
    onSearch(query) {
      if (!query) return;
      this.pages = 1;
      this.query = query;
      this.debounceFetchUsers({ query });
    },
    debounceFetchUsers: _.debounce(async function debounceFetchUsers(payload = {}) {
      const { pages } = await this.fetchUsers(payload);
      this.pages = pages;
    }, 350),
    getOption() {
      return this.usersState.value.find((option) => option.value === this.value);
    },
  },
  watch: {
    async parentValue(newValue, oldValue) {
      this.$emit('input', '');
      if (newValue !== oldValue) {
        if (oldValue !== '') {
          this.$emit('input', '');
        }
        await this.searchPage(1);
      }
    }
  },
  props: {
    autocomplete: { type: Boolean, default: false },
    name: { type: String, required: true },
    label: { type: String, default: 'Usuarios' },
    value: { type: String },
    nested: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    danger: { type: Boolean },
    dangerText: { type: String },
    disabled: { type: Boolean, default: false }
  }
};

</script>
