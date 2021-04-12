<template>
  <div class="d-flex justify-content-center">
    <CheckPermission permission="ED018">
      <div
        class="mr-1"
        style="cursor: pointer;"
        v-on:click="onOptionGetGeneralDetailsFile(file)">
        <vs-icon
          icon="find_in_page"
          size="medium"
          bg="#E4E4E4"
          round
          color="gray"
        />
      </div>
    </CheckPermission>
    <div v-tooltip="'Desplegar acciones'">
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
          <CheckPermission permission="ED016">
            <vs-dropdown-item
              v-if="isDraft"
              v-on:click="openDraft()"
            >
              <vs-icon icon="query_builder"/>
              Continuar borrador
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED017">
            <vs-dropdown-item
              v-if="!isShared"
              v-on:click="onOptionBinnacleFile(file)"
            >
              <vs-icon icon="list"/>
              Bitácora
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED018">
            <vs-dropdown-item
              v-if="!isShared"
              v-on:click="onOptionTimelineFile(file)"
            >
              <vs-icon icon="all_inbox"/>
              Proceso Destinos
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED018">
            <vs-dropdown-item
              v-if="!isShared"
              v-on:click="onOptionTimelineActivities(file)"
            >
              <vs-icon icon="assignment_turned_in"/>
              Proceso Actividades
            </vs-dropdown-item>
          </CheckPermission>
          <vs-dropdown-item
            v-if="!isShared"
            v-on:click="onOptionReferencesFile(file)"
          >
            <vs-icon icon="device_hub"/>
            Ver Referencias
          </vs-dropdown-item>
          <CheckPermission permission="ED019">
            <vs-dropdown-item v-on:click="onOptionDownloadFile(file)">
              <vs-icon icon="save_alt"/>
              Descargar informe
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED020">
            <vs-dropdown-item v-on:click="onOptionDownloadAttachments(file)">
              <vs-icon icon="save_alt"/>
              Descargar expediente
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED021">
            <vs-dropdown-item
              v-on:click="onOptionAssignFile(file)"
              v-if="!isDraft  && onPendingFiles && !isAssigned
              && !isProcessed && !isCancelled && !isShared"
            >
              <vs-icon icon="how_to_reg"/>
              Asignarme expediente
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED039">
            <vs-dropdown-item
              v-on:click="onAnswerFile(file)"
              v-if="!isDraft  && onPendingFiles && isAssigned
            && !isProcessed && !isCancelled && !isShared"
            >
              <vs-icon icon="storage"/>
              Responder
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED040">
            <vs-dropdown-item
              v-on:click="onOptionReturnFile(file)"
              v-if="!isDraft  && onPendingFiles && isAssigned
              && !isProcessed && !isCancelled && !isShared"
            >
              <vs-icon icon="keyboard_backspace"/>
              Devolver expediente
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED022">
            <vs-dropdown-item
              v-on:click="onOptionCancelFile(file)"
              v-if="!isDraft  && onPendingFiles && isAssigned
             && isResponsible && !isProcessed && !isCancelled && !isShared"
            >
              <vs-icon icon="clear"/>
              Anular expediente
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED023">
            <vs-dropdown-item
              v-on:click="onOptionProcessFile(file)"
              v-if="!isDraft  && (onGeneralFiles || onPendingFiles)
            && isAssigned && !isProcessed && !isCancelled && !isShared"
            >
              <vs-icon icon="move_to_inbox"/>
              Finalizar documento
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED024">
            <vs-dropdown-item
              v-if="!isShared"
              v-on:click="onOptionGetParticipants(file)"
            >
              <vs-icon icon="group"/>
              Participantes
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED025">
            <vs-dropdown-item
              v-on:click="onOptionGetComments(file)"
              v-if="!isDraft  && onPendingFiles && isAssigned
             && isResponsible && !isProcessed && !isCancelled && !isShared"
            >
              <vs-icon icon="chat"/>
              Comentarios
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED026">
            <vs-dropdown-item
              v-on:click="onOptionSendFile(file)"
              v-if="!isDraft && onPendingFiles && isAssigned
             && isResponsible && !isProcessed && !isCancelled && !isShared"
            >
              <vs-icon icon="chat"/>
              Enviar documento
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED041">
            <vs-dropdown-item
              v-on:click="onUpdateActivity(file)"
              v-if="!isDraft  && onPendingFiles && isAssigned
             && isResponsible && !isProcessed && !isCancelled && !isShared"
            >
              <vs-icon icon="how_to_vote"/>
              Act. Actividad
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED027">
            <vs-dropdown-item
              v-on:click="onTicketFile(file)"
              v-if="!isDraft && !isShared"
            >
              <vs-icon icon="help"/>
              Ticket de ayuda
            </vs-dropdown-item>
          </CheckPermission>
        </vs-dropdown-menu>
      </vs-dropdown>
      <span />
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  components: { CheckPermission },
  props: [
    'file',
    'onPendingFiles',
    'onGeneralFiles',
    'isDraft',
    'isAssigned',
    'isProcessed',
    'isCancelled',
    'isResponsible',
    'selectFile',
    'isShared'
  ],
  computed: {
    ...mapGetters('Empresas', [
      'company'
    ]),
    ...mapGetters('Usuario', [
      'currentUserId'
    ])
  },
  methods: {
    ...mapActions('Modals', [
      'showModals'
    ]),
    ...mapActions('Dnts', [
      'getFileDnt',
      'downloadFilePDF',
      'attemptCancelFile',
      'getFileBinnacle',
      'sendTicketHelp',
      'downloadAttachmentFiles',
      'getFileDetails',
      'getFileComments',
      'getAttachmentsDnt',
      'getFileTimeline',
      'getActivitiesFile',
      'answerCreateFile',
      'searchReferences'
    ]),
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany'
    ]),
    openDraft() {
      // TODO: move this to another side, (why api doesn't save the full name? 😡😡)
      const types = {
        ext: 'externo',
        int: 'interno',
        numInt: 'numInt',
        numOf: 'numOf'
      };

      this.$router.push(`/documentos/${types[this.file.claseMercadoPublico]}/${this.file.febosId}`);
    },
    onOptionAssignFile(file) {
      this.selectFile(file);
      this.showModals('asignFile');
    },
    onAnswerFile(file) {
      this.selectFile(file);
      // this.$router.push(`/documentos/interno/${this.file.febosId}`);
      this.showModals('answerFile');
    },
    onOptionGetDetailsFile(file) {
      this.selectFile(file);
      this.getFileDnt({
        febosId: file.febosId,
        destinatarios: 'si',
        referencias: 'si',
        adjuntos: 'si'
      });
      this.showModals('detailsFile');
    },
    async onOptionGetGeneralDetailsFile(file) {
      this.selectFile(file);
      await this.getFileDnt({
        febosId: file.febosId,
        dnt: 'si',
        destinatarios: 'si',
        etiquetas: 'si',
        referencias: 'si',
        adjuntos: 'si'
      });
      this.showModals('generalDetailsFile');
    },
    onOptionTimelineFile(file) {
      this.selectFile(file);
      this.getFileTimeline(file.febosId);
      this.showModals('timeline');
    },
    onOptionBinnacleFile(file) {
      this.selectFile(file);
      this.getFileBinnacle({
        febosId: file.febosId,
        filas: 200,
        pagina: 1
      });
      this.showModals('binnacle');
    },
    onOptionReferencesFile(file) {
      this.selectFile(file);
      this.searchReferences(file.febosId);
      this.showModals('references');
    },
    onOptionDownloadFile(file) {
      this.downloadFilePDF({
        febosId: file.febosId,
        imagen: 'si',
        regenerar: 'si',
        tipoImagen: 0
      });
    },
    onOptionDownloadAttachments(file) {
      this.downloadAttachmentFiles({
        febosId: file.febosId,
        comprimir: 'si'
      });
    },
    onOptionCancelFile(file) {
      this.selectFile(file);
      this.showModals('cancelFile');
    },
    onOptionProcessFile(file) {
      this.selectFile(file);
      this.showModals('processFile');
    },
    onOptionReturnFile(file) {
      this.selectFile(file);
      this.showModals('returnFile');
    },
    onOptionGetParticipants(file) {
      this.selectFile(file);
      this.getFileDnt({
        febosId: file.febosId,
        destinatarios: 'si'
      });
      this.showModals('participantsFile');
    },
    onOptionGetComments(file) {
      this.selectFile(file);
      this.getFileComments({
        febosId: file.febosId
      });
      this.showModals('commentsFile');
    },
    onOptionSendFile(file) {
      this.getUsersCompany({
        empresaId: this.company.id,
        pagina: 1,
        filas: 9999,
        buscarInfoExtra: 'si',
        filtroInfoExtra: 'CARGO'
      });
      this.getGroupsCompany({
        empresaId: this.company.id
      });
      this.selectFile(file);
      this.showModals('sendFile');
    },
    onOptionTimelineActivities(file) {
      this.selectFile(file);
      const payload = {
        historico: 'si',
        febosId: file.febosId
      };
      this.getActivitiesFile({ payload, historico: true });
      this.showModals('activitiesTimelineFile');
    },
    onUpdateActivity(file) {
      this.selectFile(file);
      const payload = {
        filtros: `usuarioId:${this.currentUserId}`,
        febosId: file.febosId
      };
      this.getActivitiesFile({ payload, historico: false });
      this.showModals('activitiesFile');
    },
    onTicketFile(file) {
      this.selectFile(file);
      this.showModals('ticketFile');
    }
  }
};

</script>
