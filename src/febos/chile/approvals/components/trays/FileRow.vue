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
          {{ file.nombreAprobacion }}
        </vs-col>
        <vs-col vs-lg="2">
          {{ file.autor }}
        </vs-col>
        <vs-col vs-lg="2">
          {{ file.pasoEjecucion.aprobacionesPasoEstadoId }}
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

import FileOptions from '@/febos/chile/dnt/components/files/FileOptions';
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
