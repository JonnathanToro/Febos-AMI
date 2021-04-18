<template>
  <vs-row vs-w="12" class="wrap-option" v-bind:class="{ 'selected': selectedCategory }">
    <vs-col vs-lg="8" vs-sm="4" vs-xs="12">
      <div>
        <input
          maxlength="10"
          class="input-option" v-bind:class="{
            'input-blocked': !editMood,
            'input-edit': editMood
          }"
          size="small" v-model="option.valor"
        />
      </div>
      <div>
        <input
          maxlength="100"
          class="input-option" v-bind:class="{
            'input-blocked': !editMood,
            'input-edit': editMood
          }"
          size="small"
          v-model="option.descripcion"
        />
      </div>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-lg="4" vs-sm="4" vs-xs="12">
      <vs-button
        v-if="type === 'category'"
        v-tooltip="'Ver estados'"
        color="primary"
        class="margin-right"
        size="small"
        type="border"
        v-on:click="listActivities(option)"
        icon="search"
      />
      <CheckPermission permission="ED029" v-if="!editMood">
        <vs-button
          v-tooltip="'Editar Opción'"
          color="primary"
          class="margin-right"
          size="small"
          type="border"
          v-on:click="editOption(option)"
          icon="edit"
        />
      </CheckPermission>
      <vs-button
        v-if="editMood"
        v-tooltip="'Guardar edición'"
        color="success"
        class="margin-right"
        size="small"
        type="border"
        v-on:click="saveOption(option)"
        icon="save"
      />
      <vs-button
        v-if="editMood"
        v-tooltip="'Cancelar edición'"
        color="danger"
        class="margin-right"
        size="small"
        type="border"
        v-on:click="editOption(option)"
        icon="cancel"
      />
      <CheckPermission permission="ED030">
        <vs-switch
          v-tooltip="'Deshabilitar opción'"
          color="primary"
          v-model="selected"
          v-on:click="toggleEnableOptionActivity({ option, selected, type })"
        />
      </CheckPermission>
    </vs-col>
  </vs-row>
</template>

<script>

import { mapActions } from 'vuex';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  components: { CheckPermission },
  mixins: [],
  data() {
    return {
      editMood: false,
      createMood: false,
      selected: this.option.deshabilitado !== 1
    };
  },
  props: {
    option: {
      type: Object,
      required: true,
      default: () => {}
    },
    type: {
      type: [String, Object],
      required: true,
      default: () => ''
    },
    selectedCategory: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions('Herramientas', [
      'listActivities',
      'toggleEnableOptionActivity',
      'saveOptions',
      'clearSelected'
    ]),
    editOption() {
      this.editMood = !this.editMood;
      this.createMood = false;
      if (this.type === 'category') {
        this.clearSelected({ type: 'ACTIVITY', option: this.option });
      }
    },
    saveOption(option) {
      this.editMood = false;
      this.saveOptions(option);
    }
  }
};
</script>

<style lang="css" scoped>

  .margin-top {
    margin-top: 20px;
  }
  .margin-right {
    margin-right: 10px;
  }

  .wrap-option {
    background:  #f8f8f8;
    margin-bottom: 6px;
  }

  .input-option {
    color: inherit;
    margin-top: 4px;
    width: 80%;
    background: transparent;
  }

  .input-blocked {
    color: inherit;
    pointer-events: none;
    border: none !important;
    padding: 4px 4px 6px 4px;
    border-radius: 5px;
  }

  .input-edit {
    color: inherit;
    border: 1px solid #66258324;
    padding: 4px 4px 6px 4px;
    border-radius: 5px;
  }

  .selected {
    background: #cfe7f3;
  }
</style>
