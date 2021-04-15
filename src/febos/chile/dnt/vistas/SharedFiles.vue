<template>
  <div id="list-dnt">
    <div v-if="!isVerified">
      <div class="row mb-3">
        <h5 class="m-auto">
          Por favor ingresa el código de verifiación enviado a tu correo
          para poder visualizar el expediente
        </h5>
        <div class="col-md-4">
        </div>
        <div class="col-md-4 mt-5">
          <vs-card>
            <form data-vv-scope="security">
              <vs-input
                class="w-100"
                label="Código de verificación"
                maxlength="10"
                name="securityPin"
                v-model="verificationInput"
                v-validate="'required'"
                :danger="errors.has('security.verificationInput')"
                :danger-text="errors.first('security.verificationInput')"
              />
              <div class="text-center">
                <vs-button
                  color="warning"
                  class="mt-4"
                  @click="verifyFile"
                >
                  Verificar
                </vs-button>
              </div>
            </form>
          </vs-card>
        </div>
        <div class="col-md-4">
        </div>
      </div>
    </div>
    <div v-if="sharedFile.dnt">
      <div class="row">
        <div class="col-2">
        </div>
        <div class="col-8 bg-white mb-5">
          <div class="text-center">
            <img
              :src="logo"
              alt="logo"
              class=" cursor-pointer logo-ed"
            />
          </div>
          <h5 class="mt-3" style="color:#7a008d;">
            Este expediente
            <span v-if="sharedFile.dnt.claseMercadoPublico === 'int'">
              interno
            </span>
            <span v-if="sharedFile.dnt.claseMercadoPublico === 'ext'">
              externo
            </span>
            <span v-if="sharedFile.dnt.claseMercadoPublico === 'numInt'">
              de numeración interna
            </span>
            <span v-if="sharedFile.dnt.claseMercadoPublico === 'numOf'">
              de numeración oficial
            </span>
             ha sido creado por {{ sharedFile.dnt.solicitanteNombre }}
            <small>{{ sharedFile.dnt.solicitanteEmail }}</small>,
            perteneciente a la unidad {{sharedFile.dnt.solicitanteGrupoNombre}}
          </h5>
          <div class="py-2">
            - Te han compartido el documento {{ sharedFile.dnt.emisorCentroCostoNombre }}
            <span v-if="sharedFile.dnt.emisorSucursalDireccion">
              {{ sharedFile.dnt.emisorSucursalDireccion }}
            </span>
            <span v-if="sharedFile.dnt.numeroInt">
              número {{ sharedFile.dnt.numeroInt }}
            </span>
            <span v-if="sharedFile.dnt.fechaEmision">
              con fecha {{ sharedFile.dnt.fechaEmision }}
            </span>
            <span class="py-2" v-if="sharedFile.dnt.condicionDespacho.toString() === '0'">
            de formato papel
          </span>
            <span class="py-2" v-if="sharedFile.dnt.condicionDespacho.toString() === '1'">
            de formato electrónico
          </span>
          </div>

          <div class="py-2" v-if="sharedFile.dnt.compradorArea">
            De origen: {{ sharedFile.dnt.compradorArea }}
            <span v-if="sharedFile.dnt.emisorContactoArea">
              - {{ sharedFile.dnt.emisorContactoArea }}
            </span>
          </div>
          <div class="py-2" v-if="sharedFile.dnt.emisorContactoNombre">
            - Persona Remitente: {{ sharedFile.dnt.emisorContactoNombre }}
            <span v-if="sharedFile.dnt.emisorContactoEmail">
              {{sharedFile.dnt.emisorContactoEmail}}
            </span>
            <span class="py-2" v-if="sharedFile.dnt.emisorContactoCargo">
              con el cargo de {{ sharedFile.dnt.emisorContactoCargo }}
            </span>
          </div>

          <div class="py-2" v-if="sharedFile.dnt.transporteNotas">
            - Detalle: {{ sharedFile.dnt.transporteNotas }}
          </div>
          <div
            class="py-2"
            v-if="sharedFile.dnt.transporteViaTransporteCodigoTransporte.toString() === '0'"
          >
            - No acompaña material físico
          </div>
          <div
            class="py-2"
            v-if="sharedFile.dnt.transporteViaTransporteCodigoTransporte.toString() === '1'"
          >
            - Acompaña material físico
          </div>
          <div v-if="sharedFile.observaciones[0]">
            - Observaciones: {{ sharedFile.observaciones[0].observacion }}
          </div>
          <div v-if="sharedFile.observaciones[1]">
            - Materia: {{ sharedFile.observaciones[1].observacion }}
          </div>
          <div class="row">
            <div class="col-12">
              <div class="mt-5 mb-5">
                <h5>Etiquetas</h5>
                <div v-for="tag in sharedFile.etiquetas" :key="tag.dnt_etiqueta_id">
                  <vs-chip >
                    {{tag.etiqueta}}
                  </vs-chip>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 mb-5">
            <h5>
              Destinos / Copias
            </h5>
            <vs-table
              class="wrap-table-large"
              stripe
              :data="(sharedFile.destinatarios || [])"
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
                  v-for="(subject, index) in (sharedFile.destinatarios || [])"
                  :key="index"
                >
                  <vs-td>
                    {{subject.destinoListaNombre}}
                    <small v-if="externalSubject.includes(subject.destinoCodigo)">
                      {{subject.destinoCorreo}}
                    </small>
                  </vs-td>
                  <vs-td>
                    {{subject.destinoNombre}}
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      color="primary"
                      v-if="subject.tipoDestino.toString() === '1'"
                    >
                      Destinatario
                    </vs-chip>
                    <vs-chip
                      color="#43C3B9"
                      v-if="subject.tipoDestino.toString() === '2'"
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
          <hr>
          <div class=" mt-5 mb-5">
            <h5>
              Referencias
            </h5>
            <vs-table
              class="wrap-table"
              stripe
              :data="(sharedFile.referencias || [])"
              noDataText="No hay otros documentos relacionados"
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
                <vs-tr v-if="sharedFile.dnt.transportePuertoCodigo">
                  <vs-td>
                    Contrato SAFI
                  </vs-td>
                  <vs-td>
                    {{sharedFile.dnt.transportePuertoCodigo}}
                  </vs-td>
                </vs-tr>
                <vs-tr
                  v-for="reference in (sharedFile.referencias || [])"
                  :key="reference.dntReferenciaId"
                >
                  <vs-td>
                    {{ findTypeDocument(reference.tipoDocumento) }}
                  </vs-td>
                  <vs-td>
                    {{reference.folio}}
                  </vs-td>
                </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
          <hr>
          <div class=" mt-5 mb-5">
            <h5>
              Archivos adjuntos
            </h5>
            <vs-table
              class="wrap-table"
              stripe
              :data="(sharedFile.adjuntos || [])"
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
                  v-for="attachment in sharedFile.adjuntos"
                  :key="attachment.adjuntoId"
                >
                  <vs-td>
                    {{ attachment.nombre }}
                  </vs-td>
                  <vs-td>
                    {{attachment.tipo}}
                  </vs-td>
                  <vs-td>
                    <DownloadFile
                      :mood="'compact'"
                      v-if="attachment && attachment.nombre && attachment.url"
                      :path="attachment.url"
                      :name="attachment.nombre"
                      class="pill-info-attach"
                    />
                  </vs-td>
                </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
        </div>
        <div class="col-2">
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';
import DownloadFile from '@/febos/chile/dnt/components/DownloadFile';

export default {
  components: { DownloadFile },
  mixins: [FindTypeDocumentMixin],
  data() {
    const { view } = this.$route.params;
    return {
      logo: require('../../../../assets/images/ed-logo.png'),
      verificationInput: '',
      isVerified: false,
      view,
      externalSubject: [
        'empresas',
        'personas',
        'ministerios'
      ]
    };
  },
  watch: {
    loading(value) {
      if (!value) {
        this.$vs.loading.close('#list-dnt > .con-vs-loading');
        return;
      }

      this.$vs.loading({
        container: '#list-dnt',
        scale: 0.6
      });
    },
    successAction() {
      this.$vs.notify({
        title: 'Genial!',
        text: 'Acción realizada exitosamente',
        color: 'success',
        time: 3000,
        position: 'top-center'
      });
    },
    error(error) {
      if (error !== '') {
        this.$vs.notify({
          title: 'Oops!',
          text: error,
          color: 'danger',
          time: 10000,
          position: 'top-center'
        });
        this.clearErrorMessage();
      }
    }
  },
  computed: {
    ...mapGetters('Dnts', [
      'loading',
      'error',
      'successAction',
      'files'
    ]),
    ...mapGetters('Usuario', [
      'verificationCode',
      'sharedFile'
    ])
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments',
      'clearErrorMessage',
      'selectFileState'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    ...mapActions('Usuario', [
      'ioGetFileCodeVerification',
      'verifySharedFile'
    ]),
    verifyFile() {
      this.isVerified = true;
      this.verifySharedFile({
        id: this.verificationCode,
        codigo: this.verificationInput
      });
    }
  },
  created() {
    const { id } = this.$route.params;
    const { idSubject } = this.$route.params;
    this.ioGetFileCodeVerification(
      {
        tipo: 'expediente_externo',
        febosId: id,
        destinoId: idSubject
      }
    );
  }
};
</script>
<style>
.logo-ed {
  width: 400px;
  height: auto;
}
</style>
