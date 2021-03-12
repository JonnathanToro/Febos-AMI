<template>
  <vs-popup
    :title="`Timeline del Expediente ${file.numero}`"
    :active.sync="showModal"
    @close="closeModal"
  >
    <vs-collapse v-for="(node, index) in timelineFile" :key="index">
      <vs-collapse-item>
        <div slot="header">
          {{node.fechaCreacion | dateFormatTime}} - {{node.usuarioEnvioNombre}}
        </div>
        <vs-list>
          <vs-list-item
            class="wrap-item"
            v-for="(subject, index) in node.destinatarios"
            :key="index"
            icon="inbox"
            :title="subject.destinoListaNombre" :subtitle="subject.destinoNombre"
          >
            <vs-chip
              transparent
              color="success"
              v-if="subject.estado === 1"
            >
             Activo
            </vs-chip>
            <vs-chip
              transparent
              color="warning"
              v-if="subject.estado === 2"
            >
              Inactivo
            </vs-chip>
            <vs-chip
              transparent
              color="primary"
              v-if="subject.tipoDestino === 1"
            >
              Destino
            </vs-chip>
            <vs-chip
              color="#43C3B9"
              v-if="subject.tipoDestino === 2"
            >
              Copia
            </vs-chip>
          </vs-list-item>
        </vs-list>
      </vs-collapse-item>
    </vs-collapse>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    file: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('Dnts', [
      'timelineFile'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'timeline';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Modals', [
      'closeModal'
    ])
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

.wrap-item {
  border-left: 3px solid rebeccapurple;
}
</style>
