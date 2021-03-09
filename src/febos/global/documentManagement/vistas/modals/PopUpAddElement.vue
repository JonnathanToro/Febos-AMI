<template>
  <vs-popup
    :title="`Nuevo elemento para ${element.nombre}`"
    :active.sync="showModal"
  >
    <div class="row">
      <div class="col-md-6">
        <vs-input
          class="w-100"
          v-if="type === 'document'"
          label="Nombre para documento"
          name="documentNumber"
          v-model="newElement.name"
        />
        <vs-input
          class="w-100"
          v-if="type === 'folder'"
          label="Nombre para carpeta"
          name="documentNumber"
          v-model="newElement.name"
        />
      </div>
      <div class="col-md-12" v-if="type === 'document'">
        <vs-input
          class="w-100"
          label="Nº Documento"
          name="documentNumber"
          v-model="newElement.name"
        />
      </div>
    </div>
    <div class="m-top-20" style="display: flex;justify-content: flex-end;">
      <vs-button
        v-on:click="addElementRepo()"
        color="primary"
        style="margin-left: 12px;"
        type="border"
      >
        Agregar
      </vs-button>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpAddElement',
  mixins: [],
  props: {
    element: {
      type: [Object],
      required: true,
      default: () => {}
    },
    type: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  data() {
    return {
      newElement: {
        name: '',
        type: this.type,
        typeName: this.type === 'folder' ? 'Carpeta' : 'Documento',
        url: '',
        parent: this.item.febosId
      }
    };
  },
  computed: {
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'addElement';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('DocManagement', [
      'addEelement'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    async addElementRepo() {
      await this.addEelement(this.newElement);
    }
  },
  mounted() {
    console.log('ELEMENT', this.element, this.type);
  }
};
</script>
<style scoped>

</style>
