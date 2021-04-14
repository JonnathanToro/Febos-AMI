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
        <div class="col-8 bg-white">
          <h5 style="color:#7a008d;">
            Este expediente ha sido creado por {{ sharedFile.dnt.solicitanteNombre }}
            <small>{{ sharedFile.dnt.solicitanteEmail }}</small>,
            perteneciente a la unidad {{sharedFile.dnt.solicitanteGrupoNombre}}
          </h5>
          <div>
            - Tipo de documento: {{ sharedFile.dnt.emisorCentroCostoNombre }}
          </div>
          <div>
            - Documento: {{ sharedFile.dnt.emisorSucursalDireccion }}
          </div>
          <div v-if="sharedFile.dnt.numeroInt">
            - Número de documento: {{ sharedFile.dnt.numeroInt }}
          </div>
          <div>
            - Tipo de expediente: {{ sharedFile.dnt.claseMercadoPublico }}
          </div>
          <div v-if="sharedFile.dnt.condicionDespacho">
            - Formato documento: {{ sharedFile.dnt.condicionDespacho }}
          </div>
          <div v-if="sharedFile.dnt.fechaEmision">
            - Fecha documento: {{ sharedFile.dnt.fechaEmision }}
          </div>
          <div v-if="sharedFile.dnt.transportePuertoTipo">
            - Es privado: {{ sharedFile.dnt.transportePuertoTipo }}
          </div>
          <div v-if="sharedFile.dnt.compradorArea">
            - Tipo institución: {{ sharedFile.dnt.compradorArea }}
          </div>
          <div v-if="sharedFile.dnt.emisorContactoArea">
            - Institución: {{ sharedFile.dnt.emisorContactoArea }}
          </div>
          <div v-if="sharedFile.dnt.emisorContactoNombre">
            - Persona Remitente: {{ sharedFile.dnt.emisorContactoNombre }}
          </div>

          <div v-if="sharedFile.dnt.emisorContactoCargo">
            - Cargo Remitente: {{ sharedFile.dnt.emisorContactoCargo }}
          </div>
          <div v-if="sharedFile.dnt.transporteNotas">
            - Detalle: {{ sharedFile.dnt.transporteNotas }}
          </div>
          <div v-if="sharedFile.dnt.transporteViaTransporteCodigoTransporte === 0">
            - Acompaña físico: acompaña la wea 0
          </div>
          <div v-if="sharedFile.dnt.transporteViaTransporteCodigoTransporte === 1">
            - Acompaña físico: acompaña la wea 1
          </div>
          <!--<div v-if="sharedFile.observaciones[0]">
            - Observaciones: {{ sharedFile.observaciones[0] }}
          </div>
          <div v-if="sharedFile.observaciones[1]">
            - Materia: {{ sharedFile.observaciones[1] }}
          </div>-->
          <hr>
          <div v-for="destino in sharedFile.destinatarios" :key="destino.dntDestinatariosId">
            - Tipo destino: {{ destino.destinoNombre }}
            <br>
            - Nombre destino: {{ destino.destinoListaNombre }}
          </div>

          <hr>
          <div v-for="referencia in sharedFile.referencias" :key="referencia.dntReferenciaId">
            - Tipo doc: {{ referencia.tipoDocumento }}
            <br>
            - folio referencia: {{ referencia.folio }}
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

export default {
  components: {},
  data() {
    const { view } = this.$route.params;
    return {
      verificationInput: '',
      // isVerified: false,
      isVerified: true,
      view,
      onPendingFiles: view === 'pendientes',
      onGeneralFiles: view === 'general',
      fromCS: false,
      selectedFile: {},
      filters: '',
      page: Number.parseInt(this.$route.query.page || 1, 10),
      paginate: Number.parseInt(this.$route.query.paginate || 10, 10),
      forceRender: Date.now() // TODO: the files watch is triggered but the component not re-render.
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
