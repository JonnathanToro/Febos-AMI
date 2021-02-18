<template>
  <vs-row>
    <vs-col vs-w="12">
      <h3>
        Mantenedor de Destinos
      </h3>
      <div class="margin-top">
        <br>Estas opciones activas aparecerán en los formularios de la aplicación.
      </div>
      <div v-if="mantenedorSubjects && !mantenedorSubjects.length">
        <h4 class="info-documents">
          Pulsa el botón
          <span style="padding: 0 4px;">
              <vs-button
                color="primary"
                class="margin-right"
                size="small"
                disabled
                type="border"
                icon="search"
              />
            </span>
          para ver los destinos de la categoría
        </h4>
      </div>
    </vs-col>
    <vs-col vs-lg="12" id="listado-opciones">
      <vs-row vs-type="flex" vs-align="space-around" vs-justify="space-around">
        <vs-col class="margin-top" vs-sm="12" vs-lg="5">
          <div class="add-new">
            <h4>Tipos de destino</h4>
            <CheckPermission permission="ED028">
              <vs-button
                v-tooltip="'Agregar categoría'"
                color="primary" class="margin-right" v-on:click="createOption()"
                type="border" icon="playlist_add" />
            </CheckPermission>
          </div>
          <vs-list class="bg-white margin-top box-options">
            <div
              v-for="category in categorySubjects"
              class="wrap-list-item"
              :key="category.opcionId"
            >
              <ListItemOptionDestino
                :option="category"
                :type="'category'"
                :selectedCategory="selectedSubject
                && selectedSubject.opcionId === category.opcionId"/>
            </div>
          </vs-list>
        </vs-col>
        <vs-col
          class="margin-top"
          vs-sm="12"
          vs-lg="5"
        >
          <div class="add-new">
            <h4>Destinos</h4>
            <CheckPermission permission="ED031">
              <vs-button
                v-tooltip="'Agregar destino a categoría'"
                color="primary"
                class="margin-right"
                v-if="selectedSubject.opcionId"
                v-on:click="createOption(selectedSubject)"
                type="border"
                icon="playlist_add"
              />
            </CheckPermission>
          </div>
          <vs-list
            class="bg-white margin-top box-options"
            v-if="mantenedorSubjects && mantenedorSubjects.length"
          >
            <div
              v-for="document in mantenedorSubjects"
              class="wrap-list-item"
              :key="document.opcionId"
            >
              <ListItemOptionDestino
                :option="document"
                :type="'document'"/>
            </div>
          </vs-list>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-popup
      :title="createDocument ? 'Nuevo destino' : 'Nueva tipo destino'"
      :active.sync="createMood"
    >
      <div>
        <input
          class="input-option input-edit"
          placeholder="Abreviación"
          size="small"
          v-model="option.valor"
        />
      </div>
      <div>
        <input
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

import ListItemOptionDestino from '../components/ListItemOptionDestino';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  components: { ListItemOptionDestino, CheckPermission },
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
      'categorySubjects',
      'mantenedorSubjects',
      'selectedSubject'
    ]),
    ...mapGetters('Usuario', [
      'usuarioActual'
    ]),
    ...mapGetters('Empresas', [
      'empresa'
    ])
  },
  methods: {
    ...mapActions('Herramientas', [
      'listCategories',
      'listSubjects',
      'clearSubjects',
      'saveOptions'
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
          orden: this.mantenedorSubjects.length + 1
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
          ? this.option.parametroId + this.option.valor : `tipos.destinos-ed.${ this.option.valor}`,
        orden: this.createDocument ? this.option.orden : this.categorySubjects.length + 1,
        nivel: 0,
        grupoId: this.createDocument ? this.option.grupoId : 'tipos.destinos-ed',
        extra: '{}'
      };
      await this.saveOptions(option);

      if (Object.keys(this.selectedSubject).length) {
        await this.listSubjects(this.selectedSubject);
      } else {
        await this.listCategories({
          grupoOpcion: 'tipos.destinos-ed',
          deshabilitado: 'si'
        });
      }

      this.createDocument = false;
      this.createMood = false;
    }
  },
  mounted() {
    this.clearSubjects();
    this.listCategories({
      grupoOpcion: 'tipos.destinos-ed',
      deshabilitado: 'si'
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
