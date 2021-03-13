<template>
  <vs-popup
    :title="`Timeline del Expediente ${file.numero}`"
    :active.sync="showModal"
    @close="closeModal"
  >
    <vs-collapse
      v-for="(node, index) in timelineFile" :key="index"
    >
      <vs-collapse-item open>
        <div slot="header">
          {{node.usuarioEnvioNombre}} - <small>{{node.fechaCreacion | dateFormatTime}}</small>
        </div>
        <vs-list>
          <vs-list-item
            class="wrap-item"
            v-for="(subject, index) in node.destinatarios"
            :key="index"
            :icon="getIcon(subject)"
            :title="subject.destinoListaNombre" :subtitle="subject.comentario"
          >
            <span
              title="Activo"
              class="active-subject"
              v-if="subject.estado === 1"
            >
              <vs-icon
                style="padding: 4px;"
                icon="radio_button_checked"
                color="green"
                round
                bg="#92de9266" />
            </span>
            <span
              title="Inactivo"
              v-if="subject.estado === 2"
            >
              <vs-icon
                style="padding: 4px;"
                icon="radio_button_unchecked"
                color="orange"
                round
                bg="#ffb1004f"
              />
            </span>
            <vs-chip
              transparent
              color="primary"
              v-if="subject.tipoDestino === 1"
            >
              Destino
            </vs-chip>
            <vs-chip
              transparent
              color="#43C3B9"
              v-if="subject.tipoDestino === 2"
            >
              Copia
            </vs-chip>
            <vs-chip>
              {{subject.destinoNombre}}
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
    ]),
    getIcon(subject) {
      if (subject.estado === 1) {
        return 'assignment_ind';
      }
      return 'assignment_late';
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

.wrap-item {
  border-left: 3px solid rebeccapurple;
}

.con-content--item {
  padding: 0 !important;
}

.vs-collapse-item--header {
  padding: 4px !important;
}
</style>
