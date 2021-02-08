<template lang="html">
  <div>
    <vs-row vs-w="12" class="list-wrapper title-columns" >
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <b>Número</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
        <b>Estado</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Enviado por</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Razón social receptor</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Último aprobador</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Actualización</b>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
        <b>Creación</b>
      </vs-col>
    </vs-row>
    <div id="list-dnt">
      <vs-row
        vs-w="12"
        :key="file.febosId"
        v-for="file in dntByED"
        class="content-rows list-wrapper"
      >
        <vs-col vs-type="block" class="numero-file" vs-lg="1" vs-sm="4" vs-xs="12">
          <div>
            # <br>
          </div>
          <div>
            {{ file.numero }}
            <div>
              {{file.tipo}}
            </div>
          </div>
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="1" vs-sm="4" vs-xs="12">
          <vs-icon
            title="En curso"
            v-if="file.estado === 3"
            icon="schedule"
            size="medium"
            bg="#43C3B9"
            class="state-icon"
            color="white"/>
          <vs-icon
            title="Aprobado"
            v-if="file.estado === 4"
            icon="thumb_up"
            size="medium"
            bg="#14AA59"
            class="state-icon"
            color="white"/>
          <vs-icon
            title="Rechazado"
            v-if="file.estado === 5"
            icon="thumb_down"
            size="medium"
            bg="#CE4B4B"
            class="state-icon"
            color="white"/>
          <vs-icon
            title="Anulado"
            v-if="file.estado === 6"
            icon="close"
            size="medium"
            bg="#A04E4E"
            class="state-icon"
            color="white"/>
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{file.solicitanteNombre| capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.receptorSucursalNombre | capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.receptorContactoNombre | capitalize }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.fechaActualizacion }}
        </vs-col>
        <vs-col vs-type="block" vs-justify="left" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          {{ file.fechaEntrega }}
        </vs-col>
        <vs-col
          vs-type="block"

          class="aditional-info"
          vs-lg="12"
          vs-sm="12"
          vs-xs="12"
        >
        <span class="pill-info" v-if="file.emisorInfoAdicional" title="División a la que pertenece">
          {{file.emisorInfoAdicional}}
        </span>
          <span class="pill-info" v-if="file.privado === 'Y'" title="Es un archivo privado">
          <vs-icon icon="lock"></vs-icon>
        </span>
          <span class="pill-info" v-if="file.numeroInt" title="Tipo de documento">
          {{findTypeDocument(file.numeroInt)}}
        </span>
          <span class="pill-info" v-if="file.plazo" title="tiempo Transcurrido">
          {{translateTime(file.plazo, true)}}
        </span>
          <span  class="actions">
            <vs-dropdown vs-custom-content vs-trigger-click >
            <a class="a-icon" href.prevent>
              <vs-icon
                class="" icon="bubble_chart"
                size="medium"
                bg="#E4E4E4"
                round
                color="gray"></vs-icon>
            </a>
            <vs-dropdown-menu style="width: fit-content">
               <vs-dropdown-item v-on:click="processFileModal(file)">
                <vs-icon icon="move_to_inbox"/> Finalizar documento
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="getParticipants(file)">
                <vs-icon icon="groups"/> Participantes
              </vs-dropdown-item>
               <vs-dropdown-item v-on:click="getComments(file)">
                <vs-icon icon="chat"/> Comentarios
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="sendFile(file)">
                <vs-icon icon="chat"/> Enviar documento
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
          </span>
        </vs-col>
      </vs-row>
    </div>
    <vs-popup
      :title="`Participantes del Expediente ${file.numero}`"
      :active.sync="participantsModal"
    >
      <vs-list>
        <div v-for="(participant, index) in participants" :key="index">

          <vs-list-item
            v-if="participant.estado === 0"
            icon="inbox"
            :title="participant.nombre"
            :subtitle="participant.email">
            <vs-chip color="success">Bandeja de entrada</vs-chip>
          </vs-list-item>
          <vs-list-item
            v-if="participant.estado === 1"
            icon="move_to_inbox"
            :title="participant.nombre"
            :subtitle="participant.email">
            <vs-chip color="warning">Bandeja de finalizados</vs-chip>
          </vs-list-item>
        </div>
      </vs-list>
    </vs-popup>
    <vs-popup title="Finalizar Expediente" :active.sync="showModalProcess">
      <div>
        Al dar por finalizado este documento, no podras actuar sobre el, estas de cuaerdo?
      </div>
      <div class="m-top-20" style="display: flex;justify-content: flex-end;">
        <vs-button color="dark" v-on:click="cancelProcess()" type="border">Cancelar</vs-button>
        <vs-button
          v-on:click="processFile()"
          color="primary"
          style="margin-left: 12px;"
          type="border"
        >
          Si, finalizar
        </vs-button>
      </div>
    </vs-popup>
    <vs-popup title="Enviar Expediente" :active.sync="sendFileModal">
      <h5>
        Para:
      </h5>
      <div class="wrap-option">
        <vs-radio v-model="send.typeSend" vs-value="moodUser">Usuario</vs-radio>
        <vs-radio v-model="send.typeSend" vs-value="moodUnidad">Unidad</vs-radio>
      </div>
      <div
        v-if="send.typeSend === 'moodUser' && usersCompany && usersCompany.length"
        class="wrap-form"
      >
        <vs-select
          class="selectExample"
          label="Usuarios"
          v-model="send.user"
        >
          <vs-select-item
            :key="user.id"
            :value="user.correo"
            :text="user.nombre"
            v-for="user in usersCompany"
          />
        </vs-select>
      </div>
      <div
        v-if="send.typeSend === 'moodUnidad' && groupsCompany && groupsCompany.length"
        class="wrap-form"
      >
        <vs-select
          class="selectExample"
          label="Unidad"
          v-model="send.unidad"
        >
          <vs-select-item
            :key="group.id"
            :value="group.id"
            :text="group.nombre"
            v-for="group in groupsCompany"
          />
        </vs-select>
      </div>
      <h5>
        Con copia:
      </h5>
      <div class="wrap-option">
        <vs-radio v-model="send.typeCopy" vs-value="sendUser">Usuario</vs-radio>
        <vs-radio v-model="send.typeCopy" vs-value="sendUnidad">Unidad</vs-radio>
      </div>
      <div
        v-if="send.typeCopy === 'sendUsuario' && usersCompany && usersCompany.length"
        class="wrap-form">
        <vs-select
          class="selectExample"
          label="Usuarios"
          v-model="send.user"
        >
          <vs-select-item
            :key="user.id"
            :value="user.correo"
            :text="user.nombre"
            v-for="user in usersCompany"
          />
        </vs-select>
      </div>
      <div
        v-if="send.typeCopy === 'sendUnidad' && groupsCompany && groupsCompany.length"
        class="wrap-form"
      >
        <vs-select
          class="selectExample"
          label="Unidad"
          v-model="send.unidad"
        >
          <vs-select-item
            :key="group.id"
            :value="group.id"
            :text="group.nombre"
            v-for="group in groupsCompany"
          />
        </vs-select>
      </div>
    </vs-popup>

    <vs-popup title="Comentarios Expediente" :active.sync="commentsModal">
      <div style="display: flex;flex-direction: column;">
        <template style="background: pink;height:200px; overflow-y:scroll">
          <div
            v-for="comment in commentsEd"
            :key="comment.comentarioId"
          >
            <div class="pill-comment-user" v-if="comment.usuarioId !== currentUserId">
              <vs-list-item
                :title="comment.comentario"
                :subtitle="comment.usuarioNombre">
                <template slot="avatar">
                  <vs-avatar />
                </template>
                <vs-chip transparent color="#24c1a0">
                  <small>{{comment.creado}}</small>
                </vs-chip>
              </vs-list-item>
            </div>
            <div class="pill-comment-me" v-if="comment.usuarioId === currentUserId">
              <vs-list-item
                :title="comment.comentario"
                :subtitle="comment.usuarioNombre">
                <template slot="avatar">
                  <vs-avatar />
                </template>
                <vs-chip transparent color="#24c1a0">
                  <small>{{comment.creado}}</small>
                </vs-chip>
              </vs-list-item>
            </div>
          </div>
        </template>
        <div class="m-top-20">
          <vs-textarea
            height="80px"
            counter="500"
            :counter-danger.sync="counterDanger"
            v-model="newComment.comment"
          />
          <div style="float: right">
            <vs-button
              color="primary"
              type="border"
              v-on:click="sendNewComment()"
            >
              Enviar
            </vs-button>
          </div>
        </div>
      </div>
    </vs-popup>

    <vs-row v-if="!loading && dntByED.length">
      <vs-col vs-w="12" class="m-top-20">
        <fb-paginacion
          :total="paginacion.paginasTotales"
          :max="10"
          v-model="pagina"
          class="mt-7"
        />
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import FbPaginacion from '../../_vue/componentes/FbPaginacion';

import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  components: { FbPaginacion },
  mixins: [FiltersDntMixin, FindTypeDocumentMixin],
  data() {
    return {
      processModal: false,
      participantsModal: false,
      sendFileModal: false,
      commentsModal: false,
      detailsFile: false,
      processed: {},
      newComment: {
        comment: ''
      },
      counterDanger: false,
      send: {
        typeSend: 'moodUser',
        typeCopy: 'sendUnidad',
        unidad: '',
        usuario: ''
      },
      file: {}
    };
  },
  watch: {
    pagina() {
      const view = this.$route.params.vista;
      const filters = this.getFilterView(view);

      console.log('aca si o no?', this.pagina);
      this.listDocuments({
        tipo: 'escritoriodigital',
        campos: '*',
        pagina: this.pagina || 1,
        orden: '-fechaCreacion',
        itemsPorPagina: 10,
        // TODO agregar bien los filtros
        filtros: filters.concat('|fechaCreacion:2020-06-13--2020-12-13')
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
      'dntByED',
      'paginacion',
      'paginaActual',
      'fileCommentDetails',
      'showModalFile',
      'participants',
      'commentsEd'
    ]),
    ...mapGetters('Empresas', [
      'empresa',
      'usersCompany',
      'groupsCompany'
    ]),
    ...mapGetters('Usuario', [
      'verificationCode',
      'currentUserId'
    ]),
    pagina: {
      get() {
        return this.paginaActual;
      },
      set(value) {
        this.actualizarPagina(value);
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
      'actualizarPagina',
      'getFileDetails',
      'downloadFilePDF',
      'clearErrorMessage',
      'processDntFileED',
      'closeModal',
      'getFileDnt',
      'getFileComments',
      'sendDntComment'
    ]),
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany'
    ]),
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
      this.sendFileModal = true;
    },
    getParticipants(file) {
      this.participantsModal = true;
      this.file = file;
      const view = this.$route.params.vista;
      this.getFileDnt({
        febosId: file.febosId,
        aprobaciones: 'si',
        esLeido: view.includes('entrada') ? 'Y' : 'N'
      });
    },
    processFileModal(file) {
      this.showModalProcess = true;
      this.processedFile = file;
    },
    processFile() {
      const view = this.$route.params.vista;
      const toProcess = {
        febosId: this.processedFile.febosId,
        tipo: 'escritotiodigitalfin',
        esLeido: view.includes('entrada') ? 'Y' : 'N'
      };
      this.processDntFileED(toProcess);
      console.log('toProcess', toProcess);
    },
    getComments(file) {
      this.commentsModal = true;
      this.file = file;
      this.getFileComments({
        esLeido: 'Y',
        febosId: file.febosId
      });
    },
    async sendNewComment() {
      const view = this.$route.params.vista;
      this.sendDntComment({
        febosId: this.file.febosId,
        esLeido: view.includes('entrada') ? 'Y' : 'N',
        comentario: this.newComment.comment
      });
      await this.getFileComments({
        esLeido: 'Y',
        febosId: this.file.febosId
      });
      this.newComment = {
        comment: ''
      };
    }
  },
  mounted() {
    const view = this.$route.params.vista;
    const filters = this.getFilterView(view);
    this.listDocuments({
      tipo: 'escritoriodigital',
      campos: '*',
      pagina: 1,
      orden: '-fechaCreacion',
      itemsPorPagina: 10,
      // TODO agregar bien los filtros
      filtros: filters.concat('|fechaCreacion:2020-06-13--2020-12-13')
    });
    console.log('hits', this);
  }
};
</script>
<style>

.m-top-20 {
  margin-top: 20px;
}

.list-wrapper {
  background: white;
}

.title-columns {
  padding: 16px 10px;
  margin-bottom: 10px;
  background: white;
  box-shadow: -1px 6px 12px 0 #80808075;
}

.content-rows {
  padding: 10px;
  margin-top: 4px;
}

.numero-file {
  text-align: center;
  color: #3ca2d6;
}

.pill-info {
  border: 1px solid #3ca2d6;
  padding: 1px 5px;
  border-radius: 10px;
  font-size: 12px;
  margin-right: 20px;
  cursor:pointer;
}

.actions {
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
}
.aditional-info {
  padding: 4px 0;
  margin-left: 16% !important;
  position: relative;
}

.state-icon {
  border-radius: 25px;
  font-size: 22px !important;
  padding: 5px;
}
.tooltip-inline {
  display: inline !important;
}

.wrap-option {
  display: flex;
  justify-content: space-around;
}

.wrap-form {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.pill-comment-user {
  width: 90%;
  border: 1px solid #c2f785;
  border-radius: 25px;
  margin-bottom: 10px;
  float: left;
}

.pill-comment-me {
  width: 90%;
  border: 1px solid #3a9eef6b;
  border-radius: 25px;
  margin-bottom: 10px;
  float: right;
}
</style>
