<template>
  <div id="list-dnt">
    <FilesFilters
      :value="filters"
      :onChange="onChangeFilters"
      :clear="clearFilters"
    />
    <FilesHeader :on-pending-files="onPendingFiles" />
    <div class="force-render" :key="forceRender">
      <FileRow
        :key="file.febosId"
        v-for="file in files"
        :file="file"
        :on-pending-files="onPendingFiles"
        :on-general-files="onGeneralFiles"
        :select-file="selectFile"
      />
    </div>
    <PopUpBinnacleFile :titulo="'Bitácora del Expediente #'+selectedFile.numero"/>
    <PopUpTimelineFile :file="selectedFile"/>
    <PopUpDetailFile :file="selectedFile" />
    <PopUpGeneralDetailFile :file="selectedFile" />
    <PopUpCancelFile :canceledFile="selectedFile" />
    <PopUpProcessFile :processedFile="selectedFile" />
    <PopUpReturnFile :file="selectedFile" />
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
import PopUpGeneralDetailFile from '@/febos/chile/dnt/vistas/modals/PopUpGeneralDetailFile';
import PopUpProcessFile from '@/febos/chile/dnt/vistas/modals/PopUpProcessFile';
import PopUpReturnFile from '@/febos/chile/dnt/vistas/modals/PopUpReturnFile';
import PopUpAsignFile from '@/febos/chile/dnt/vistas/modals/PopUpAsignFile';
import PopUpTicketFile from '@/febos/chile/dnt/vistas/modals/PopUpTicketFile';
import PopUpSendFile from '@/febos/chile/dnt/vistas/modals/PopUpSendFile';
import PopUpParticipantsFile from '@/febos/chile/dnt/vistas/modals/PopUpParticipantsFile';
import PopUpCommentsFile from '@/febos/chile/dnt/vistas/modals/PopUpCommentsFile';
import FilesHeader from '@/febos/chile/dnt/components/files/FilesHeader';
import FileRow from '@/febos/chile/dnt/components/files/FileRow';
import PopUpTimelineFile from '@/febos/chile/dnt/vistas/modals/PopUpTimelineFile';
import PopUpBinnacleFile from '@/febos/chile/dnt/vistas/modals/PopUpBinnacleFile';
import FilesFilters from '@/febos/chile/dnt/components/files/FilesFilters';
import FilesPagination from '@/febos/chile/dnt/components/files/FilesPagination';
import { mergeFilters } from '@/febos/chile/dnt/utils/fitlers';
import { removeSearchParams, updateSearchParams } from '@/febos/global/utils/router';

export default {
  components: {
    FilesPagination,
    FilesFilters,
    PopUpBinnacleFile,
    PopUpTimelineFile,
    FileRow,
    FilesHeader,
    PopUpDetailFile,
    PopUpGeneralDetailFile,
    PopUpCancelFile,
    PopUpAsignFile,
    PopUpProcessFile,
    PopUpReturnFile,
    PopUpParticipantsFile,
    PopUpCommentsFile,
    PopUpTicketFile,
    PopUpSendFile
  },
  data() {
    const { view } = this.$route.params;

    return {
      onPendingFiles: view === 'en-curso',
      onGeneralFiles: view === 'general',
      fromCS: false,
      selectedFile: {},
      filters: '',
      page: Number.parseInt(this.$route.query.page || 1, 10),
      paginate: Number.parseInt(this.$route.query.paginate || 10, 10),
      forceRender: Date.now() // TODO: the files watch is triggered but the component not re-render.
    };
  },
  watch: {
    files() {
      this.forceRender = Date.now(); // TODO: remove this.
    },
    async page(page) {
      updateSearchParams({ page });
      await this.fetchDocuments();
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
    ...mapActions('Modals', [
      'closeModal'
    ]),
    selectFile(file) {
      this.selectedFile = file;
    },
    async onChangeFilters(filters, onMounted) {
      this.filters = filters;
      if (!onMounted) {
        if (this.page !== 1) {
          this.page = 1;
          // using else because this method has two responsibilities
        } else {
          // force fetch (if we change the page from 1 to 1 the watcher not run)
          await this.fetchDocuments();
        }
      }
    },
    clearFilters() {
      removeSearchParams(['filters']);
      // TODO: try to change to default filter state for current view.
      updateSearchParams({ page: 1 });
      this.$router.go();
    },
    async fetchDocuments() {
      await this.listDocuments({
        data: {
          tipo: 'EXP',
          campos: '*',
          pagina: this.page,
          orden: '-fechaCreacion',
          itemsPorPagina: this.paginate,
          filtros: mergeFilters(this.filters, this.$route.query.filters)
        },
        fromCS: this.fromCS
      });
      if (!this.fromCS) {
        this.fromCS = true;
      }
    }
  },
  created() {
    this.closeModal();
  },
  mounted() {
    this.fetchDocuments();
  }
};
</script>
