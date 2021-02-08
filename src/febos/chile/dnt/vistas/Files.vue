<template>
  <div>
    <template slot="actions">
    <span>
      Viendo documentos que ingresaron
    </span>
    <span v-if="periodoSeleccionado.valor != 'personalizado'">
      {{ periodoSeleccionado.nombre }}
    </span>
    <span v-if="periodoSeleccionado.valor == 'personalizado'">
      entre el
      <!--<input type="date" class="fecha" v-model="periodoDesde">-->
      <datetime
        v-model="periodoDesde"
        input-class="fecha"
        :phrases="{ok: 'Seleccionar',
         cancel: 'Cancelar'}"
        value-zone="local"
        format="yyyy-MM-dd"
      />
      y el
      <datetime
        v-model="periodoHasta"
        input-class="fecha"
        :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
        value-zone="local"
        format="yyyy-MM-dd"
      />
    </span>
      <vs-dropdown style="margin-left: 15px">
        <a class="a-icon" href="#">
          Cambiar
          <vs-icon class="" icon="expand_more"></vs-icon>
        </a>
        <vs-dropdown-menu>
          <vs-dropdown-item
            style="width:200px"
            v-for="periodo in periodos"
            :key="periodo.valor"
            v-on:click.native="seleccionarPeriodo(periodo)"
          >
            {{ periodo.nombre }}
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </template>
    <filtros
      :users="usersCompany"
      :groups="groupsCompany"
      :documents="documentTypesState.list"
      :institutions="institutionTypesState.list"
      :configuracion-vista="configuracion"
      :periodos="periodos"
      v-on:filtros-aplicados="manipularFiltros"
    />
    <vs-row class="bg-white shadow py-5 px-3 mb-4">
      <vs-col vs-lg="11">
        <vs-row>
          <vs-col vs-lg="1" class="text-center">
            <b>#</b>
          </vs-col>
          <vs-col vs-lg="2">
            <b>Estado</b>
          </vs-col>
          <vs-col vs-lg="9">
            <vs-row>
              <vs-col vs-lg="4">
                <b>Enviado por</b>
              </vs-col>
              <vs-col vs-lg="4">
                <b>Remitente</b>
              </vs-col>
              <vs-col vs-lg="4">
                <b>Creado por</b>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-lg="1" vs-sm="4" vs-xs="12" class="text-center">
        <b>...</b>
      </vs-col>
    </vs-row>
    <div id="list-dnt">
      <vs-row
        :key="file.febosId"
        v-for="file in dntByFiles"
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
                <vs-avatar icon="query_builder" color="#43C3B9" />
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
          <vs-tooltip text="Desplegar acciones">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <a class="a-icon" href.prevent>
                <vs-icon
                  icon="settings"
                  size="medium"
                  bg="#E4E4E4"
                  round
                  color="gray"
                />
              </a>
              <vs-dropdown-menu style="width: fit-content">
                <vs-dropdown-item
                  v-if="file.estado === '3' && isPendingFiles"
                  v-on:click="openDraft(file)"
                >
                  <vs-icon icon="query_builder"/>
                  Continuar borrador
                </vs-dropdown-item>
                <vs-dropdown-item v-on:click="binnacleFileModal(file)">
                  <vs-icon icon="list"/>
                  Bitácora
                </vs-dropdown-item>
                <vs-dropdown-item v-on:click="getDetailsFile(file)">
                  <vs-icon icon="search"/>
                  Ver detalles
                </vs-dropdown-item>
                <!--<vs-dropdown-item v-on:click="downloadFile(file)">
                  <vs-icon icon="save_alt"/>
                  Descargar acta
                </vs-dropdown-item>-->
                <vs-dropdown-item v-on:click="downloadAttachments(file)">
                  <vs-icon icon="save_alt"/>
                  Descargar adjuntos
                </vs-dropdown-item>
                <vs-dropdown-item v-on:click="cancelFileModal(file)" v-if="isPendingFiles">
                  <vs-icon icon="clear"/>
                  Anular expediente
                </vs-dropdown-item>
                <vs-dropdown-item v-on:click="processFileModal(file)" v-if="isPendingFiles">
                  <vs-icon icon="move_to_inbox"/>
                   Finalizar documento
                </vs-dropdown-item>
                <vs-dropdown-item v-on:click="getParticipants(file)">
                  <vs-icon icon="groups"/>
                   Participantes
                </vs-dropdown-item>
                <vs-dropdown-item v-on:click="getComments(file)" v-if="isPendingFiles">
                  <vs-icon icon="chat"/>
                   Comentarios
                </vs-dropdown-item>
                <vs-dropdown-item v-on:click="sendFile(file)" v-if="isPendingFiles">
                  <vs-icon icon="chat"/>
                  Enviar documento
                </vs-dropdown-item>
                <vs-dropdown-item v-on:click="ticketModalFile(file)">
                  <vs-icon icon="help"/>
                  Ticket de ayuda
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
            <span />
          </vs-tooltip>
        </vs-col>
      </vs-row>
    </div>
    <vs-popup title="Bitácora del Expediente" :active.sync="binnacleModal" v-if="binnacleFile">
      <div>
        <vs-list>
          <div  v-for="binnacle in binnacleFile" :key="binnacle.bitacoraId">
            <vs-list-item
              v-if="binnacle.severidadNombre === 'ERROR'"
              icon="warning"
              style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
              :title="binnacle.mensaje" :subtitle="binnacle.usuarioNombre"
            >
              <vs-chip color="dark" v-if="binnacle.externalId">
                <vs-icon icon="pageview" size="small"></vs-icon>
              </vs-chip>
              <vs-chip color="dark" v-if="binnacle.correoId">
                <vs-icon icon="email" size="small"></vs-icon>
              </vs-chip>
              <vs-chip color="info">
                <vs-icon icon="email" size="small">{{binnacle.fecha | dateFormat}}</vs-icon>
              </vs-chip>
              <!--<vs-chip color="dark" v-if="binacle.externalId">
                <vs-icon icon="pageview" size="small"></vs-icon>
              </vs-chip>-->
            </vs-list-item>
            <vs-list-item
              v-if="binnacle.severidadNombre === 'INFO'"
              icon="info"
              style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
              :title="binnacle.mensaje" :subtitle="binnacle.usuarioNombre"
            >
              <vs-chip color="dark" v-if="binnacle.externalId">
                <vs-icon icon="pageview" size="small"></vs-icon>
              </vs-chip>
              <vs-chip color="dark" v-if="binnacle.correoId">
                <vs-icon icon="email" size="small"></vs-icon>
              </vs-chip>
              <vs-chip color="info">
                <vs-icon icon="email" size="small">{{binnacle.fecha | dateFormat}}</vs-icon>
              </vs-chip>
              <!--<vs-chip color="dark" v-if="binacle.externalId">
                <vs-icon icon="pageview" size="small"></vs-icon>
              </vs-chip>-->
            </vs-list-item>
          </div>
        </vs-list>
      </div>
    </vs-popup>
    <vs-popup title="Detalles del Expediente" :active.sync="detailsFile" v-if="file">
      <PopUpDetailFile :file="file" :fileCommentDetails="fileCommentDetails"/>
    </vs-popup>
    <PopUpCancelFile :canceledFile="canceledFile" />
    <PopUpProcessFile :processedFile="file" />
    <PopUpParticipantsFile :file="file" />
    <PopUpCommentsFile :file="file" />
    <PopUpTicketFile :file="file" />
    <PopUpSendFile :file="file" />
    <vs-row v-if="dntByFiles.length">
      <vs-col vs-w="12" class="mt-4">
        <fb-paginacion
          :total="pagination.pages"
          :max="10"
          v-model="page"
        />
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import FbPaginacion from '../../_vue/componentes/FbPaginacion';
import Filtros from '../../../global/_vue/componentes/FiltrosDnt';

import PopUpCancelFile from '@/febos/chile/dnt/vistas/modals/PopUpCancelFile';
import PopUpDetailFile from '@/febos/chile/dnt/vistas/modals/PopUpDetailFile';
import PopUpProcessFile from '@/febos/chile/dnt/vistas/modals/PopUpProcessFile';
import PopUpTicketFile from '@/febos/chile/dnt/vistas/modals/PopUpTicketFile';
import PopUpSendFile from '@/febos/chile/dnt/vistas/modals/PopUpSendFile';
import PopUpParticipantsFile from '@/febos/chile/dnt/vistas/modals/PopUpParticipantsFile';
import PopUpCommentsFile from '@/febos/chile/dnt/vistas/modals/PopUpCommentsFile';
import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  components: {
    Filtros,
    FbPaginacion,
    PopUpDetailFile,
    PopUpCancelFile,
    PopUpProcessFile,
    PopUpParticipantsFile,
    PopUpCommentsFile,
    PopUpTicketFile,
    PopUpSendFile
  },
  mixins: [FiltersDntMixin, FindTypeDocumentMixin],
  data() {
    const view = this.$route.params.vista;
    const filters = this.getFilterView(view);

    return {
      isPendingFiles: view === 'en-curso',
      periodos: [
        { nombre: 'las últimas 4 semanas', valor: 'ultimas4semanas' },
        { nombre: 'este mes', valor: 'esteMes' },
        { nombre: 'este mes y el anterior', valor: 'esteMesConAnterior' },
        { nombre: 'los últimos 3 meses', valor: 'ultimos3meses' },
        { nombre: 'los últimos 6 meses', valor: 'ultimos6meses' },
        { nombre: '* Rango personalizado', valor: 'personalizado' }
      ],
      periodoSeleccionado: { nombre: 'los últimos 6 meses', valor: 'ultimos6meses' },
      periodoDesde: '',
      periodoHasta: '',
      configuracion: filters,
      cancelModal: false,
      detailsFile: false,
      binnacleModal: false,
      canceledFile: {},
      file: {},
      page: Number.parseInt(this.$route.query.page || 1, 10),
      paginate: Number.parseInt(this.$route.query.paginate || 10, 10)
    };
  },
  watch: {
    page(newValue) {
      this.listDocuments({
        tipo: 'EXP',
        campos: '*',
        pagina: newValue,
        orden: '-fechaCreacion',
        itemsPorPagina: this.paginate,
        filtros: this.filtros
      });
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
      'dntByFiles',
      'fileCommentDetails',
      'binnacleFile',
      'showModalFile',
      'fileCommentDetails',
      'pagination'
    ]),
    ...mapGetters('Empresas', [
      'empresa',
      'usersCompany',
      'groupsCompany'
    ]),
    ...mapGetters('Usuario', [
      'currentUser'
    ]),
    ...mapGetters('List', [
      'documentTypesState',
      'institutionTypesState'
    ]),
    showModal: {
      get() {
        return this.showModalFile;
      },
      set(value) {
        this.closeModal(value);
      }
    },
    showModalProcess: {
      get() {
        return this.showModalFile;
      },
      set(value) {
        this.closeModal(value);
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments',
      'getFileDnt',
      'downloadFilePDF',
      'attemptCancelFile',
      'clearErrorMessage',
      'getFileBinnacle',
      'sendTicketHelp',
      'closeModal',
      'downloadAttachmentFiles',
      'getFileDetails',
      'downloadFilePDF',
      'closeModal',
      'getFileComments',
      'getAttachmentsDnt'
    ]),
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany'
    ]),
    ...mapActions('List', [
      'fetchDocumentTypes',
      'fetchInstitutionTypes'
    ]),
    ...mapActions('Modals', [
      'showModals'
    ]),
    openDraft(file) {
      // TODO: move this to another side, (why api doesn't save the full name? 😡😡)
      const types = {
        ext: 'externo'
      };

      this.$router.push(`/documentos/${types[file.claseMercadoPublico]}/${file.febosId}`);
    },

    manipularFiltros(filtros, onMounted) {
      // console.log('manipulando', filtros);
      if (onMounted) {
        this.page = 1;
      }
      this.filtrosDelComponente = filtros;
      this.filtros = `fechaCreacion:${this.periodoDesde}--${this.periodoHasta}`;
      if (filtros !== '') {
        this.filtros += `|${filtros}`;
      }
      console.log('FILTROS', this.filtros);
      this.listDocuments({
        tipo: 'EXP',
        campos: '*',
        pagina: 1,
        orden: '-fechaCreacion',
        itemsPorPagina: this.paginate,
        filtros: this.filtros
      });
    },
    seleccionarPeriodo(periodo) {
      switch (periodo.valor) {
        case 'ultimas4semanas':
          this.periodoDesde = Vue.moment().subtract(28, 'days')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'esteMes':
          this.periodoDesde = Vue.moment().startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'esteMesConAnterior':
          this.periodoDesde = Vue.moment().subtract(2, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'ultimos3meses':
          this.periodoDesde = Vue.moment().subtract(3, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'ultimos6meses':
          this.periodoDesde = Vue.moment().subtract(6, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        default:
          this.periodoDesde = Vue.moment().subtract(6, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
      }
      this.periodoSeleccionado = periodo;
      this.manipularFiltros(this.filtrosDelComponente);
    },

    binnacleFileModal(file) {
      this.binnacleModal = true;
      this.getFileBinnacle({
        febosId: file.febosId,
        filas: 200,
        pagina: 1
      });
    },
    getDetailsFile(file) {
      this.file = file;
      this.getFileDnt({
        febosId: file.febosId,
        destinatarios: 'si',
        referencias: 'si'
      });
      this.getAttachmentsDnt({
        febosId: file.febosId
      });
      this.detailsFile = true;
    },
    downloadFile(file) {
      this.downloadFilePDF({
        retornarPdf: 'si',
        aprobacionId: file.solicitanteDocumentoId,
        ejecucionId: file.febosId
      });
    },
    downloadAttachments(file) {
      this.downloadAttachmentFiles({
        febosId: file.febosId,
        comprimir: 'si'
      });
    },
    cancelFileModal(file) {
      this.showModals('cancelFile');
      this.canceledFile = file;
    },
    processFileModal(file) {
      this.showModals('processFile');
      this.file = file;
    },
    getParticipants(file) {
      this.showModals('participantsFile');
      this.file = file;
      this.getFileDnt({
        febosId: file.febosId,
        destinatarios: 'si'
      });
    },
    getComments(file) {
      this.showModals('commentsFile');
      this.file = file;
      this.getFileComments({
        febosId: file.febosId
      });
    },
    ticketModalFile(file) {
      this.file = file;
      this.showModals('ticketFile');
    },
    sendFile(file) {
      this.getUsersCompany({
        empresaId: this.empresa.id,
        pagina: 1,
        filas: 9999,
        buscarInfoExtra: 'si',
        filtroInfoExtra: 'CARGO'
      });
      this.getGroupsCompany({
        empresaId: this.empresa.id
      });
      this.file = file;
      this.showModals('sendFile');
    }
  },
  created() {
    this.periodoDesde = Vue.moment().subtract(6, 'month').format('YYYY-MM-DD');
    this.periodoHasta = Vue.moment().format('YYYY-MM-DD');
  },
  mounted() {
    if (!this.usersCompany.length) {
      this.getUsersCompany({
        empresaId: this.empresa.id,
        pagina: this.page,
        filas: 9999,
        buscarInfoExtra: 'si',
        filtroInfoExtra: 'CARGO'
      });
    }
    if (!this.groupsCompany.length) {
      this.getGroupsCompany({
        empresaId: this.empresa.id
      });
    }
    if (!this.documentTypesState.length) {
      this.fetchDocumentTypes();
    }
    if (!this.institutionTypesState.length) {
      this.fetchInstitutionTypes();
    }

    /*
    const view = this.$route.params.vista;
    const filters = this.getFilterView(view);
    this.listDocuments({
      tipo: 'EXP',
      campos: '*',
      pagina: 1,
      orden: '-fechaCreacion',
      itemsPorPagina: 10,
      // TODO agregar bien los filtros
      filtros: filters.concat('|fechaCreacion:2020-06-13--2021-02-13')
    });
    */
  }
};
</script>
