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
          <CheckPermission permission="ED017">
            <vs-dropdown-item v-on:click="onOptionBinnacleFile(file)">
              <vs-icon icon="list"/>
              Bitácora
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED019">
            <vs-dropdown-item v-on:click="onOptionDownloadFile(file)">
              <vs-icon icon="save_alt"/>
              Descargar Acta
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED020">
            <vs-dropdown-item v-on:click="onOptionDownloadAttachments(file)">
              <vs-icon icon="save_alt"/>
              Descargar adjuntos
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED022">
            <vs-dropdown-item v-on:click="onOptionCancelFile(file)">
              <vs-icon icon="clear"/>
              Anular expediente
            </vs-dropdown-item>
          </CheckPermission>
          <CheckPermission permission="ED025">
            <vs-dropdown-item v-on:click="onOptionGetComments(file)">
              <vs-icon icon="chat"/>
              Comentarios
            </vs-dropdown-item>
          </CheckPermission>
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
    'isDraft',
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
    ...mapActions('Approvals', [
      'getFileDnt',
      'downloadFilePDF',
      'attemptCancelFile',
      'getFileBinnacle',
      'sendTicketHelp',
      'downloadAttachmentFiles',
      'getFileDetails',
      'getFileComments',
      'getAttachmentsDnt',
      'getApprovalFileDetails'
    ]),
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany'
    ]),
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
      this.getApprovalFileDetails({
        aprobacionId: file.solicitanteDocumentoId,
        ejecucionId: file.febosId,
        retornarPdf: 'si'
      });
    },
    onOptionDownloadAttachments(file) {
      this.downloadAttachmentFiles({
        febosId: file.febosId,
        retornarComoZip: 'Y'
      });
    },
    onOptionCancelFile(file) {
      this.selectFile(file);
      this.showModals('cancelFile');
    },
    onOptionGetComments(file) {
      this.selectFile(file);
      this.getFileComments({
        febosId: file.febosId
      });
      this.showModals('commentsFile');
    },
    onTicketFile(file) {
      this.selectFile(file);
      this.showModals('ticketFile');
    }
  }
};

</script>
