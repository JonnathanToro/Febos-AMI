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
            title="Aprobado"
            v-if="file.estado === '4'"
          >
            <vs-avatar icon="thumb_up" color="#14AA59" />
            Aprobado
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
              {{file.compradorArea | capitalize }}
            </vs-col>
            <vs-col vs-lg="3" vs-sm="3" vs-xs="12">
              {{ file.emisorContactoNombre | capitalize }}
              <small
                class="d-block" v-if="file.emisorContactoEmail"
                v-tooltip="`${file.emisorContactoEmail}`"
              >
                {{ file.emisorContactoEmail | truncate(20) }}
              </small>
            </vs-col>
            <vs-col vs-lg="3" vs-sm="3" vs-xs="12">
              {{ file.solicitanteNombre }}
              <small class="d-block" v-tooltip="`${file.solicitanteEmail}`">
                {{ file.solicitanteEmail | truncate(20) }}
              </small>
            </vs-col>
            <vs-col vs-lg="3" vs-sm="3" vs-xs="12" v-if="onPendingFiles">
              {{ file.derivadoPor }}
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-offset="2" vs-lg="8" vs-type="flex">
          <vs-chip class="mr-3" v-tooltip="'Número de documento'">
            <vs-avatar icon="description" />
            {{file.numeroInt}}
          </vs-chip>
          <vs-chip class="mr-3">
            <vs-avatar icon="description" />
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
              {{file.emisorCentroCostoNombre | truncate(20)}}
            </span>
          </vs-chip>
          <vs-chip v-tooltip="'Fecha de documento'" class="mr-3">
            <vs-avatar icon="event" />
            {{ file.fechaEmision | dateFormat }}
          </vs-chip>
          <vs-chip v-tooltip="'Fecha de Actualización'" class="mr-3">
            <vs-avatar icon="date_range" />
            {{ file.fechaActualizacion | dateFormat }}
          </vs-chip>
          <vs-button
            v-tooltip="'Documento externo'"
            size="small"
            type="border"
            color="#3ca2d6"
            v-if="file.claseMercadoPublico === 'ext'"
            class="p-2 rounded-lg mr-4"
            disabled
          >
            <span class="text-black">externo</span>
          </vs-button>
          <vs-button
            v-tooltip="'Documento interno'"
            size="small"
            type="border"
            color="#3ca2d6"
            title="Es un archivo interno"
            v-if="file.claseMercadoPublico === 'int'"
            class="p-2 rounded-lg mr-4"
            disabled
          >
            <span class="text-black">interno</span>
          </vs-button>
          <vs-button
            v-tooltip="'Estoy en copia'"
            size="small"
            type="border"
            color="#3ca2d6"
            v-if="file.enCopia === 'SI'"
            class="p-2 rounded-lg mr-4"
            disabled
          >
            <span class="text-black">en copia</span>
          </vs-button>
          <vs-button
            v-tooltip="'Estoy en grupo'"
            size="small"
            type="border"
            color="#3ca2d6"
            v-if="file.enGrupo === 'SI'"
            class="p-2 rounded-lg mr-4"
            disabled
          >
            <span class="text-black">en grupo</span>
          </vs-button>
          <vs-button
            v-tooltip="'Soy destinatario/responsable'"
            size="small"
            type="border"
            color="#3ca2d6"
            v-if="file.enResponsable === 'SI'"
            class="p-2 rounded-lg mr-4"
            disabled
          >
            <span class="text-black">responsable</span>
          </vs-button>
          <vs-button
            v-tooltip="'Acompaña físico'"
            size="small"
            type="border"
            color="#3ca2d6"
            icon="description"
            v-if="file.transporteViaTransporteCodigoTransporte === 1"
            class="p-2 rounded-lg mr-4"
            disabled
          >
            <span class="text-black">acompaña físico</span>
          </vs-button>
          <vs-button
            v-tooltip="'archivo privado'"
            size="small"
            type="border"
            color="danger"
            icon="lock"
            v-if="file.transportePuertoTipo === 1"
            class="p-2 rounded-lg mr-4"
            disabled
          />
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
        :is-resposible="isResposible"
        :on-pending-files="onPendingFiles"
        :on-general-files="onGeneralFiles"
        :select-file="selectFile"
      />
    </vs-col>
  </vs-row>
</template>

<script>

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
    isDraft() {
      return this.file.estado === '3';
    },
    isAssigned() {
      return this.file.enGrupo === 'NO';
    },
    isResposible() {
      return this.file.enResponsable === 'SI';
    },
    isProcessed() {
      return this.file.estado === '9';
    },
    isCancelled() {
      return this.file.estado === '8';
    }
  },

};

</script>
