<template>
  <vs-popup
    :title="`Datos del grupo ${group.nombre}`"
    :active.sync="showModal">
    <div class="row mb-5">
      <div class="col-md-6 mt-3">
        <vs-input
          class="w-100"
          label="Código"
          maxlength="150"
          name="groupName"
          v-model="group.codigo"
        />
      </div>
      <div class="col-md-6 mt-3">
        <vs-input
          class="w-100"
          label="Nombre de Grupo"
          maxlength="150"
          name="groupName"
          v-model="group.nombre"
        />
      </div>
      <div class="col-md-12 mt-3">
        <vs-input
          class="w-100"
          label="Descripción de Grupo"
          maxlength="150"
          name="groupDescription"
          v-model="group.descripcion"
        />
      </div>
      <div class="col-md-6 mt-3 ml-2">
        <label for="ifOffice">
          Es Oficina Externa
        </label>
        <vs-switch id="ifOffice" v-model="group.isOffice"/>
      </div>
      <div class="col-md-12 mt-3">
        Este grupo será creado como subgrupo de {{group.padreNombre}}
      </div>
      <div class="col-md-12 mt-3">
        <div style="float: right">
          <vs-button
            class="action"
            color="primary"
            type="border"
            @click="saveChanges()"
            icon="save"
          >
            Guardar edición
          </vs-button>
        </div>
      </div>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpGroup',
  mixins: [],
  props: {
    group: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'modalGroup';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'asignDntFileED'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    saveChanges() {
      console.log('ACA', this.group);
    }
  }
};
</script>
<style scoped>

</style>
