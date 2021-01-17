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
    <div id="list-dnt">
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
            <vs-dropdown-menu style="width: fit-content">
              <vs-dropdown-item v-on:click="getCommentsFile(file)">
                <vs-icon icon="search"/> Ver detalles
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="downloadFile(file)">
                <vs-icon icon="save_alt"/> Descargar acta
              </vs-dropdown-item>
              <vs-dropdown-item>
                <vs-icon icon="save_alt"/> Descargar adjuntos
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="cancelFileModal(file)">
                <vs-icon icon="clear"/> Anular expediente
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="binnacleFileModal(file)">
                <vs-icon icon="list"/> Bitácora
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="ticketModalFile(file)">
                <vs-icon icon="help"/> Ticket de ayuda
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
          </span>
        </vs-col>
      </vs-row>
    </div>
    <vs-popup title="Detalles del Expediente" :active.sync="detailsFile" v-if="file">
      <PopUpDetailFile :fileCommentDetails="fileCommentDetails"/>
    </vs-popup>
    <vs-popup title="Bitácora del Expediente" :active.sync="binnacleModal" v-if="binnacleFile">
      <div style="height: 400px; overflow-y: scroll">
        <Timeline
          :timeline-items="binnacleFile"
          message-when-no-items="No hay acciones realizadas aun"
          :unique-year="false"
          :show-day-and-month="true" />
      </div>
    </vs-popup>
    <vs-popup title="Generar ticket de ayuda" :active.sync="ticketModal" v-if="binnacleFile">
      <div>
        <label for="message">Cuéntanos en que podemos ayudarte</label>
        <vs-textarea id="message" v-model="messageTicket"  counter="1000" />
      </div>
      <vs-button
        color="primary"
        class="m-top-20"
        style="float: right;"
        type="filled"
        v-on:click="sendTicketFile()"
      >
        Enviar ticket
      </vs-button>
    </vs-popup>
    <vs-popup title="Anular Expediente" :active.sync="cancelModal">
      <PopUpCancelFile :canceledFile="canceledFile" />
    </vs-popup>
    <vs-row v-if="!loading && dntByFiles.length">
      <vs-col vs-w="12" class="m-top-20">
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
import Timeline from 'timeline-vuejs';

import FbPaginacion from '../../_vue/componentes/FbPaginacion';

import PopUpCancelFile from '@/febos/chile/dnt/vistas/PopUpCancelFile';
import PopUpDetailFile from '@/febos/chile/dnt/vistas/PopUpDetailFile';
import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  components: {
    FbPaginacion, PopUpDetailFile, PopUpCancelFile, Timeline
  },
  mixins: [FiltersDntMixin, FindTypeDocumentMixin],
  data() {
    return {
      cancelModal: false,
      detailsFile: false,
      binnacleModal: false,
      ticketModal: false,
      messageTicket: '',
      canceledFile: {},
      file: {}
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
        pagina: this.pagina,
        orden: '-fechaCreacion',
        itemsPorPagina: 10,
        // TODO agregar bien los filtros
        filtros: filters.concat('|fechaCreacion:2020-06-13--2020-12-13')
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
    },
    successAccion() {
      this.$vs.notify({
        title: 'Genial!',
        text: 'Acción realizada exitosamente',
        color: 'success',
        time: 3000,
        position: 'top-center'
      });
    },
    error(error) {
      if (error !== '') {
        this.$vs.notify({
          title: 'Oops!',
          text: error,
          color: 'danger',
          time: 10000,
          position: 'top-center'
        });
        this.limpiarMensajeDeError();
      }
    }
  },
  computed: {
    ...mapGetters('Dnts', [
      'loading',
      'error',
      'successAccion',
      'dntByFiles',
      'paginacion',
      'paginaActual',
      'fileCommentDetails',
      'binnacleFile'
    ]),
    ...mapGetters('Usuario', [
      'verificationCode',
      'currentUser'
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
      'getFileDetails',
      'downloadFilePDF',
      'attemptCancelFile',
      'limpiarMensajeDeError',
      'getFileBinnacle',
      'sendTicketHelp'
    ]),
    getCommentsFile(file) {
      this.getFileDetails({
        aprobacionId: file.solicitanteDocumentoId,
        ejecucionId: file.febosId
      });
      this.detailsFile = true;
    },
    downloadFile(file) {
      this.downloadFilePDF({
        retornarPdf: 'si',
        aprobacionId: file.solicitanteDocumentoId,
        ejecucionId: file.febosId
      });
    },
    cancelFileModal(file) {
      this.cancelModal = true;
      this.canceledFile = file;
    },
    binnacleFileModal(file) {
      this.binnacleModal = true;
      this.getFileBinnacle({
        febosId: file.febosId,
        filas: 200,
        pagina: 1
      });
    },
    ticketModalFile(file) {
      this.file = file;
      this.ticketModal = true;
    },
    sendTicketFile() {
      const ticket = {
        febosId: this.file.febosId,
        correo: this.currentUser.correo,
        url: window.location.href,
        mensaje: this.messageTicket
      };
      console.log('ticket', ticket);
      this.sendTicketHelp(ticket);
    },
    translateTime: (time, abr) => { // ASCO
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
    } // END ASCO, o no?
  },
  mounted() {
    const view = this.$route.params.vista;
    const filters = this.getFilterView(view);
    this.listDocuments({
      tipo: 'aprobaciones',
      campos: '*',
      pagina: 1,
      orden: '-fechaCreacion',
      itemsPorPagina: 10,
      // TODO agregar bien los filtros
      filtros: filters.concat('|fechaCreacion:2020-06-13--2020-12-13')
    });
    console.log('hits', this);
  }
};
</script>
<style>

.m-top-20 {
  margin-top: 20px;
}

.list-wrapper {
  background: white;
}

.title-columns {
  padding: 16px 10px;
  margin-bottom: 10px;
  background: white;
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
