<template>
  <vs-popup
    :title="`Datos del grupo ${name}`"
    @close="cancelEdit"
    :active.sync="showModal">
    <div class="row mb-5">
      <div class="col-md-6 mt-3">
        <vs-input
          class="w-100"
          label="Código"
          maxlength="150"
          name="groupName"
          v-model="editGroup.codigo"
        />
      </div>
      <div class="col-md-6 mt-3">
        <vs-input
          class="w-100"
          label="Nombre de Grupo"
          maxlength="150"
          name="groupName"
          v-model="editGroup.nombre"
        />
      </div>
      <div class="col-md-12 mt-3">
        <vs-input
          class="w-100"
          label="Descripción de Grupo"
          maxlength="150"
          name="groupDescription"
          v-model="editGroup.descripcion"
        />
      </div>
      <div class="col-md-12 mt-3">
        <div class="row">
          <div class="col-md-4">
            <label>Es tipo de oficina</label>
          </div>
          <div class="col-md-4">
            <vs-radio
              vs-name="isPrivate"
              :vs-value="'int'"
              v-model="editGroup.tipo"
            >
              Interna
            </vs-radio>
          </div>
          <div class="col-md-4">
            <vs-radio
              vs-name="isPrivate"
              :vs-value="'ext'"
              v-model="editGroup.tipo"
            >
              Externa
            </vs-radio>
          </div>
        </div>
      </div>
      <div class="col-md-12 mt-3" v-if="this.action === 'add'">
        Este grupo será creado como subgrupo de {{editGroup.padreNombre}}
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
  name: 'PopUpEditGroup',
  mixins: [],
  props: {
    group: {
      type: Object,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editGroup: {
        ...this.group
      }
    };
  },
  watch: {
    group(newValue) {
      this.editGroup = { ...newValue };
    }
  },
  computed: {
    ...mapGetters('Empresas', [
      'company'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'modalEditGroup';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Modals', [
      'closeModal'
    ]),
    ...mapActions('Empresas', [
      'updateGroup',
      'createGroup'
    ]),
    saveChanges() {
      const group = {
        ...this.editGroup,
        esOficina: this.editGroup.isOffice ? 'si' : 'no',
        esDivision: this.editGroup.esDivision === 'Y' ? 'si' : 'no'
      };

      console.log('GROUP', group);
      /* if (this.action === 'add') {
        this.createGroup({
          empresaId: this.company.id,
          group
        });
      } else {
        this.updateGroup({
          empresaId: this.company.id,
          group
        });
      } */
    },
    cancelEdit() {
      console.log('cancelar', this);
    }
  }
};
</script>
<style scoped>

</style>
