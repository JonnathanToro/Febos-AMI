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
        <b>Remitente</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Responsable</b>
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
            title="Creado"
            v-if="file.estado === 1"
            icon="mail_outline"
            size="medium"
            bg="#43C3B9"
            class="state-icon"
            color="white"/>
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
            v-if="file.estado === 8"
            icon="close"
            size="medium"
            bg="#A04E4E"
            class="state-icon"
            color="white"/>
          <vs-icon
            title="Finalizado"
            v-if="file.estado === 9"
            icon="move_to_inbox"
            size="medium"
            bg="#A04E4E"
            class="state-icon"
            color="white"/>
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{file.compradorArea | capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.emisorContactoNombre | capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          Sin asignar
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.fechaActualizacion | dateFormat }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.fechaEntrega | dateFormat }}
        </vs-col>
        <vs-col
          vs-type="block"

          class="aditional-info"
          vs-lg="12"
          vs-sm="12"
          vs-xs="12"
        >
          <span
            class="pill-info"
            v-if="file.claseMercadoPublico === 'ext'"
            title="Es un archivo externo"
          >
            externo
          </span>
          <span
            class="pill-info"
            v-if="file.claseMercadoPublico === 'int'"
            title="Es un archivo interno"
          >
            interno
          </span>
          <span
            class="pill-info"
            v-if="file.transporteViaTransporteCodigoTransporte === 1"
            title="Acompaña físico"
          >
           <vs-icon icon="description" ></vs-icon>
            acompaña físico
          </span>
          <span
            class="pill-info"
            v-if="file.transportePuertoTipo === 1"
            title="Es un archivo privado"
          >
            <vs-icon icon="lock"></vs-icon>
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
               <vs-dropdown-item v-on:click="binnacleFileModal(file)">
                <vs-icon icon="list"/> Bitácora
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="getDetailsFile(file)">
                <vs-icon icon="search"/> Ver detalles
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="downloadFile(file)">
                <vs-icon icon="save_alt"/> Descargar acta
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="downloadAttatchments(file)">
                <vs-icon icon="save_alt"/> Descargar adjuntos
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="cancelFileModal(file)">
                <vs-icon icon="clear"/> Anular expediente
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="processFileModal(file)">
                <vs-icon icon="move_to_inbox"/> Finalizar documento
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="getParticipants(file)">
                <vs-icon icon="groups"/> Participantes
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="getComments(file)">
                <vs-icon icon="chat"/> Comentarios
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="sendFile(file)">
                <vs-icon icon="chat"/> Enviar documento
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
    <vs-popup title="Bitácora del Expediente" :active.sync="binnacleModal" v-if="binnacleFile">
      <div>
        <vs-list>
          <div  v-for="binnacle in binnacleFile" :key="binnacle.bitacoraId">
            <vs-list-item
              v-if="binnacle.severidadNombre === 'ERROR'"
              icon="warning"
              style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
              :title="binnacle.mensaje" :subtitle="binnacle.usuarioNombre"
            >
              <vs-chip color="dark" v-if="binnacle.externalId">
                <vs-icon icon="pageview" size="small"></vs-icon>
              </vs-chip>
              <vs-chip color="dark" v-if="binnacle.correoId">
                <vs-icon icon="email" size="small"></vs-icon>
              </vs-chip>
              <vs-chip color="info">
                <vs-icon icon="email" size="small">{{binnacle.fecha | dateFormat}}</vs-icon>
              </vs-chip>
              <!--<vs-chip color="dark" v-if="binacle.externalId">
                <vs-icon icon="pageview" size="small"></vs-icon>
              </vs-chip>-->
            </vs-list-item>
            <vs-list-item
              v-if="binnacle.severidadNombre === 'INFO'"
              icon="info"
              style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
              :title="binnacle.mensaje" :subtitle="binnacle.usuarioNombre"
            >
              <vs-chip color="dark" v-if="binnacle.externalId">
                <vs-icon icon="pageview" size="small"></vs-icon>
              </vs-chip>
              <vs-chip color="dark" v-if="binnacle.correoId">
                <vs-icon icon="email" size="small"></vs-icon>
              </vs-chip>
              <vs-chip color="info">
                <vs-icon icon="email" size="small">{{binnacle.fecha | dateFormat}}</vs-icon>
              </vs-chip>
              <!--<vs-chip color="dark" v-if="binacle.externalId">
                <vs-icon icon="pageview" size="small"></vs-icon>
              </vs-chip>-->
            </vs-list-item>
          </div>
        </vs-list>
      </div>
    </vs-popup>
    <vs-popup title="Detalles del Expediente" :active.sync="detailsFile" v-if="file">
      <PopUpDetailFile :file="file" :fileCommentDetails="fileCommentDetails"/>
    </vs-popup>
    <PopUpCancelFile :canceledFile="canceledFile" />
    <PopUpProcessFile :processedFile="file" />
    <PopUpParticipantsFile :file="file" />
    <PopUpCommentsFile :file="file" />
    <PopUpTicketFile :file="file" />
    <PopUpSendFile :file="file" />
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

import FbPaginacion from '../../_vue/componentes/FbPaginacion';

import PopUpCancelFile from '@/febos/chile/dnt/vistas/modals/PopUpCancelFile';
import PopUpDetailFile from '@/febos/chile/dnt/vistas/modals/PopUpDetailFile';
import PopUpProcessFile from '@/febos/chile/dnt/vistas/modals/PopUpProcessFile';
import PopUpTicketFile from '@/febos/chile/dnt/vistas/modals/PopUpTicketFile';
import PopUpSendFile from '@/febos/chile/dnt/vistas/modals/PopUpSendFile';
import PopUpParticipantsFile from '@/febos/chile/dnt/vistas/modals/PopUpParticipantsFile';
import PopUpCommentsFile from '@/febos/chile/dnt/vistas/modals/PopUpCommentsFile';
import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  components: {
    FbPaginacion,
    PopUpDetailFile,
    PopUpCancelFile,
    PopUpProcessFile,
    PopUpParticipantsFile,
    PopUpCommentsFile,
    PopUpTicketFile,
    PopUpSendFile
  },
  mixins: [FiltersDntMixin, FindTypeDocumentMixin],
  data() {
    return {
      cancelModal: false,
      detailsFile: false,
      binnacleModal: false,
      canceledFile: {},
      file: {}
    };
  },
  watch: {
    pagina() {
      const view = this.$route.params.vista;
      const filters = this.getFilterView(view);

      this.listDocuments({
        tipo: 'EXP',
        campos: '*',
        pagina: this.pagina,
        orden: '-fechaCreacion',
        itemsPorPagina: 10,
        // TODO agregar bien los filtros
        filtros: filters.concat('|fechaCreacion:2020-06-13--2021-02-13')
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
      'binnacleFile',
      'showModalFile',
      'fileCommentDetails',
    ]),
    ...mapGetters('Empresas', [
      'empresa',
      'usersCompany',
      'groupsCompany'
    ]),
    ...mapGetters('Usuario', [
      'currentUser'
    ]),
    pagina: {
      get() {
        return this.paginaActual;
      },
      set(value) {
        this.actualizarPagina(value);
      }
    },
    showModal: {
      get() {
        return this.showModalFile;
      },
      set(value) {
        this.closeModal(value);
      }
    },
    showModalProcess: {
      get() {
        return this.showModalFile;
      },
      set(value) {
        this.closeModal(value);
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments',
      'actualizarPagina',
      'getFileDnt',
      'downloadFilePDF',
      'attemptCancelFile',
      'limpiarMensajeDeError',
      'getFileBinnacle',
      'sendTicketHelp',
      'closeModal',
      'downloadAttatchmentsFile',
      'getFileDetails',
      'downloadFilePDF',
      'limpiarMensajeDeError',
      'closeModal',
      'getFileComments',
      'getAttachmentsDnt'
    ]),
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany'
    ]),
    ...mapActions('Modals', [
      'showModals'
    ]),
    binnacleFileModal(file) {
      this.binnacleModal = true;
      this.getFileBinnacle({
        febosId: file.febosId,
        filas: 200,
        pagina: 1
      });
    },
    getDetailsFile(file) {
      this.file = file;
      this.getFileDnt({
        febosId: file.febosId,
        destinatarios: 'si',
        referencias: 'si'
      });
      this.getAttachmentsDnt({
        febosId: file.febosId
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
    downloadAttatchments(file) {
      this.downloadAttatchmentsFile({
        febosId: file.febosId,
        comprimir: 'si'
      });
    },
    cancelFileModal(file) {
      this.showModals('cancelFile');
      this.canceledFile = file;
    },
    processFileModal(file) {
      this.showModals('processFile');
      this.file = file;
    },
    getParticipants(file) {
      this.showModals('participantsFile');
      this.file = file;
      this.getFileDnt({
        febosId: file.febosId,
        destinatarios: 'si'
      });
    },
    getComments(file) {
      this.showModals('commentsFile');
      this.file = file;
      this.getFileComments({
        febosId: file.febosId
      });
    },
    ticketModalFile(file) {
      this.file = file;
      this.showModals('ticketFile');
    },
    sendFile(file) {
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
      this.file = file;
      this.showModals('sendFile');
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
      tipo: 'EXP',
      campos: '*',
      pagina: 1,
      orden: '-fechaCreacion',
      itemsPorPagina: 10,
      // TODO agregar bien los filtros
      filtros: filters.concat('|fechaCreacion:2020-06-13--2021-02-13')
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
  padding: 4px 6px;
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
