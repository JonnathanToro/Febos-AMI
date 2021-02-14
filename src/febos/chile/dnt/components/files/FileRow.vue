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
            <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
              {{file.compradorArea | capitalize }}
            </vs-col>
            <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
              {{ file.emisorContactoNombre | capitalize }}
            </vs-col>
            <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
              {{ file.solicitanteNombre }}
              <small class="d-block">{{ file.solicitanteEmail }}</small>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-offset="3" vs-lg="7" vs-type="flex">
          <vs-tooltip text="Fecha de Actualización">
            <vs-chip class="mr-4">
              <vs-avatar icon="date_range" />
              {{ file.fechaActualizacion | dateFormat }}
            </vs-chip>
            <span />
          </vs-tooltip>
          <vs-tooltip text="Fecha del documento">
            <vs-chip class="mr-4">
              <vs-avatar icon="event" />
              {{ file.fechaEmision | dateFormat }}
            </vs-chip>
            <span />
          </vs-tooltip>
          <vs-tooltip text="Documento externo">
            <vs-button
              size="small"
              type="border"
              color="#3ca2d6"
              v-if="file.claseMercadoPublico === 'ext'"
              class="p-2 rounded-lg mr-4"
              disabled
            >
              <span class="text-black">externo</span>
            </vs-button>
            <span />
          </vs-tooltip>
          <vs-tooltip text="Documento interno">
            <vs-button
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
            <span />
          </vs-tooltip>
          <vs-tooltip text="Estoy en copia">
            <vs-button
              size="small"
              type="border"
              color="#3ca2d6"
              v-if="file.enCopia === 'SI'"
              class="p-2 rounded-lg mr-4"
              disabled
            >
              <span class="text-black">en copia</span>
            </vs-button>
            <span />
          </vs-tooltip>
          <vs-tooltip text="Soy destinatario/responsable">
            <vs-button
              size="small"
              type="border"
              color="#3ca2d6"
              v-if="file.enCopia === 'NO'"
              class="p-2 rounded-lg mr-4"
              disabled
            >
              <span class="text-black">destinatario</span>
            </vs-button>
            <span />
          </vs-tooltip>
          <vs-tooltip text="Acompaña físico">
            <vs-button
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
            <span />
          </vs-tooltip>
          <vs-tooltip text="archivo privado">
            <vs-button
              size="small"
              type="border"
              color="danger"
              icon="lock"
              v-if="file.transportePuertoTipo === 1"
              class="p-2 rounded-lg mr-4"
              disabled
            />
            <span />
          </vs-tooltip>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-col vs-lg="1" vs-type="flex" vs-justify="center" vs-align="center">
      <FileOptions
        :file="file"
        :is-draft="isDraft"
        :is-assigned="isAssigned"
        :on-pending-files="onPendingFiles"
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
    'selectFile'
  ],
  computed: {
    isDraft() {
      return this.file.estado === '3';
    },
    isAssigned() {
      return this.file.enGrupo === 'NO';
    },
  }
};

</script>
