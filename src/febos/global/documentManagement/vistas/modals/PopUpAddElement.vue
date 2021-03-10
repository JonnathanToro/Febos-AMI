<template>
  <vs-popup
    :title="`Nuevo elemento para ${element.nombre}`"
    :active.sync="showModal"
  >
    <div class="row">
      <div class="col-md-12 text-right mt-3" v-if="typeElement === 'document'">
        <UploadFile
          permission="*"
          text="Seleccionar"
          v-model="newElement.url"
          upload-to="saval"
          container-class="w-100"
        />
      </div>
      <div class="col-md-12">
        <vs-input
          class="w-100"
          v-if="typeElement === 'document'"
          label="Nombre para documento"
          name="documentNumber"
          v-model="newElement.url.name"
        />
        <vs-input
          class="w-100"
          v-if="typeElement === 'folder'"
          label="Nombre para carpeta"
          name="documentNumber"
          v-model="newElement.name"
        />
      </div>
    </div>
    <div class="m-top-20" style="display: flex;justify-content: flex-end;">
      <vs-button
        class="mt-5"
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

import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import UploadFile from '@/febos/global/_vue/componentes/UploadFile';

export default {
  name: 'PopUpAddElement',
  components: {
    UploadFile
  },
  mixins: [],
  props: {
    element: {
      type: [Object],
      required: true,
      default: () => {}
    },
    typeElement: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  data() {
    return {
      newElement: {
        name: '',
        type: '',
        typeName: '',
        url: {
          name: '',
          path: ''
        },
        parent: ''
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
      'addElement'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    async addElementRepo() {
      const element = {
        nombre: this.typeElement === 'folder' ? this.newElement.name : this.newElement.url.name,
        responsable: 'Letty Villamizar',
        correoResponsable: 'letty@febos.cl',
        type: this.typeElement,
        size: this.typeElement === 'folder' ? '0' : '4 MB',
        febosId: this.newElement.name[0] + Math.ceil(Math.random() * 10),
        estado: '1',
        fechaCreacion: Vue.moment().format('YYYY-MM-DD'),
        permisos: [
          {
            codigo: 'PER1',
            nombre: 'Revisión'
          },
          {
            codigo: 'PER2',
            nombre: 'Edición'
          },
          {
            codigo: 'PER3',
            nombre: 'Visor'
          },
          {
            codigo: 'PER4',
            nombre: 'Descargas'
          },
          {
            codigo: 'PER5',
            nombre: 'Suscripción'
          },
          {
            codigo: 'PER7',
            nombre: 'Copiar'
          },
          {
            codigo: 'PER8',
            nombre: 'DesPublicar'
          }
        ],
        padreId: this.element.febosId
      };
      element.url = element.type === 'document' ? this.newElement.url.path : '';
      element.size = `${ Math.ceil(Math.random() * 10) } MB`;
      console.log('ELEMENT', element);
      await this.addElement(element);
    }
  }
};
</script>
<style scoped>

</style>
