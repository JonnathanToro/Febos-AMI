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
    <vs-tooltip text="Desplegar acciones">
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
          <CheckPermission permission="ED027">
            <vs-dropdown-item
              v-on:click="onTicketFile(file)"
              v-if="!isDraft"
            >
              <vs-icon icon="help"/>
              Ticket de ayuda
            </vs-dropdown-item>
          </CheckPermission>
        </vs-dropdown-menu>
      </vs-dropdown>
      <span />
    </vs-tooltip>
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
    'isResposible',
    'selectFile'
  ],
  computed: {
    ...mapGetters('Empresas', [
      'company'
    ]),
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
      'getFileTimeline'
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
    onTicketFile(file) {
      this.selectFile(file);
      this.showModals('ticketFile');
    }
  }
};

</script>
