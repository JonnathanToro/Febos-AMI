<template>
  <vs-row
    class="p-3 mt-2 bg-white shadow-sm"
  >
    <vs-col vs-lg="11">
      <vs-row>
        <vs-col class="text-center text-primary" vs-lg="1">
          <div>
            # <br>
          </div>
          <div>
            {{ file.numero }}
          </div>
        </vs-col>
        <vs-col vs-lg="2">
          <vs-chip
            v-if="file.estado.toString() === FileStates.DISMISSED"
            title="Desestimado"
          >
            <vs-avatar icon="mail_outline" color="#4e94e0" />
            Desestimado
          </vs-chip>
          <vs-chip
            title="Preparado"
            v-if="file.estado.toString() === FileStates.PREPARED"
          >
            <vs-avatar icon="query_builder" color="#4e94e0" />
            Preparado
          </vs-chip>
          <vs-chip
            title="Iniciado"
            v-if="file.estado.toString() === FileStates.INITIATED"
          >
            <vs-avatar icon="access_time" color="#43C3B9" />
            Iniciado
          </vs-chip>
          <vs-chip
            title="Aprobado"
            v-if="file.estado.toString() === FileStates.APPROVED"
          >
            <vs-avatar icon="thumb_up" color="#28c76f" />
            Aprobado
          </vs-chip>
          <vs-chip
            title="Rechazado"
            v-if="file.estado.toString() === FileStates.REJECTED"
          >
            <vs-avatar icon="thumb_down" color="#ea5455" />
            Rechazado
          </vs-chip>
          <vs-chip
            title="Anulado"
            v-if="file.estado.toString() === FileStates.CANCELED"
          >
            <vs-avatar icon="move_to_inbox" color="#ea5455" />
            Anulado
          </vs-chip>
        </vs-col>
        <vs-col vs-lg="9">
          <vs-row>
            <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
              {{findTypeDocument(file.numeroInt) | capitalize }}
              <span>
                 <b># {{file.numeroExt}}</b>
              </span>
            </vs-col>
            <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
              {{ file.solicitanteNombre | capitalize }}
            </vs-col>
            <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
              {{ file.receptorContactoNombre }}
              <small
                class="d-block text-success"
                v-if="file.estado === FileStates.APPROVED"
              >
                Aprobó
              </small>
              <small
                class="d-block text-danger"
                v-if="file.estado === FileStates.REJECTED"
              >
                Rechazó
              </small>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-offset="3" vs-lg="7" vs-type="flex">
          <vs-chip class="mr-4" v-tooltip="'Fecha inicio del proceso'">
            <vs-avatar icon="date_range" />
            {{ file.fechaEntrega | dateFormat }}
          </vs-chip>
          <vs-chip class="mr-4" v-tooltip="'Fecha término del proceso'">
            <vs-avatar icon="event" />
            {{ file.fechaRevicion | dateFormat }}
          </vs-chip>
          <vs-chip
            color="primary"
            transparent
            v-if="file.plazo"
            v-tooltip="'Tiempo transcurrido'"
          >
            <vs-avatar icon="access_time"/>
            {{ translateTime(file.plazo, true) }}
          </vs-chip>
          <vs-chip
            color="success"
            transparent
            v-if="file.emisorInfoAdicional"
            v-tooltip="'Unidad'"
          >
            <vs-avatar icon="group"/>
            {{ file.emisorInfoAdicional }}
          </vs-chip>
          <vs-chip
            v-tooltip="'archivo privado'"
            v-if="file.privado === 'Y'"
            color="warning" transparent
          >
            <vs-avatar icon="lock" />
            privado
          </vs-chip>
          <vs-chip
            v-if="file.oficinaNombre"
            v-tooltip="'Oficina'"
          >
            <vs-avatar icon="approval" />
            {{file.oficinaNombre}}
          </vs-chip>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-col vs-lg="1" vs-type="flex" vs-justify="center" vs-align="center">
      <FileOptions
        :file="file"
        :select-file="selectFile"
      />
    </vs-col>
  </vs-row>
</template>

<script>

import FileOptions from '@/febos/chile/approvals/components/approvalFiles/FileOptions';
import FileStates from '@/febos/chile/approvals/mixins/FileStates';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  components: { FileOptions },
  mixins: [FileStates, FindTypeDocumentMixin],
  props: [
    'file',
    'selectFile'
  ],
  data() {
    return {
      FileStates
    };
  },
  computed: {

  },
  methods: {
    translateTime: (time, abr) => { // ASCO
      const seconds = time * 60;
      const numdays = Math.floor(seconds / 86400);
      const numhours = Math.floor((seconds % 86400) / 3600);
      const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
      if (numdays !== 0) {
        if (abr) {
          return `${numdays } d ${ numhours } hrs ${ numminutes } min `;
        }
        return `${numdays } dias ${ numhours } horas ${ numminutes } minutos `;
      }
      if (numdays === 0 && numhours !== 0) {
        if (abr) {
          return `${numhours } hrs ${ numminutes } min `;
        }
        return `${numhours } horas ${ numminutes } minutos `;
      }
      if (numdays === 0 && numhours === 0 && numminutes !== 0) {
        if (abr) {
          return `${numminutes } min `;
        }
        return `${numminutes } minutos `;
      }
      if (numminutes === 0) {
        if (abr) {
          return `${numminutes } min`;
        }
        return `${numminutes } minutos`;
      }
      return numminutes;
    } // END ASCO, o no?
  }
};

</script>
