<template>
  <vs-popup
    style="overflow-y: hidden;"
    :title="`Detalles del Expediente ${file.numero}`"
    :active.sync="showModal"
    fullscreen
  >
    <div class="row">
      <div class="col-12" style="margin: 0 auto;">
        <div class="row">
          <div class="col-md-4 shadow">
            <vs-list>
              <vs-list-item
                icon="description"
                :title="file.emisorCentroCostoNombre || '-'" subtitle="Tipo de documento"
              />
              <vs-list-item
                icon="description"
                :title="file.emisorSucursalDireccion || '-'" subtitle="Documento"
              />
              <vs-list-item
                icon="description"
                :title="file.numeroInt || '-'" subtitle="Nº Documento"
              />
              <vs-list-item
                icon="date_range"
                :title="file.fechaEmision || '-'" subtitle="Fecha Documento"
              />
              <vs-list-item
                v-if="file.claseMercadoPublico === 'ext'"
                icon="description"
                title="Externo" subtitle="Tipo Expediente"
              />
              <vs-list-item
                v-if="file.claseMercadoPublico === 'int'"
                icon="description"
                title="Interno" subtitle="Tipo Expediente"
              />
              <vs-list-item
                v-if="file.transportePuertoTipo === '0'"
                icon="description"
                title="No"
                subtitle="Es privado"
              />
              <vs-list-item
                v-if="file.transportePuertoTipo === '1'"
                icon="description"
                title="Si"
                subtitle="Es privado"
              />
            </vs-list>
          </div>
          <div class="col-md-4 shadow">
            <vs-list>
              <vs-list-item
                icon="account_balance"
                :title="file.compradorArea || '-'" subtitle="Tipo institución"
              />
              <vs-list-item
                icon="account_balance"
                :title="file.emisorContactoArea || '-'" subtitle="Institución "
              />
              <vs-list-item
                icon="account_circle"
                :title="file.emisorContactoNombre || '-'" subtitle="Persona"
              />
              <vs-list-item
                icon="assignment_ind"
                :title="file.emisorContactoCargo || '-'" subtitle="Cargo persona"
              />
              <vs-list-item
                icon="assignment_ind"
                :title="file.emisorContactoEmail || '-'" subtitle="Correo persona"
              />
              <vs-list-item
                icon="subject"
                :title="file.transporteNotas || '-'"
                subtitle="Detalle"
              />
            </vs-list>
          </div>
          <div class="col-md-4 shadow">
            <vs-list>
              <vs-list-item
                v-if="file.transporteViaTransporteCodigoTransporte === '1'"
                icon="description"
                title="Si"
                subtitle="Acompaña físico"
              />
              <vs-list-item
                v-if="file.transporteViaTransporteCodigoTransporte === '0'"
                icon="description"
                title="No"
                subtitle="Acompaña físico"
              />
              <vs-list-item
                icon="subject"
                :title="detailsFile.observaciones
                     && detailsFile.observaciones[0].observacion"
                subtitle="Materia"
              />
              <vs-list-item
                v-if="detailsFile.observaciones && detailsFile.observaciones[1]"
                icon="subject"
                :title="detailsFile.observaciones
                     && detailsFile.observaciones[1].observacion"
                subtitle="Observaciones"
              />
              <div class="mt-3">
                <h5>Etiquetas</h5>
                <div v-for="tag in detailsFile.etiquetas" :key="tag.dnt_etiqueta_id">
                  <vs-chip>
                    {{tag.etiqueta}}
                  </vs-chip>
                </div>
              </div>
            </vs-list>
          </div>
        </div>
      </div>
      <vs-divider />
      <div class="col-md-6 mt-5 shadow" style="margin: 0 auto;">
        <div class="mt-5">
          <h5>
            Destinos / Copias
          </h5>
          <vs-table
            class="wrap-table-large"
            stripe
            :data="(detailsFile.destinatarios || [])"
            noDataText="No hay destinatarios"
          >
            <template slot="header">
            </template>
            <template slot="thead">
              <vs-th>
                Nombre
              </vs-th>
              <vs-th>
                Tipo
              </vs-th>
              <vs-th>
                Alcance
              </vs-th>
            </template>

            <template>
              <tbody>
              <vs-tr
                v-for="(subject, index) in (detailsFile.destinatarios || [])"
                :key="index"
              >
                <vs-td>
                  {{subject.destinoListaNombre}}
                </vs-td>
                <vs-td>
                  {{subject.destinoListaNombre}}
                </vs-td>
                <vs-td>
                  <vs-chip
                    color="primary"
                    v-if="subject.tipoDestino === '1'"
                  >
                    Destinatario
                  </vs-chip>
                  <vs-chip
                    color="#43C3B9"
                    v-if="subject.tipoDestino === '2'"
                  >
                    En copia
                  </vs-chip>
                </vs-td>
              </vs-tr>
              </tbody>
            </template>
          </vs-table>
          <!--<Timeline
            :timeline-items="fileCommentDetails.ejecucion.comentarios"
            message-when-no-items="No hay comentarios"/>-->
        </div>
      </div>
      <div class="col-md-6 mt-5 shadow" style="margin: 0 auto;">
        <div class=" mt-5">
          <h5>
            Archivos adjuntos
          </h5>
          <vs-table
            class="wrap-table"
            stripe
            :data="(detailsFile.adjuntos || [])"
            noDataText="No hay archivos adjuntos"
          >
            <template slot="header">
            </template>
            <template slot="thead">
              <vs-th>
                Nombre Adjunto
              </vs-th>
              <vs-th>
                Tipo
              </vs-th>
              <vs-th>
                Ver
              </vs-th>
            </template>
            <template>
              <tbody>
              <vs-tr
                v-for="attachment in detailsFile.adjuntos"
                :key="attachment.adjuntoId"
              >
                <vs-td>
                  {{ attachment.adjuntoNombre }}
                </vs-td>
                <vs-td>
                  {{attachment.tipo}}
                </vs-td>
                <vs-td>
                  <DownloadFile
                    :mood="'compact'"
                    v-if="attachment && attachment.adjuntoNombre && attachment.adjuntoUrl"
                    :path="attachment.adjuntoUrl"
                    :name="attachment.adjuntoNombre"
                    class="pill-info-attach"
                  />
                </vs-td>
              </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
        <div class=" mt-5 mb-5">
          <h5>
            Referencias
          </h5>
          <vs-table
            class="wrap-table"
            stripe
            :data="(detailsFile.referencias || [])"
            noDataText="No hay documentos relacionados"
          >
            <template slot="header">
            </template>
            <template slot="thead">
              <vs-th>
                Tipo Documento
              </vs-th>
              <vs-th>
                Número
              </vs-th>
            </template>

            <template>
              <tbody>
              <vs-tr v-if="file.transportePuertoCodigo">
                <vs-td>
                  Contrato SAFI
                </vs-td>
                <vs-td>
                  {{file.transportePuertoCodigo}}
                </vs-td>
              </vs-tr>
              <vs-tr
                v-for="reference in (detailsFile.referencias || [])"
                :key="reference.dntReferenciaId"
              >
                <vs-td>
                  {{reference.tipoDocumento}}
                </vs-td>
                <vs-td>
                  {{reference.folio}}
                </vs-td>
              </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </div>
    </div>
  </vs-popup>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import DownloadFile from '@/febos/chile/dnt/components/DownloadFile';

export default {
  name: 'PopUpDetailFile',
  components: { DownloadFile },
  props: {
    file: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      tags: []
    };
  },
  computed: {
    ...mapGetters('Dnts', [
      'loading',
      'error',
      'successAction',
      'detailsFile',
      'attachmentsFile',
      'fileCommentDetails'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'generalDetailsFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'downloadFilePDF'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ])
  }
};
</script>
<style scoped>

.pill-info-attach {
  border: 1px solid #3ca2d6;
  padding: 1px 5px;
  border-radius: 10px;
  font-size: 12px;
  margin-right: 5px;
  cursor:pointer;
}

.box-participants {
  max-height: 300px;
  overflow-y: scroll;
}
.vs-popup--content {
  overflow-x: hidden !important;
}
.vs-con-table .vs-con-tbody .vs-table--tbody-table .vs-table--thead th {
  padding: 10px 15px;
  background: #6f1788 !important;
  color: white !important;
}

.vs-list--item {
  border: none !important;
}
.vs-list--item:last-child {
  border: none !important;
}

.wrap-table {
  max-height: 200px;
  overflow-y: scroll;
}

.wrap-table-large {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
