<template lang="html">
  <div>
    <vs-row vs-w="12" class="list-wrapper title-columns">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <b>Número</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <b>Estado</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Enviado por</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Razón social receptor</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Último aprobador</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Actualización</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Creación</b>
      </vs-col>
    </vs-row>
    <div id="list-dnt" style="padding-top: 56px;">
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
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
          <vs-icon
            title="En curso"
            v-if="file.estado === 3"
            icon="schedule"
            size="medium"
            bg="#43C3B9"
            class="state-icon"
            color="white"/>
          <vs-icon
            title="Aprobado"
            v-if="file.estado === 4"
            icon="thumb_up"
            size="medium"
            bg="#14AA59"
            class="state-icon"
            color="white"/>
          <vs-icon
            title="Rechazado"
            v-if="file.estado === 5"
            icon="thumb_down"
            size="medium"
            bg="#CE4B4B"
            class="state-icon"
            color="white"/>
          <vs-icon
            title="Anulado"
            v-if="file.estado === 6"
            icon="close"
            size="medium"
            bg="#A04E4E"
            class="state-icon"
            color="white"/>
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{file.solicitanteNombre| capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.receptorSucursalNombre | capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.receptorContactoNombre | capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.fechaActualizacion }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.fechaEntrega }}
        </vs-col>
        <vs-col
          vs-type="block"

          class="aditional-info"
          vs-lg="12"
          vs-sm="12"
          vs-xs="12"
        >
        <span class="pill-info" v-if="file.emisorInfoAdicional" title="División a la que pertenece">
          {{file.emisorInfoAdicional}}
        </span>
          <span class="pill-info" v-if="file.privado === 'Y'" title="Es un archivo privado">
          <vs-icon icon="lock"></vs-icon>
        </span>
          <span class="pill-info" v-if="file.numeroInt" title="Tipo de documento">
          {{findTypeDocument(file.numeroInt)}}
        </span>
          <span class="pill-info" v-if="file.plazo" title="tiempo Transcurrido">
          {{translateTime(file.plazo, true)}}
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  data() {
    return {};
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
    ]),
    translateTime: (time, abr) => {
      const seconds = time * 60;
      const numdays = Math.floor(seconds / 86400);
      const numhours = Math.floor((seconds % 86400) / 3600);
      const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);

      if (numdays !== 0) {
        if (abr) {
          return `${numdays } d ${ numhours } hrs ${ numminutes } min `;
        }
        return `${numdays } dias ${ numhours } horas ${ numminutes } minutos `;
      }

      if (numdays === 0 && numhours !== 0) {
        if (abr) {
          return `${numhours } hrs ${ numminutes } min `;
        }
        return `${numhours } horas ${ numminutes } minutos `;
      }

      if (numdays === 0 && numhours === 0 && numminutes !== 0) {
        if (abr) {
          return `${numminutes } min `;
        }
        return `${numminutes } minutos `;
      }

      if (numminutes === 0) {
        if (abr) {
          return `${numminutes } min`;
        }
        return `${numminutes } minutos`;
      }
      return numminutes;
    }
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
      filtros: filters.concat('|fechaCreacion:2020-06-13--2020-12-13')
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
  float:right;
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
