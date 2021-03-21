<template>
  <div id="list-dnt">
    <ApprovalFilters
      v-model="filters"
    />
    <FilesHeader />
    <div class="force-render" :key="forceRender">
      <FileRow
        :key="file.febosId"
        v-for="file in files"
        :file="file"
        :select-file="selectFile"
      />
    </div>
    <FilesPagination
      :show="files.length"
      v-model="page"
    />
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import FilesHeader from '@/febos/chile/approvals/components/approvalFiles/FilesHeader';
import FileRow from '@/febos/chile/approvals/components/approvalFiles/FileRow';
import ApprovalFilters from '@/febos/chile/approvals/components/ApprovalFilesFilters';
import FilesPagination from '@/febos/chile/approvals/components/approvalFiles/FilesPagination';

export default {
  components: {
    FilesPagination,
    ApprovalFilters,
    FileRow,
    FilesHeader
  },
  data() {
    return {
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
          tipo: 'aprobaciones',
          campos: '*',
          pagina: 1,
          orden: '-fechaCreacion',
          itemsPorPagina: this.paginate,
          filtros: newValue
        }
      });
    },
    page(newValue) {
      this.listDocuments({
        data: {
          tipo: 'aprobaciones',
          campos: '*',
          pagina: newValue,
          orden: '-fechaCreacion',
          itemsPorPagina: this.paginate,
          filtros: this.filters
        }
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
    ...mapGetters('Approvals', [
      'loading',
      'error',
      'successAction',
      'files'
    ])
  },
  methods: {
    ...mapActions('Approvals', [
      'listDocuments',
      'clearErrorMessage'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    selectFile(file) {
      this.selectedFile = file;
    }
  },
  created() {
    this.closeModal();
  }
};
</script>
