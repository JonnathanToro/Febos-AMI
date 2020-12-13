<template lang="html">
  <div id="list-dnt">
    <vs-row vs-w="12" class="list-wrapper title-columns">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <b>Número</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <b>Estado</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Enviado por</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Razón social receptor</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Último aprobador</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Actualización</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Creación</b>
      </vs-col>
    </vs-row>
    <vs-row
      vs-w="12"
      :key="file.febosId"
      v-for="file in dntByFiles"
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
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <vs-icon
          v-if="file.estado === 3"
          icon="schedule"
          size="medium"
          bg="#43C3B9"
          class="state-icon"
          color="white"/>
        <vs-icon
          v-if="file.estado === 4"
          icon="thumb_up"
          size="medium"
          bg="#14AA59"
          class="state-icon"
          color="white"/>
        <vs-icon
          v-if="file.estado === 5"
          icon="thumb_down"
          size="medium"
          bg="#CE4B4B"
          class="state-icon"
          color="white"/>
        <vs-icon
          v-if="file.estado === 6"
          icon="close"
          size="medium"
          bg="#A04E4E"
          class="state-icon"
          color="white"/>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        {{ file.solicitanteNombre }}
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        {{ file.receptorSucursalNombre }}
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        {{ file.receptorContactoNombre }}
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        {{ file.fechaActualizacion }}
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        {{ file.fechaEntrega }}
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        class="aditional-info"
        vs-lg="12"
        vs-sm="12"
        vs-xs="12"
      >
        <span class="pill-info" v-if="file.emisorInfoAdicional">
          {{file.emisorInfoAdicional}}
        </span>
        <span class="pill-info" v-if="file.privado === 'Y'">
          <vs-icon icon="lock"></vs-icon>
        </span>
        <span class="pill-info" :v-if="file.numeroInt">
          {{findTypeDocument(file.numeroInt)}}
        </span>
        <span class="pill-info" :v-if="file.numeroInt">
          Tiempo 1d 4h
        </span>
        <vs-icon
          class="actions"
          icon="bubble_chart"
          size="medium"
          bg="#E4E4E4"
          round
          color="gray"
        />
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  data() {
    return {
      holi: ''
    };
  },
  mixins: [FiltersDntMixin, FindTypeDocumentMixin],
  watch: {
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
      'dntByFiles'
    ])
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments'
    ])
  },
  mounted() {
    const view = this.$route.params.vista;
    const filters = this.getFilterView(view);
    this.listDocuments({
      tipo: 'aprobaciones',
      campos: '*',
      pagina: 1,
      orden: '-fechaCreacion',
      itemsPorPagina: 200,
      // TODO agregar bien los filtros
      filtros: filters
    });
    console.log('VIEW', view);
  }
};
</script>
<style>

.list-wrapper {
  background: white;
}

.title-columns {
  padding: 10px 0;
  margin-bottom: 10px;
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
}

.actions {
  float:right;
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.aditional-info {
  padding: 4px 0;
  margin: 0 auto 0 auto;
  position: relative;
}

.state-icon {
  border-radius: 25px;
  font-size: 22px !important;
  padding: 5px;
}
</style>
