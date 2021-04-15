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
              alt="user-img"
              width="240"
              height="50"
              class="shadow-md cursor-pointer block"
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
            - Documento: {{ sharedFile.dnt.emisorCentroCostoNombre }}
            <span v-if="sharedFile.dnt.emisorSucursalDireccion">
              {{ sharedFile.dnt.emisorSucursalDireccion }}
            </span>
            <span v-if="sharedFile.dnt.numeroInt">
              número {{ sharedFile.dnt.numeroInt }}
            </span>
            <span v-if="sharedFile.dnt.fechaEmision">
              con fecha {{ sharedFile.dnt.fechaEmision }}
            </span>
          </div>

          <div class="py-2" v-if="sharedFile.dnt.condicionDespacho === '0'">
            de formato papel
          </div>
          <div class="py-2" v-if="sharedFile.dnt.condicionDespacho === '1'">
            de formato electrónico
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
          <div class="py-2" v-if="sharedFile.dnt.transporteViaTransporteCodigoTransporte === 0">
            - Acompaña físico: acompaña la wea 0
          </div>
          <div class="py-2" v-if="sharedFile.dnt.transporteViaTransporteCodigoTransporte === 1">
            - Acompaña físico: acompaña la wea 1
          </div>
          <!--<div v-if="sharedFile.observaciones[0]">
            - Observaciones: {{ sharedFile.observaciones[0] }}
          </div>
          <div v-if="sharedFile.observaciones[1]">
            - Materia: {{ sharedFile.observaciones[1] }}
          </div>-->
          <hr>
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
                      v-if="adjunto && adjunto.nombre && adjunto.url"
                      :path="adjunto.url"
                      :name="adjunto.nombre"
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
      logo: require('../../../../assets/images/escritorio_digital_horizontal.jpg'),
      verificationInput: '',
      // isVerified: false,
      isVerified: true,
      view,
      externalSubject: [
        'empresas',
        'personas',
        'ministerios'
      ],
      sharedFile: {
        dnt: {
          febosId: '20cd4d2a25510241a12b43720561f3692c0e',
          tipo: 'EXP',
          numero: '141',
          estado: 1,
          emisorContactoCargo: 'Cloud Developer',
          solicitanteNombre: 'Letty real',
          solicitanteRut: '26066368-2',
          solicitanteEmail: 'letty@febos.cl',
          solicitanteDocumentoId: '83703bf0-c9c5-4b8f-b5de-e556651dbf6c',
          compradorCodigo: '37b266aa15b3614511191b81755af8931ef1',
          compradorArea: 'Operaciones',
          condicionDespacho: '0',
          emisorRut: '76179952-5',
          emisorRazonSocial: 'SERVICIOS INFORMATICOS IA SOLUTIONS LIMITADA',
          emisorSucursalCodigo: 'CERT01',
          emisorSucursalDireccion: 'Certificado de Disponibilidad Presupuestaria SOP',
          emisorCentroCostoNombre: 'Certificado',
          emisorCentroCostoNumero: 'CERT',
          emisorContactoNombre: 'Braulio Santibañez',
          receptorRut: '76179952-5',
          receptorRazonSocial: 'SERVICIOS INFORMATICOS IA SOLUTIONS LIMITADA',
          transporteViaTransporteCodigoTransporte: 0,
          transportePuertoTipo: 0,
          transporteNotas: 'No acompaña físico',
          claseMercadoPublico: 'int',
          fechaCreacion: '2021-04-14 19:54:45',
          fechaEmision: '2021-04-14',
          fechaActualizacion: '2021-04-14',
          leido: 'N'
        },
        destinatarios: [
          {
            dntDestinatariosId: 'aeb9fbad2609624a9228309206dac000331e',
            dntId: '20cd4d2a25510241a12b43720561f3692c0e',
            tipoDestino: 1,
            estado: 1,
            destinoCodigoId: '6',
            destinoCorreo: 'letty@febos.cl',
            destinoNombre: 'Personas',
            destinoCodigo: 'personas',
            destinoListaCodigoId: 'Letty Villamizar',
            destinoListaNombre: 'Letty Villamizar',
            destinoListaCodigo: 'Letty Villamizar',
            usuarioEnvioId: '83703bf0-c9c5-4b8f-b5de-e556651dbf6c',
            usuarioEnvioNombre: 'Letty real',
            fechaCreacion: '2021-04-14 19:54:37'
          }
        ],
        referencias: [
          {
            dntReferenciaId: '1fed2b182e98d24e6f28a4222c2e5a778549',
            dntId: '20cd4d2a25510241a12b43720561f3692c0e',
            tipoDocumento: 'SSD',
            folio: '22',
            otraReferenciaId: '',
            estadoReferencia: 0
          }
        ],
        adjuntos: [
          {
            adjuntoId: '733464782939824ebf29c4b2404da4bcbc5d',
            referenciaId: '20cd4d2a25510241a12b43720561f3692c0e',
            url: 'febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/1618444448373b3d83a50-9d7c-11eb-8db5-5bc2899170f7.pdf',
            nombre: 'vet22.pdf',
            mime: 'application/pdf',
            fecha: '2021-04-14 19:04:19',
            estado: 0,
            tipo: 'principal',
            usuario: '83703bf0-c9c5-4b8f-b5de-e556651dbf6c'
          },
          {
            adjuntoId: 'd7fd29452d1f324d8e2842427a9af0e12ffc',
            referenciaId: '20cd4d2a25510241a12b43720561f3692c0e',
            url: 'febos-io/chile/escritorio-digital/desarrollo/archivos/expedientes/1618444471407c192eff0-9d7c-11eb-8db5-5bc2899170f7.pdf',
            nombre: 'erer.pdf',
            mime: 'application/pdf',
            fecha: '2021-04-14 19:05:11',
            estado: 0,
            tipo: 'adjunto',
            usuario: '83703bf0-c9c5-4b8f-b5de-e556651dbf6c'
          }
        ],
        etiquetas: [
          {
            dntEtiquetaId: '066aedc3276a624c7f2a217280ed1ee0081b',
            dntId: '20cd4d2a25510241a12b43720561f3692c0e',
            etiqueta: 'si'
          },
          {
            dntEtiquetaId: '81731c8b2d915245d228e3f29b5fcb9829c6',
            dntId: '20cd4d2a25510241a12b43720561f3692c0e',
            etiqueta: 'etiqueta'
          },
          {
            dntEtiquetaId: 'bb2fb3a2266a52451c29666212ac37debbfb',
            dntId: '20cd4d2a25510241a12b43720561f3692c0e',
            etiqueta: 'porfavor'
          },
          {
            dntEtiquetaId: 'c4fb68702887924a0e29e672fe13b0c2ad8c',
            dntId: '20cd4d2a25510241a12b43720561f3692c0e',
            etiqueta: 'test'
          }
        ],
        detalles: [],
        observaciones: [
          {
            dntObservacionId: 'a9998eb52bbd8249712a76b24913dcc86511',
            dntId: '20cd4d2a25510241a12b43720561f3692c0e',
            linea: 0,
            observacion: 'Materia de mi documento',
            estado: 1
          },
          {
            dntObservacionId: 'e5b82162200c224b48297a722da1d1530264',
            dntId: '20cd4d2a25510241a12b43720561f3692c0e',
            linea: 1,
            observacion: 'Observacion de mi documento',
            estado: 1
          }
        ],
        codigo: 10,
        mensaje: 'Acción realizada satisfactoriamente',
        fecha: '2021-04-14 19:58:14',
        seguimientoId: 'afa7f585-92e3-4025-9b7e-acb8f035ca1c',
        duracion: 357
      }
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
      // 'sharedFile'
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
    /*this.ioGetFileCodeVerification(
      {
        tipo: 'expediente_externo',
        febosId: id,
        destinoId: idSubject
      }
    );*/
  }
};
</script>
