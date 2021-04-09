<template>
  <div id="list-dnt">
    <FilesFilters
      :value="filters"
      :onChange="onChangeFilters"
      :clear="clearFilters"
    />
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
                v-model="verificationCode"
                v-validate="'required'"
                :danger="errors.has('security.securityPin')"
                :danger-text="errors.first('security.securityPin')"
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
    <div v-if="isVerified">
      <FilesHeader :on-pending-files="onPendingFiles" />
      <div class="force-render" :key="forceRender">
        <!--<FileRow
          :key="file.febosId"
          v-for="file in files"
          :file="file"
          :on-pending-files="onPendingFiles"
          :on-general-files="onGeneralFiles"
          :select-file="selectFile"
        />-->
        <vs-row
          v-for="file in files"
          :key="file.febosId"
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
                    {{file.compradorArea | capitalize }}
                  </vs-col>
                  <vs-col vs-lg="3" vs-sm="3" vs-xs="12">
                    {{ file.emisorContactoNombre | capitalize }}
                    <small
                      v-if="file.emisorContactoEmail"
                      class="d-block"
                      v-tooltip="`${file.emisorContactoEmail}`"
                    >
                      {{ file.emisorContactoEmail | truncate(20) }}
                    </small>
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
                </vs-row>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col vs-offset="1" vs-lg="9" vs-type="flex">
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
                         v-if="file.claseMercadoPublico === 'numInt'"
                         v-tooltip="'Documento interno'"
                         transparent color="primary">
                  interno
                </vs-chip>
                <vs-chip class="mr-3"
                         v-tooltip="'Numeración interna'"
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
                  num. Oficial
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
                         v-if="file.transportePuertoTipo === '1'"
                         color="warning" transparent
                >
                  <vs-avatar icon="lock" />
                  privado
                </vs-chip>
              </vs-col>
            </vs-row>
          </vs-col>
          <vs-col vs-lg="1" vs-type="flex" vs-justify="center" vs-align="center">
            <FileOptions
              :file="file"
              :is-shared="true"
              :select-file="selectFile"
            />
          </vs-col>
        </vs-row>
      </div>
      <PopUpBinnacleFile :titulo="'Bitácora del Expediente #'+selectedFile.numero"/>
      <PopUpDetailFile :file="selectedFile" />
      <PopUpGeneralDetailFile :file="selectedFile" />
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import FileOptions from '@/febos/chile/dnt/components/files/FileOptions';
import PopUpDetailFile from '@/febos/chile/dnt/vistas/modals/PopUpDetailFile';
import PopUpGeneralDetailFile from '@/febos/chile/dnt/vistas/modals/PopUpGeneralDetailFile';
import FilesHeader from '@/febos/chile/dnt/components/files/FilesHeader';
import PopUpBinnacleFile from '@/febos/chile/dnt/vistas/modals/PopUpBinnacleFile';
import FilesFilters from '@/febos/chile/dnt/components/files/FilesFilters';
import { mergeFilters } from '@/febos/chile/dnt/utils/fitlers';
import { removeSearchParams, updateSearchParams } from '@/febos/global/utils/router';

export default {
  components: {
    FilesFilters,
    PopUpBinnacleFile,
    FilesHeader,
    PopUpDetailFile,
    PopUpGeneralDetailFile,
    FileOptions
  },
  data() {
    const { view } = this.$route.params;
    return {
      verificationCode: '',
      isVerified: false,
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
    files() {
      this.forceRender = Date.now(); // TODO: remove this.
    },
    async page(page) {
      updateSearchParams({ page });
      await this.fetchDocuments();
    },
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
    selectFile(file) {
      this.selectedFile = file;
      this.selectFileState(file.febosId);
    },
    async onChangeFilters(filters, onMounted) {
      this.filters = filters;
      if (!onMounted) {
        if (this.page !== 1) {
          this.page = 1;
          // using else because this method has two responsibilities
        } else {
          // force fetch (if we change the page from 1 to 1 the watcher not run)
          await this.fetchDocuments();
        }
      }
    },
    clearFilters() {
      removeSearchParams(['filters']);
      // TODO: try to change to default filter state for current view.
      updateSearchParams({ page: 1 });
      this.$router.go();
    },
    async fetchDocuments() {
      const { id } = this.$route.params;
      this.filters = this.filters.concat(`|febosId:${ id}`);
      await this.listDocuments({
        data: {
          tipo: 'EXP',
          campos: '*',
          pagina: this.page,
          orden: '-fechaCreacion',
          itemsPorPagina: this.paginate,
          filtros: mergeFilters(this.filters, this.$route.query.filters)
        },
        fromCS: this.fromCS
      });
      if (!this.fromCS) {
        this.fromCS = true;
      }
    },
    verifyFile() {
      console.log('verificando codigo');
      this.isVerified = true;
      this.fetchDocuments();
    }
  },
  created() {
    this.selectFileState('');
  }
};
</script>
