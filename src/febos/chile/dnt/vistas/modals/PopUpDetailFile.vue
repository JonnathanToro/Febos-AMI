<template>
  <vs-popup title="Detalles del Expediente" :active.sync="showModal">
    <vs-tabs>
      <vs-tab label="Remitente">
        <vs-list>
          <vs-list-item
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
            icon="assignment_ind"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="file.emisorContactoCargo" subtitle="Cargo persona"
          />
        </vs-list>
      </vs-tab>
      <vs-tab label="Adjuntos">
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
      </vs-tab>
      <vs-tab label="Destinatarios">
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
      </vs-tab>
      <vs-tab label="Referencias">
        <vs-table stripe :data="(detailsFile.referencias || [])">
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
            <vs-tr
              v-for="reference in (detailsFile.referencias || [])" :key="reference.dntReferenciaId"
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
      </vs-tab>
    </vs-tabs>
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
        return this.modalName === 'detailsFile';
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
  height: 300px;
  overflow-y: scroll;
}
</style>
