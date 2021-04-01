<template>
  <div id="list-dnt">
    <FilesFilters
      v-model="filters"
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
    <PopUpReferencesFile :file="selectedFile"/>
    <PopUpDetailFile :file="selectedFile" />
    <PopUpGeneralDetailFile :file="selectedFile" />
    <PopUpCancelFile :canceledFile="selectedFile" />
    <PopUpProcessFile :processedFile="selectedFile" />
    <PopUpReturnFile :file="selectedFile" />
    <PopUpAsignFile :file="selectedFile" />
    <PopUpAnswerFile :file="selectedFile" />
    <PopUpParticipantsFile :file="selectedFile" />
    <PopUpCommentsFile :file="selectedFile" />
    <PopUpTicketFile :file="selectedFile" />
    <PopUpSendFile :file="selectedFile" />
    <PopUpActivityFile :file="selectedFile" />
    <PopUpActivityTimelineFile :file="selectedFile" />
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
import PopUpReferencesFile from '@/febos/chile/dnt/vistas/modals/PopUpReferencesFile';
import PopUpGeneralDetailFile from '@/febos/chile/dnt/vistas/modals/PopUpGeneralDetailFile';
import PopUpProcessFile from '@/febos/chile/dnt/vistas/modals/PopUpProcessFile';
import PopUpReturnFile from '@/febos/chile/dnt/vistas/modals/PopUpReturnFile';
import PopUpAsignFile from '@/febos/chile/dnt/vistas/modals/PopUpAsignFile';
import PopUpAnswerFile from '@/febos/chile/dnt/vistas/modals/PopUpAnswerFile';
import PopUpTicketFile from '@/febos/chile/dnt/vistas/modals/PopUpTicketFile';
import PopUpSendFile from '@/febos/chile/dnt/vistas/modals/PopUpSendFile';
import PopUpActivityFile from '@/febos/chile/dnt/vistas/modals/PopUpActivityFile';
import PopUpActivityTimelineFile from '@/febos/chile/dnt/vistas/modals/PopUpActivityTimelineFile';
import PopUpParticipantsFile from '@/febos/chile/dnt/vistas/modals/PopUpParticipantsFile';
import PopUpCommentsFile from '@/febos/chile/dnt/vistas/modals/PopUpCommentsFile';
import FilesHeader from '@/febos/chile/dnt/components/files/FilesHeader';
import FileRow from '@/febos/chile/dnt/components/files/FileRow';
import PopUpTimelineFile from '@/febos/chile/dnt/vistas/modals/PopUpTimelineFile';
import PopUpBinnacleFile from '@/febos/chile/dnt/vistas/modals/PopUpBinnacleFile';
import FilesFilters from '@/febos/chile/dnt/components/files/FilesFilters';
import FilesPagination from '@/febos/chile/dnt/components/files/FilesPagination';

export default {
  components: {
    FilesPagination,
    FilesFilters,
    PopUpBinnacleFile,
    PopUpAnswerFile,
    PopUpReferencesFile,
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
    PopUpSendFile,
    PopUpActivityFile,
    PopUpActivityTimelineFile
  },
  data() {
    const { view } = this.$route.params;

    return {
      onPendingFiles: view === 'pendientes',
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
    ])
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments',
      'clearErrorMessage',
      'selectFileState'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    selectFile(file) {
      this.selectedFile = file;
      this.selectFileState(file.febosId);
    }
  },
  created() {
    this.closeModal();
    this.selectFileState('');
  }
};
</script>
