<template>
  <div>
    <vs-row class="bg-white shadow py-5 px-3 mb-4">
      <vs-col vs-lg="11">
        <vs-row>
          <vs-col vs-lg="1" class="text-center">
            <b>#</b>
          </vs-col>
          <vs-col vs-lg="2">
            <b>Estado</b>
          </vs-col>
          <vs-col vs-lg="9">
            <vs-row>
              <vs-col vs-lg="4">
                <b>Enviado por</b>
              </vs-col>
              <vs-col vs-lg="4">
                <b>Remitente</b>
              </vs-col>
              <vs-col vs-lg="4">
                <b>Responsable</b>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-lg="1" vs-sm="4" vs-xs="12" class="text-center">
        <b>...</b>
      </vs-col>
    </vs-row>
    <div id="list-dnt">
      <vs-row
        :key="file.febosId"
        v-for="file in dntByFiles"
        class="p-3 mt-2 bg-white shadow-sm"
      >
        <vs-col vs-lg="11">
          <vs-row>
            <vs-col class="text-center text-primary" vs-lg="1">
              <div>
                # <br>
              </div>
              <div>
                {{ file.numero }}
              </div>
            </vs-col>
            <vs-col vs-lg="2">
              <vs-chip
                v-if="file.estado === 1"
                title="creado"
              >
                <vs-avatar icon="mail_outline" color="#43C3B9" />
                Creado
              </vs-chip>
              <vs-chip
                title="Borrador"
                v-if="file.estado === 3"
              >
                <vs-avatar icon="query_builder" color="#43C3B9" />
                Borrador
              </vs-chip>
              <vs-chip
                title="Aprobado"
                v-if="file.estado === 4"
              >
                <vs-avatar icon="thumb_up" color="#14AA59" />
                Aprobado
              </vs-chip>
              <vs-chip
                title="Rechazado"
                v-if="file.estado === 5"
              >
                <vs-avatar icon="thumb_down" color="#CE4B4B" />
                Rechazado
              </vs-chip>
              <vs-chip
                title="Anulado"
                v-if="file.estado === 8"
              >
                <vs-avatar icon="close" color="#A04E4E" />
                Anulado
              </vs-chip>
              <vs-chip
                title="Finalizado"
                v-if="file.estado === 9"
              >
                <vs-avatar icon="move_to_inbox" color="#A04E4E" />
                Finalizado
              </vs-chip>
            </vs-col>
            <vs-col vs-lg="9">
              <vs-row>
                <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
                  {{file.compradorArea | capitalize }}
                </vs-col>
                <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
                  {{ file.emisorContactoNombre | capitalize }}
                </vs-col>
                <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
                  Sin asignar
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
          <vs-row>
            <vs-col vs-offset="3" vs-lg="7" vs-type="flex">
              <vs-chip class="mr-4">
                <vs-avatar icon="update" />
                {{ file.fechaActualizacion | dateFormat }}
              </vs-chip>
              <vs-chip class="mr-4">
                <vs-avatar icon="add_circle_outline" />
                {{ file.fechaEntrega | dateFormat }}
              </vs-chip>
              <vs-button
                size="small"
                type="border"
                color="#3ca2d6"
                title="Es un archivo externo"
                v-if="file.claseMercadoPublico === 'ext'"
                class="p-2 rounded-lg mr-4"
                disabled
              >
                <span class="text-black">externo</span>
              </vs-button>
              <vs-button
                size="small"
                type="border"
                color="#3ca2d6"
                title="Es un archivo interno"
                v-if="file.claseMercadoPublico === 'int'"
                class="p-2 rounded-lg mr-4"
                disabled
              >
                <span class="text-black">interno</span>
              </vs-button>
              <vs-button
                size="small"
                type="border"
                color="#3ca2d6"
                icon="description"
                title="Acompaña físico"
                v-if="file.transporteViaTransporteCodigoTransporte === 1"
                class="p-2 rounded-lg mr-4"
                disabled
              >
                <span class="text-black">acompaña físico</span>
              </vs-button>
              <vs-button
                size="small"
                type="border"
                color="danger"
                icon="lock"
                ttitle="Es un archivo privado"
                v-if="file.transportePuertoTipo === 1"
                class="p-2 rounded-lg mr-4"
                disabled
              />
            </vs-col>
          </vs-row>
        </vs-col>
        <vs-col vs-lg="1" vs-type="flex" vs-justify="center" vs-align="center">
          <vs-dropdown vs-custom-content vs-trigger-click>
            <a class="a-icon" href.prevent>
              <vs-icon
                icon="settings"
                size="medium"
                bg="#E4E4E4"
                round
                color="gray"
              />
            </a>
            <vs-dropdown-menu style="width: fit-content">
              <vs-dropdown-item
                v-if="file.estado === 3"
                v-on:click="openDraft(file)"
              >
                <vs-icon icon="query_builder"/>
                Continuar borrador
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="binnacleFileModal(file)">
                <vs-icon icon="list"/>
                Bitácora
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="getDetailsFile(file)">
                <vs-icon icon="search"/>
                Ver detalles
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="downloadFile(file)">
                <vs-icon icon="save_alt"/>
                Descargar acta
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="downloadAttatchments(file)">
                <vs-icon icon="save_alt"/>
                Descargar adjuntos
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="cancelFileModal(file)">
                <vs-icon icon="clear"/>
                Anular expediente
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="processFileModal(file)">
                <vs-icon icon="move_to_inbox"/>
                 Finalizar documento
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="getParticipants(file)">
                <vs-icon icon="groups"/>
                 Participantes
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="getComments(file)">
                <vs-icon icon="chat"/>
                 Comentarios
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="sendFile(file)">
                <vs-icon icon="chat"/>
                Enviar documento
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="ticketModalFile(file)">
                <vs-icon icon="help"/>
                Ticket de ayuda
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
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
      <vs-col vs-w="12" class="mt-4">
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
    openDraft(file) {
      // TODO: move this to another side, (why api doesn't save the full name? 😡😡)
      const types = {
        ext: 'externo'
      };

      this.$router.push(`/documentos/${types[file.claseMercadoPublico]}/${file.febosId}`);
    },
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
    }
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
