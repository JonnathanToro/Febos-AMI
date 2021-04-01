<template>
  <vs-row class="p-3 mt-2 bg-white shadow-sm">
    <vs-col vs-lg="11">
      <vs-row>
        <vs-col class="text-center text-primary" vs-lg="3">
          <div>
            {{ findTypeDocument(file.tipoDocumento, true) }} #
            {{file.folio}}
          </div>
          <div>
            <small>
              Expediente # {{file.numero}}
            </small>
          </div>
        </vs-col>
        <vs-col vs-lg="2">
          {{ file.nombre }}
        </vs-col>
        <vs-col vs-lg="2">
          {{ file.autor }}
        </vs-col>
        <vs-col vs-lg="2">
          <vs-chip
            v-if="file.pasoEjecucion.aprobacionesPasoEstadoId.toString()
             === ApprovalProcessStates.PROCESSING"
            title="Procesando"
          >
            <vs-avatar icon="mail_outline" color="#43C3B9" />
            Procesando
          </vs-chip>
          <vs-chip
            title="Pendiente"
            v-if="file.pasoEjecucion.aprobacionesPasoEstadoId.toString()
             === ApprovalProcessStates.PENDING"
          >
            <vs-avatar icon="query_builder" color="#43C3B9" />
            Pendiente
          </vs-chip>
          <vs-chip
            title="Aprobado"
            v-if="file.pasoEjecucion.aprobacionesPasoEstadoId.toString()
             === ApprovalProcessStates.APPROVED"
          >
            <vs-avatar icon="query_builder" color="#28c76f" />
            Aprobado
          </vs-chip>
          <vs-chip
            title="Rechazado"
            v-if="file.pasoEjecucion.aprobacionesPasoEstadoId.toString()
             === ApprovalProcessStates.REJECTED"
          >
            <vs-avatar icon="query_builder" color="#ea5455" />
            Rechazado
          </vs-chip>
          <vs-chip
            title="Reenviado"
            v-if="file.pasoEjecucion.aprobacionesPasoEstadoId.toString()
             === ApprovalProcessStates.FORWARDED"
          >
            <vs-avatar icon="query_builder" color="#4e94e0" />
            Reenviado
          </vs-chip>
          <vs-chip
            title="Retornado"
            v-if="file.pasoEjecucion.aprobacionesPasoEstadoId.toString()
             === ApprovalProcessStates.RETURNED"
          >
            <vs-avatar icon="query_builder" color="#4e94e0" />
            Retornado
          </vs-chip>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-offset="3" vs-lg="7" vs-type="flex">
          <!--<vs-chip class="mr-4" v-tooltip="'Fecha inicio del proceso'">
            <vs-avatar icon="date_range" />
            un chip
          </vs-chip>-->
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

import FileOptions from '@/febos/chile/approvals/components/trays/FileOptions';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';
import ApprovalProcessStates from '@/febos/chile/approvals/mixins/ApprovalProcessStates';

export default {
  components: { FileOptions },
  mixins: [ApprovalProcessStates, FindTypeDocumentMixin],
  props: [
    'file',
    'selectFile'
  ],
  data() {
    return {
      ApprovalProcessStates
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
