<template>
  <vs-popup
    title="Bitácora del Expediente"
    :active.sync="showModal"
    v-if="binnacleFile"
    @close="closeModal"
  >
    <div>
      <app-timeline>
        <app-timeline-item v-for="binnacle in binnacleFile" :key="binnacle.bitacoraId"
          icon="InfoIcon"
          variant="info"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>{{binnacle.usuarioNombre}}</h6>
            <small class="text-muted">{{binnacle.fecha | dateCompleteFormat}}</small>
          </div>
          <p>{{binnacle.mensaje}}</p>
          <div class="d-flex flex-sm-row flex-column justify-content-between align-items-start">
            <!-- 1st Col -->
            <div class="mb-1 mb-sm-0">
              <span class="text-muted mb-50">Developers</span>
              <div>
                <b-avatar
                  text="A"
                  class="mr-50"
                  size="24"
                  variant="light-primary"
                />
                <b-avatar
                  text="B"
                  class="mr-50"
                  size="24"
                  variant="light-success"
                />
                <b-avatar
                  text="C"
                  class="mr-50"
                  size="24"
                  variant="light-danger"
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
import { BAvatar, BBadge} from 'bootstrap-vue';
import { mapActions, mapGetters } from 'vuex';
import AppTimeline from '@core/components/app-timeline/AppTimeline';
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  components: { CheckPermission, AppTimeline, AppTimelineItem, BAvatar, BBadge },
  computed: {
    ...mapGetters('Dnts', [
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
    copyToClipboard(code) {
      const element = document.createElement('input');
      element.value = code;
      document.body.appendChild(element);
      element.select();
      document.execCommand('copy');
      document.body.removeChild(element);
    }
  }
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
</style>
