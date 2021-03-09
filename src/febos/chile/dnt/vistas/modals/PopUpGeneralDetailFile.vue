<template>
  <vs-popup
    style="overflow-y: hidden;"
    title="Detalles del Expediente"
    :active.sync="showModal"
  >
    <div class="row">
      <div class="col-md-12">
        <h5>
          Detalles Remitente
        </h5>
      </div>
      <div class="col-md-12 mt-2">
        <vs-list>
          <vs-list-item
            v-if="file.emisorCentroCostoNombre"
            icon="description"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="file.emisorCentroCostoNombre" subtitle="Tipo de documento"
          />
          <vs-list-item
            v-if="file.emisorSucursalDireccion"
            icon="description"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="file.emisorSucursalDireccion" subtitle="Documento"
          />
          <vs-list-item
            v-if="file.compradorArea"
            icon="account_balance"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="file.compradorArea" subtitle="Tipo institución"
          />
          <vs-list-item
            v-if="file.emisorContactoArea"
            icon="account_balance"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="file.emisorContactoArea" subtitle="Institución "
          />
          <vs-list-item
            v-if="file.emisorContactoNombre"
            icon="account_circle"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="file.emisorContactoNombre" subtitle="Persona"
          />
          <vs-list-item
            v-if="file.emisorContactoCargo"
            icon="assignment_ind"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="file.emisorContactoCargo" subtitle="Cargo persona"
          />
          <vs-list-item
            v-if="file.emisorContactoEmail"
            icon="assignment_ind"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="file.emisorContactoEmail" subtitle="Correo persona"
          />
        </vs-list>
      </div>
      <div class="col-md-12 mt-2" v-if="detailsFile && detailsFile.length">
        <h5>
          Archivos adjuntos
        </h5>
        <div>
          <vs-list>
            <div
              v-for="attachment in detailsFile.adjuntos"
              :key="attachment.adjuntoId"
            >
              <vs-list-item
                icon="attach_file"
                style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
                :title="attachment.adjuntoNombre" :subtitle="attachment.tipo">
                <DownloadFile
                  v-if="attachment && attachment.adjuntoNombre && attachment.adjuntoUrl"
                  :path="attachment.adjuntoUrl"
                  :name="attachment.adjuntoNombre"
                  class="pill-info-attach"
                />
              </vs-list-item>
            </div>
          </vs-list>
        </div>
      </div>
      <div
        class="col-md-12 mt-2"
        v-if="detailsFile.destinatarios && detailsFile.destinatarios.length"
      >
        <h5>
          Destinos / Copias
        </h5>
        <vs-list class="box-participants">
          <div
            v-for="(subject, index) in (detailsFile.destinatarios || [])"
            :key="index"
          >
            <vs-list-item
              v-if="subject.tipoDestino === '1'"
              icon="contact_mail"
              style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
              :title="subject.destinoListaNombre" :subtitle="subject.destinoNombre">
              <!--<div v-for="(doc, index) in comment.documentos" :key="index" class="pill-info">
                <DownloadFile :path="doc.adjuntoUrl" :name="doc.nombre"/>
              </div>-->
              <vs-chip color="primary" v-if="subject.tipoDestino === '1'">
                Destinatario
              </vs-chip>
            </vs-list-item>
            <vs-list-item
              v-if="subject.tipoDestino === '2'"
              icon="supervised_user_circle"
              style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
              :title="subject.destinoListaNombre" :subtitle="subject.destinoNombre">
              <!--<div v-for="(doc, index) in comment.documentos" :key="index" class="pill-info">
                <DownloadFile :path="doc.adjuntoUrl" :name="doc.nombre"/>
              </div>-->
              <vs-chip color="#43C3B9" v-if="subject.tipoDestino === '2'">
                En copia
              </vs-chip>
            </vs-list-item>
          </div>
        </vs-list>
        <!--<Timeline
          :timeline-items="fileCommentDetails.ejecucion.comentarios"
          message-when-no-items="No hay comentarios"/>-->
      </div>
      <div class="col-md-12 mt-2">
        <h5>
          Referencias
        </h5>
        <vs-table
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
    return {};
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
  },
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
</style>
