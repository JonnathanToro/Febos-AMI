<template lang="html">
  <div>
    <vs-row vs-w="12" class="list-wrapper title-columns" >
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <b>Número</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <b>Estado</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Tema</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Descripción</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Tipo</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Creador</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Actualización</b>
      </vs-col>
    </vs-row>
    <div id="list-dnt" style="padding-top: 56px;">
      <vs-row
        vs-w="12"
        :key="file.febosId"
        v-for="file in dntByDocDigital"
        class="content-rows list-wrapper"
      >
        <vs-col vs-type="block" class="numero-file" vs-lg="1" vs-sm="4" vs-xs="12">
          <div>
            # <br>
          </div>
          <div>
            {{ file.numero }}
          </div>
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
          {{file.estado}}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          tema
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.nombreDescriptivo | capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.categoria }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.solicitanteNombre }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.fechaCreacion | dateFormat }}
        </vs-col>
        <vs-col
          vs-type="block"

          class="aditional-info"
          vs-lg="12"
          vs-sm="12"
          vs-xs="12"
        >
          <span  class="actions">
            <vs-dropdown vs-custom-content vs-trigger-click >
            <a class="a-icon" href.prevent>
              <vs-icon
                class="" icon="bubble_chart"
                size="medium"
                bg="#E4E4E4"
                round
                color="gray"></vs-icon>
            </a>
            <vs-dropdown-menu style="width: 12%">
              <vs-dropdown-item v-on:click="getDetails(file)">
                <vs-icon icon="search"/> Ver Detalles
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
          </span>
        </vs-col>
      </vs-row>
    </div>
    <vs-popup title="Detalles del codumento" :active.sync="popupDetails">
      <p>
       {{detailsDnt}}
      </p>
    </vs-popup>
    <vs-row v-if="!loading && dntByDocDigital.length">
      <vs-col vs-w="9">
        <fb-paginacion
          :total="paginacion.paginasTotales"
          :max="10"
          v-model="pagina"
          class="mt-7"
        />
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import FbPaginacion from '../../_vue/componentes/FbPaginacion';

import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  components: { FbPaginacion },
  mixins: [FiltersDntMixin, FindTypeDocumentMixin],
  data() {
    return {
      popupDetails: false,
    };
  },
  watch: {
    pagina() {
      const view = this.$route.params.vista;
      const filters = this.getFilterView(view);

      console.log('aca si o no?', this.pagina);
      this.listDocuments({
        tipo: 'aprobaciones',
        campos: '*',
        pagina: this.pagina || 1,
        orden: '-fechaCreacion',
        itemsPorPagina: 10,
        // TODO agregar bien los filtros
        // filtros: filters.concat('|fechaCreacion:2020-06-13--2020-12-13')
        filtros: filters
      });
    },
    loading(value) {
      if (!value) {
        this.$vs.loading.close('#list-dnt > .con-vs-loading');
        return;
      }

      this.$vs.loading({
        container: '#list-dnt',
        scale: 0.6
      });
    }
  },
  computed: {
    ...mapGetters('Dnts', [
      'loading',
      'dntByDocDigital',
      'paginacion',
      'detailsDnt',
      'paginaActual'
    ]),
    pagina: {
      get() {
        return this.paginaActual;
      },
      set(value) {
        this.actualizarPagina(value);
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments',
      'actualizarPagina',
      'detailDnt'
    ]),
    getDetails(file) {
      this.detailDnt({
        febosId: file.febosId,
        imagen: 'si',
        regenerar: 'si',
        incrustar: 'no',
        tipoImagen: 0,
        cuerpo: 'si'
      });
      this.popupDetails = true;
    }
  },
  mounted() {
    const view = this.$route.params.vista;
    const filters = this.getFilterView(view);
    console.log('VISTA', filters);
    this.listDocuments({
      tipo: 'DDD',
      campos: '*',
      pagina: 1,
      orden: '-fechaCreacion',
      itemsPorPagina: 10,
      // TODO agregar bien los filtros
      // filtros: filters.concat('|fechaCreacion:2020-06-13--2020-12-13')
      filtros: filters
    });
    console.log('hits', this);
  }
};
</script>
<style>

.list-wrapper {
  background: white;
}

.title-columns {
  padding: 16px 10px;
  margin-bottom: 10px;
  background: white;
  position: fixed;
  width: 81% !important;
  z-index: 10;
  box-shadow: -1px 6px 12px 0 #80808075;
}

.content-rows {
  padding: 10px;
  margin-top: 4px;
}

.numero-file {
  text-align: center;
  color: #3ca2d6;
}

.pill-info {
  border: 1px solid #3ca2d6;
  padding: 1px 5px;
  border-radius: 10px;
  font-size: 12px;
  margin-right: 20px;
  cursor:pointer;
}

.actions {
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
}
.aditional-info {
  padding: 4px 0;
  margin-left: 16% !important;
  position: relative;
}

.state-icon {
  border-radius: 25px;
  font-size: 22px !important;
  padding: 5px;
}
.tooltip-inline {
  display: inline !important;
}
</style>
