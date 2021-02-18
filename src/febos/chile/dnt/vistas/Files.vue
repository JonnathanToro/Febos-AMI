<template>
  <div id="list-dnt">
    <FilesFilters
      v-model="filters"
    />
    <FilesHeader />
    <FileRow
      :key="file.febosId"
      v-for="file in files"
      :file="file"
      :on-pending-files="onPendingFiles"
      :select-file="selectFile"
    />
    <PopUpBinnacleFile />
    <PopUpDetailFile :file="selectedFile" />
    <PopUpCancelFile :canceledFile="selectedFile" />
    <PopUpProcessFile :processedFile="selectedFile" />
    <PopUpAsignFile :file="selectedFile" />
    <PopUpParticipantsFile :file="selectedFile" />
    <PopUpCommentsFile :file="selectedFile" />
    <PopUpTicketFile :file="selectedFile" />
    <PopUpSendFile :file="selectedFile" />
    <FilesPagination
      :show="files.length"
      v-model="page"
    />
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import PopUpCancelFile from '@/febos/chile/dnt/vistas/modals/PopUpCancelFile';
import PopUpDetailFile from '@/febos/chile/dnt/vistas/modals/PopUpDetailFile';
import PopUpProcessFile from '@/febos/chile/dnt/vistas/modals/PopUpProcessFile';
import PopUpAsignFile from '@/febos/chile/dnt/vistas/modals/PopUpAsignFile';
import PopUpTicketFile from '@/febos/chile/dnt/vistas/modals/PopUpTicketFile';
import PopUpSendFile from '@/febos/chile/dnt/vistas/modals/PopUpSendFile';
import PopUpParticipantsFile from '@/febos/chile/dnt/vistas/modals/PopUpParticipantsFile';
import PopUpCommentsFile from '@/febos/chile/dnt/vistas/modals/PopUpCommentsFile';
import FilesHeader from '@/febos/chile/dnt/components/files/FilesHeader';
import FileRow from '@/febos/chile/dnt/components/files/FileRow';
import PopUpBinnacleFile from '@/febos/chile/dnt/vistas/modals/PopUpBinnacleFile';
import FilesFilters from '@/febos/chile/dnt/components/files/FilesFilters';
import FilesPagination from '@/febos/chile/dnt/components/files/FilesPagination';

export default {
  components: {
    FilesPagination,
    FilesFilters,
    PopUpBinnacleFile,
    FileRow,
    FilesHeader,
    PopUpDetailFile,
    PopUpCancelFile,
    PopUpAsignFile,
    PopUpProcessFile,
    PopUpParticipantsFile,
    PopUpCommentsFile,
    PopUpTicketFile,
    PopUpSendFile
  },
  data() {
    const view = this.$route.params.vista;

    return {
      onPendingFiles: view === 'en-curso',
      fromCS: false,
      selectedFile: {},
      filters: '',
      page: Number.parseInt(this.$route.query.page || 1, 10),
      paginate: Number.parseInt(this.$route.query.paginate || 10, 10)
    };
  },
  watch: {
    filters(newValue) {
      this.listDocuments({
        data: {
          tipo: 'EXP',
          campos: '*',
          pagina: 1,
          orden: '-fechaCreacion',
          itemsPorPagina: this.paginate,
          filtros: newValue
        },
        fromCS: this.fromCS
      });

      if (!this.fromCS) {
        this.fromCS = true;
      }
    },
    page(newValue) {
      this.listDocuments({
        data: {
          tipo: 'EXP',
          campos: '*',
          pagina: newValue,
          orden: '-fechaCreacion',
          itemsPorPagina: this.paginate,
          filtros: this.filters
        },
        fromCS: this.fromCS
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
    successAction() {
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
        this.clearErrorMessage();
      }
    }
  },
  computed: {
    ...mapGetters('Dnts', [
      'loading',
      'error',
      'successAction',
      'files'
    ]),
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments',
      'clearErrorMessage'
    ]),
    selectFile(file) {
      this.selectedFile = file;
    }
  }
};
</script>
