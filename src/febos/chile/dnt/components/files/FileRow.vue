<template>
  <vs-row
    :class="{ selected: file.febosId == selectedFile }"
    class="p-3 mt-2 shadow-sm"
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
            v-if="file.estado === '1'"
            title="creado"
          >
            <vs-avatar icon="mail_outline" color="#43C3B9" />
            Creado
          </vs-chip>
          <vs-chip
            title="Borrador"
            v-if="file.estado === '3'"
          >
            <vs-avatar icon="query_builder" color="#87579e" />
            Borrador
          </vs-chip>
          <vs-chip
            title="Tramitado"
            v-if="file.estado === '10'"
          >
            <vs-avatar icon="thumb_up" color="#14AA59" />
            Tramitado
          </vs-chip>
          <vs-chip
            title="Rechazado"
            v-if="file.estado === '5'"
          >
            <vs-avatar icon="thumb_down" color="#CE4B4B" />
            Rechazado
          </vs-chip>
          <vs-chip
            title="Anulado"
            v-if="file.estado === '8'"
          >
            <vs-avatar icon="close" color="#A04E4E" />
            Anulado
          </vs-chip>
          <vs-chip
            title="Finalizado"
            v-if="file.estado === '9'"
          >
            <vs-avatar icon="move_to_inbox" color="#A04E4E" />
            Finalizado
          </vs-chip>
        </vs-col>
        <vs-col vs-lg="9">
          <vs-row>
            <vs-col vs-lg="3" vs-sm="3" vs-xs="12">
              <b>{{file.compradorArea | capitalize }}</b>
              <div v-tooltip="'Remitente'">
                {{ file.emisorContactoNombre | capitalize }}
              </div>
            </vs-col>
            <vs-col vs-lg="3" vs-sm="3" vs-xs="12">
              {{ file.solicitanteGrupoNombre }}
              <small
                v-if="file.solicitanteNombre"
                class="d-block"
                v-tooltip="`${file.solicitanteNombre}`"
              >
                {{ file.solicitanteNombre | truncate(20) }}
              </small>
            </vs-col>
            <vs-col vs-lg="3" vs-sm="3" vs-xs="12" v-if="onPendingFiles">
              {{ file.derivadoPor }}
            </vs-col>
            <vs-col vs-lg="3" vs-sm="3" vs-xs="12">
              {{ file.nombreDescriptivo }}
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-offset="1" vs-lg="11" vs-type="flex" class="pt-2 border-top">
          <vs-chip class="mr-4" v-tooltip="'Fecha de Actualización'">
            <vs-avatar icon="date_range" />
            {{ file.fechaActualizacion | dateFormat }}
          </vs-chip>
          <vs-chip class="mr-4" v-tooltip="'Fecha del documento'">
            <vs-avatar icon="event" color="#ff9f43"/>
            {{ file.fechaEmision | dateFormat }}
          </vs-chip>
          <vs-chip
            class="mr-3"
            v-tooltip="'Número de documento'"
            v-if="file.numeroInt"
          >
            <vs-avatar icon="description" color="#ff9f43" />
            {{file.numeroInt}}
          </vs-chip>
          <vs-chip
            class="mr-3"
            v-if="file.emisorSucursalDireccion || file.emisorCentroCostoNombre "
          >
            <vs-avatar icon="description" color="#ff9f43" />
            <span
              v-tooltip="`${file.emisorSucursalDireccion}`"
              v-if="file.emisorSucursalDireccion"
            >
              {{file.emisorSucursalDireccion | truncate(20)}}
            </span>
            <span
              v-tooltip="`${file.emisorCentroCostoNombre}`"
              v-if="!file.emisorSucursalDireccion"
            >
              {{(file.emisorCentroCostoNombre ||'')| truncate(20)}}
            </span>
          </vs-chip>
          <vs-chip
            class="mr-3"
            v-tooltip="'Documento en flujo'"
            v-if="file.tieneAprobacionActiva === 'Y'"
            color="#43C3B9" transparent
          >
            en flujo
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'Documento externo'"
            v-if="file.claseMercadoPublico === 'ext'"
            color="primary" transparent
          >
            externo
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'Documento interno'"
            v-if="file.claseMercadoPublico === 'int'"
            color="primary" transparent
          >
            interno
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'Numeración Interna'"
            v-if="file.claseMercadoPublico === 'numInt'"
            transparent color="primary"
          >
            num. interna
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'Numeración Oficina de Partes'"
            v-if="file.claseMercadoPublico === 'numOf'"
            color="primary" transparent
          >
            num. oficial
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'Estoy en copia'"
            v-if="file.enCopia === 'SI'"
            color="success" transparent
          >
            copia
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'Soy destinatario/responsable'"
            v-if="file.enResponsable === 'SI' && onGeneralFiles"
            color="danger" transparent
          >
            responsable
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'Estoy en grupo'"
            v-if="file.enGrupo === 'SI'"
            color="danger" transparent
          >
            en grupo
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'Acompaña físico'"
            v-if="file.transporteViaTransporteCodigoTransporte === '1'"
            color="#343a40" transparent
          >
            <vs-avatar icon="description" />
            físico
          </vs-chip>
          <vs-chip class="mr-3"
            v-tooltip="'archivo privado'"
            v-if="file.transportePuertoTipo == '1'"
            color="warning" transparent
          >
            <vs-avatar icon="lock" />
            privado
          </vs-chip>
          <vs-chip class="mr-3"
           v-tooltip="'archivo público'"
           v-if="file.transportePuertoTipo == '0'"
           color="warning" transparent
          >
            <vs-avatar icon="lock" />
            público
          </vs-chip>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-col vs-lg="1" vs-type="flex" vs-justify="center" vs-align="center">
      <FileOptions
        :file="file"
        :is-draft="isDraft"
        :is-assigned="isAssigned"
        :is-processed="isProcessed"
        :is-cancelled="isCancelled"
        :is-responsible="isResponsible"
        :on-pending-files="onPendingFiles"
        :on-general-files="onGeneralFiles"
        :is-intern-file="isInternFile"
        :select-file="selectFile"
      />
    </vs-col>
  </vs-row>
</template>

<script>

import { mapGetters } from 'vuex';

import FileOptions from '@/febos/chile/dnt/components/files/FileOptions';

export default {
  components: { FileOptions },
  props: [
    'file',
    'onPendingFiles',
    'onGeneralFiles',
    'selectFile'
  ],
  computed: {
    ...mapGetters('Dnts', [
      'selectedFile'
    ]),
    isDraft() {
      return this.file.estado === '3';
    },
    isAssigned() {
      return this.file.enGrupo === 'NO';
    },
    isResponsible() {
      return this.file.enResponsable === 'SI';
    },
    isProcessed() {
      return this.file.estado === '9';
    },
    isCancelled() {
      return this.file.estado === '8';
    },
    isInternFile() {
      return this.file.claseMercadoPublico === 'numInt'
        || this.file.claseMercadoPublico === 'numOf';
    }
  }
};

</script>
<style>
.selected {
  background: #8e4aa01c !important;
}
</style>
