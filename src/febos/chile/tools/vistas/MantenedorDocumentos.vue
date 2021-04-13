<template>
  <vs-row>
    <vs-col vs-w="12">
      <h3>
        Mantenedor de Documentos
      </h3>
      <div class="margin-top">
        <br>Estas opciones activas aparecerán en los formularios de la aplicación.
      </div>
      <div v-if="mantenedorDocumentos && !mantenedorDocumentos.length">
        <h5 class="info-documents">
          Pulsa el botón
          <span style="padding: 0 4px;">
              <vs-button color="primary" class="margin-right" size="small" disabled
                         type="border" icon="search" />
            </span>
          para ver los documentos de la categoría
        </h5>
      </div>
    </vs-col>
    <vs-col vs-lg="12" id="listado-opciones">
      <vs-row vs-type="flex" vs-align="space-around" vs-justify="space-around">
        <vs-col class="margin-top" vs-sm="12" vs-lg="5">
          <div class="add-new">
            <h4>Categorías</h4>
            <CheckPermission permission="ED028">
              <vs-button
                v-tooltip="'Agregar categoría'" color="primary"
                class="margin-right" v-on:click="createOption()"
                type="border" icon="playlist_add" />
            </CheckPermission>
          </div>
          <vs-list class="bg-white margin-top box-options">
            <div
              v-for="category in mantenedorCategorias"
              class="wrap-list-item"
              :key="category.opcionId"
            >
              <ListItemOption
                :option="category"
                :type="'category'"
                :selectedCategory="selectedCategory
                && selectedCategory.opcionId === category.opcionId"/>
            </div>
          </vs-list>
        </vs-col>
        <vs-col
          class="margin-top"
          vs-sm="12"
          vs-lg="5"
        >
          <div class="add-new">
            <h4>Documentos</h4>
            <CheckPermission permission="ED031">
              <vs-button
                v-tooltip="'Agregar documento a categoría'"
                color="primary"
                class="margin-right"
                v-if="selectedCategory.opcionId"
                v-on:click="createOption(selectedCategory)"
                type="border"
                icon="playlist_add"
              />
            </CheckPermission>
          </div>
          <vs-list
            class="bg-white margin-top box-options"
            v-if="mantenedorDocumentos && mantenedorDocumentos.length"
          >
            <div
              v-for="document in mantenedorDocumentos"
              class="wrap-list-item"
              :key="document.opcionId"
            >
              <ListItemOption
                :option="document" :type="'document'"
                :usersCompany="usersCompany"
                :groupsCompany="groupsCompany"
              />
            </div>
          </vs-list>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-popup
      :title="createDocument ? 'Nuevo Documento' : 'Nueva Categoría'"
      :active.sync="createMood"
    >
      <div>
        <input
          maxlength="10"
          class="input-option input-edit"
          placeholder="Abreviación"
          size="small"
          v-model="option.valor"
        />
      </div>
      <div>
        <input
          maxlength="100"
          class="input-option input-edit"
          placeholder="Nombre de opción"
          size="small"
          v-model="option.descripcion"
        />
      </div>
      <div class="box-button">
        <vs-button
          color="primary"
          class="margin-top"
          type="border"
          icon="save"
          v-on:click="saveOption()"
        >
          Guardar
        </vs-button>
      </div>
    </vs-popup>
  </vs-row>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import ListItemOption from '../components/ListItemOption';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  components: { ListItemOption, CheckPermission },
  mixins: [],
  data() {
    return {
      createMood: false,
      createDocument: false,
      option: {}
    };
  },
  watch: {
    loading(value) {
      if (!value) {
        this.$vs.loading.close('#listado-opciones > .con-vs-loading');
        return;
      }

      this.$vs.loading({
        container: '#listado-opciones',
        scale: 0.6
      });
    }
  },
  computed: {
    ...mapGetters('Herramientas', [
      'loading',
      'mantenedorCategorias',
      'mantenedorDocumentos',
      'selectedCategory'
    ]),
    ...mapGetters('Usuario', [
      'usuarioActual'
    ]),
    ...mapGetters('Empresas', [
      'empresa',
      'usersCompany',
      'groupsCompany'
    ])
  },
  methods: {
    ...mapActions('Herramientas', [
      'listCategories',
      'listDocuments',
      'clearDocuments',
      'saveOptions'
    ]),
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany'
    ]),
    createOption(category) {
      this.createMood = !this.createMood;
      this.option = {};
      if (category) {
        this.createDocument = true;
        this.option = {
          ...this.option,
          parametroId: `${category.grupoId }.${ category.valor }.item.`,
          grupoId: `${category.grupoId }.${ category.valor }.item`,
          orden: this.mantenedorDocumentos.length + 1
        };
      }
    },
    async saveOption() {
      const option = {
        valor: this.option.valor,
        descripcion: this.option.descripcion,
        configuradoPor: this.usuarioActual.id,
        referenciaId: this.empresa.id,
        parametroId: this.createDocument
          ? this.option.parametroId + this.option.valor : `tipos.documentos-ed.${ this.option.valor}`,
        orden: this.createDocument ? this.option.orden : this.mantenedorCategorias.length + 1,
        nivel: 0,
        grupoId: this.createDocument ? this.option.grupoId : 'tipos.documentos-ed',
        extra: '{}'
      };
      await this.saveOptions(option);

      if (Object.keys(this.selectedCategory).length) {
        await this.listDocuments(this.selectedCategory);
      } else {
        await this.listCategories({
          grupoOpcion: 'tipos.documentos-ed',
          deshabilitado: 'si'
        });
      }

      this.createDocument = false;
      this.createMood = false;
    }
  },
  mounted() {
    this.clearDocuments();
    this.listCategories({
      grupoOpcion: 'tipos.documentos-ed',
      deshabilitado: 'si'
    });
    this.getUsersCompany({
      empresaId: this.empresa.id,
      pagina: 1,
      filas: 9999,
      buscarInfoExtra: 'si',
      filtroInfoExtra: 'CARGO'
    });
    this.getGroupsCompany({
      empresaId: this.empresa.id
    });
  }
};
</script>

<style lang="css" scoped>

  .box-button {
    display: flex;
    justify-content: center;
  }

  .margin-top {
    margin-top: 20px;
  }

  .box-options {
    height: 400px;
    overflow-y: scroll;
  }

  .info-documents {
    display: flex;
  }

  .add-new {
    display: flex;
    justify-content: space-between;
  }

  .input-option {
    margin-top: 10px;
    width: 100%;
    background: transparent;
  }

  .input-edit {
    border: 1px solid #66258324;
    padding: 4px 4px 6px 4px;
    border-radius: 5px;
  }
</style>
