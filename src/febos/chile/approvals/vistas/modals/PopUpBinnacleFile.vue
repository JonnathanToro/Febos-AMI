<template>
  <vs-popup
    :title="titulo"
    :active.sync="showModal"
    v-if="binnacleFile"
    @close="closeModal"
  >
    <div>
      <app-timeline>
        <app-timeline-item v-for="binnacle in binnacleFile" :key="binnacle.bitacoraId"
          icon="InfoIcon"
          :variant="getSeveridadBitacoraVariant(binnacle.severidad)"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>{{binnacle.usuarioNombre}}</h6>
            <small class="text-muted">{{binnacle.fecha | dateCompleteFormat}}</small>
          </div>
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <p>{{binnacle.mensaje}}</p>
            <!-- 1st Col -->
            <div class="mb-1 mb-sm-0">
              <div>
                <b-avatar v-if="binnacle.tipoVista == -1 || binnacle.tipoVista == 0"
                          v-b-tooltip.hover title="Registro Visible solo para Admin"
                          text="O"
                          class="mr-50"
                          size="24"
                          icon="eye-slash-fill"
                          variant="secondary"
                />
                <b-avatar
                  v-has-permission="'FEB99'"
                  v-b-tooltip.hover
                  title="Copiar Seguimiento"
                  text="S"
                  class="mr-50 add-code"
                  size="24"
                  icon="bug"
                  variant="success"
                  @click.native="copyToClipboard(binnacle.seguimientoId)"
                />
              </div>
            </div>
          </div>
        </app-timeline-item>
      </app-timeline>
    </div>
  </vs-popup>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { BAvatar } from 'bootstrap-vue';

import AppTimeline from '@core/components/app-timeline/AppTimeline';
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem';

export default {
  props: {
    titulo: {
      type: String,
      required: false
    }
  },
  components: {
    AppTimeline, AppTimelineItem, BAvatar
  },
  computed: {
    ...mapGetters('Approvals', [
      'binnacleFile'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'binnacle';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Modals', [
      'closeModal'
    ]),
    getSeveridadBitacoraVariant(severidad) {
      switch (severidad) {
        case 1: return 'info';
        case 2: return 'warning';
        case 3: return 'danger';
        default: return 'secondary';
      }
    },
    copyToClipboard(code) {
      const element = document.createElement('input');
      element.value = code;
      document.body.appendChild(element);
      element.select();
      document.execCommand('copy');
      document.body.removeChild(element);
    }
  },
};

</script>
<style>
.wrap-binnacle {
  height: 400px;
  overflow-y: scroll;
}

.add-code {
  cursor: copy;
}
.crazy-zindex {
  z-index: 10001;
}
</style>
