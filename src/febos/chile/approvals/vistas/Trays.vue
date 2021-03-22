<template>
  <div id="list-dnt">
    <!--<FilesFilters
      v-model="filters"
    />-->
    <FilesHeader />
    <div class="force-render" :key="forceRender">
      <FileRow
        :key="file.aprobacionId"
        v-for="file in trays"
        :file="file"
        :select-file="selectFile"
      />
    </div>
    <FilesPagination
      :show="trays.length"
      v-model="page"
    />
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import FilesHeader from '@/febos/chile/approvals/components/trays/FilesHeader';
import FileRow from '@/febos/chile/approvals/components/trays/FileRow';
// import FilesFilters from '@/febos/chile/approvals/components/trays/FilesFilters';
import FilesPagination from '@/febos/chile/approvals/components/trays/FilesPagination';

export default {
  components: {
    FilesPagination,
    // FilesFilters,
    FileRow,
    FilesHeader
  },
  mixin: [],
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
    trays() {
      this.forceRender = Date.now(); // TODO: remove this.
    },
    filters() {
      const view = this.$route.params.vista;
      this.listTrays({
        data: {
          filtros: '', // newValue
          tipoBandeja: view.toUpperCase(),
          pagina: 1,
          elementosPorPagina: 10
        }
      });
    },
    page(newValue) {
      const view = this.$route.params.vista;
      this.listTrays({
        data: {
          filtros: '',
          tipoBandeja: view.toUpperCase(),
          pagina: newValue,
          elementosPorPagina: 10
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
      'trays'
    ]),

  },
  methods: {
    ...mapActions('Approvals', [
      'listTrays',
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
    const view = this.$route.params.vista;
    console.log('TRAYS', this.trays);
    this.listTrays({
      data: {
        filtros: '', // newValue
        tipoBandeja: view.toUpperCase(),
        pagina: 1,
        elementosPorPagina: 10
      }
    });
  }
};
</script>
