<template>
  <vs-modal ref="errorModal" style="z-index: 100000" @close="onModalClose()">
    <div slot="header" class="p-3">
      <h1 class="h4 text-center">¡Chanfle! Algo pasó...</h1>
    </div>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <vs-chip class="h5">
              <vs-avatar size="30px" color="rgb(234,84,85)" icon="sentiment_dissatisfied" />
              Error: <b class="ml-1">{{apiError.codigo}}</b>
            </vs-chip>
          </div>
          <div class="col-12 my-4">
            <vs-list>
              <vs-list-header
                style="cursor: pointer;"
                title="ID de seguimiento"
                @click="copyToClipboard"
              />
              <vs-list-item
                style="cursor: pointer;"
                @click.native="copyToClipboard"
                icon="content_copy"
                :title="apiError.seguimientoId"
                subtitle="Click para copiar automáticamente"
              />
              <vs-list-header :title="apiError.mensaje" />
              <vs-list-item
                icon="error_outline"
                v-for="(error, index) in apiError.errores"
                :key="index"
                :title="error"
              />
            </vs-list>
          </div>
        </div>
      </div>
      <input
        type="text"
        class="d-none"
        ref="toClipboard"
        :value="apiError.seguimientoId"
      />
      <div class="row justify-content-end">
        <div class="col-auto">
          <vs-button type="border" class="" @click="clearError">Cerrar</vs-button>
        </div>
      </div>
    </div>
  </vs-modal>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import VsModal from 'vs-modal';

export default {
  components: {
    VsModal
  },
  computed: {
    ...mapGetters([
      'apiError'
    ])
  },
  watch: {
    apiError(newValue) {
      if (Object.keys(newValue).length) {
        this.$refs.errorModal.open();
      }
    }
  },
  created() {
    this.setApiError({});
  },
  methods: {
    ...mapActions([
      'setApiError'
    ]),
    onModalClose() {
      this.setApiError({});
    },
    clearError() {
      this.$refs.errorModal.close();
    },
    copyToClipboard() {
      this.$refs.toClipboard.select();
      document.execCommand('copy');
    }
  }
};

</script>
