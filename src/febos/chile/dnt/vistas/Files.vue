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
        v-for="file in dntByFiles"
        class="content-rows list-wrapper"
      >
        <vs-col vs-type="block" class="numero-file" vs-lg="1" vs-sm="4" vs-xs="12">
          <div>
            # <br>
          </div>
          <div>
            {{ file.numero }}
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
              <vs-dropdown-item v-on:click="getCommentsFile(file)">
                <vs-icon icon="chat"/> Ver Detalles
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="downloadFile(file)">
                <vs-icon icon="save_alt"/> Descargar acta
              </vs-dropdown-item>
              <vs-dropdown-item>
                <vs-icon icon="insert_photo"/> Ver adjuntos
              </vs-dropdown-item>
              <vs-dropdown-item v-on:click="cancelFile(file)">
                <vs-icon icon="clear"/> Anular Expediente
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
          </span>
        </vs-col>
      </vs-row>
    </div>
    <vs-popup title="Detalles del Expediente" :active.sync="detailsFile">
      <div class="">
        <vs-tabs>
          <vs-tab label="Detalles">
            hola dos
          </vs-tab>
          <vs-tab label="Comentarios y Adjuntos">
            <vs-list v-if="Object.keys(fileCommentDetails).length">
              <div
                v-for="(comment, index) in fileCommentDetails"
                :key="index"
              >
                <vs-list-item
                  v-if="comment.accion === 'comentario'"
                  icon="chat"
                  style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
                  :title="comment.comentario" :subtitle="comment.nombre">
                  <small>{{comment.fecha}}</small>
                  <div v-for="(doc, index) in comment.documentos" :key="index" class="pill-info">
                    <DownloadFile :path="doc.adjuntoUrl" :name="doc.nombre"/>
                  </div>
                </vs-list-item>
                <vs-list-item
                  v-if="comment.accion === 'devolver'"
                  icon="compare_arrows"
                  style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
                  :title="comment.comentario" :subtitle="comment.nombre">
                  <small>{{comment.fecha}}</small>
                  <div v-for="(doc, index) in comment.documentos" :key="index" class="pill-info">
                    <DownloadFile :path="doc.adjuntoUrl" :name="doc.nombre"/>
                  </div>
                </vs-list-item>
              </div>
            </vs-list>

            <!--<Timeline
              :timeline-items="fileCommentDetails.ejecucion.comentarios"
              message-when-no-items="No hay comentarios"/>-->
          </vs-tab>
        </vs-tabs>
      </div>
    </vs-popup>
    <vs-popup title="Anular Expediente" :active.sync="cancelModal">
      <div class="">
        Para anular el expediente debes realizarlo bajo la seguridad del 2FA o Cód. de verificación
      </div>
    </vs-popup>
    <vs-row v-if="!loading && dntByFiles.length">
      <vs-col vs-w="9">
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

import DownloadFile from '@/febos/chile/dnt/components/DownloadFile';
import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  components: { FbPaginacion, DownloadFile },
  mixins: [FiltersDntMixin, FindTypeDocumentMixin],
  data() {
    return {
      cancelModal: false,
      detailsFile: false,
      timelines: [
        {
          id: 5,
          icon_class: 'glyphicon glyphicon-comment',
          icon_status: '',
          title: 'Admin added a comment.',
          controls: [
            {
              method: 'edit',
              icon_class: 'glyphicon glyphicon-pencil'
            },
            {
              method: 'delete',
              icon_class: 'glyphicon glyphicon-trash'
            }
          ],
          created: '24. Sep 17:03',
          body: '<p><i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, maxime alias nam dignissimos natus voluptate iure deleniti. Doloremque, perspiciatis voluptas dignissimos ex, ullam et, reprehenderit similique possimus iste commodi minima fugiat non culpa, veniam temporibus laborum. Distinctio ipsam cupiditate debitis aliquid deleniti consectetur voluptates corporis officiis tempora minus veniam, accusamus cum optio nesciunt illo nulla odio? Quidem nesciunt, omnis at quo aliquam porro amet fugit mollitia minus explicabo, possimus deserunt rem ut commodi laboriosam quia. Numquam, est facilis rem iste voluptatum. Cupiditate porro fuga saepe quis nulla mollitia, magni dicta soluta distinctio tempore voluptate quo perferendis. Maiores eveniet deleniti, nemo.</i></p>'
        },
        {
          id: 4,
          icon_class: 'glyphicon glyphicon-edit',
          icon_status: 'success',
          title: 'Started editing',
          controls: [],
          created: '24. Sep 14:48',
          body: '<p>Someone has started editing.</p>'
        },
        {
          id: 3,
          icon_class: 'glyphicon glyphicon-hand-right',
          icon_status: 'warning',
          title: 'Message delegated',
          controls: [],
          created: '23. Sep 11:12',
          body: '<p>This message has been delegated.</p>'
        },
        {
          id: 2,
          icon_class: 'glyphicon glyphicon-map-marker',
          icon_status: 'danger',
          title: 'Message approved and forwarded',
          controls: [],
          created: '20. Sep 15:56',
          body: '<p>Message has been approved and forwarded to responsible.</p>'
        },
        {
          id: 1,
          icon_class: 'glyphicon glyphicon-map-marker',
          icon_status: '',
          title: 'Message forwarded for approval',
          controls: [],
          created: '19. Sep 19:49',
          body: '<p>Message has been forwarded for approval.</p>'
        },
      ]
    };
  },
  watch: {
    pagina() {
      const view = this.$route.params.vista;
      const filters = this.getFilterView(view);

      console.log('aca si o no?', this.pagina);
      this.listDocuments({
        tipo: 'aprobaciones',
        campos: '*',
        pagina: this.pagina,
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
    }
  },
  computed: {
    ...mapGetters('Dnts', [
      'loading',
      'dntByFiles',
      'paginacion',
      'paginaActual',
      'fileCommentDetails'
    ]),
    pagina: {
      get() {
        return this.paginaActual;
      },
      set(value) {
        this.actualizarPagina(value);
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'listDocuments',
      'actualizarPagina',
      'getFileDetails',
      'downloadFilePDF'
    ]),
    getCommentsFile(file) {
      this.getFileDetails({
        aprobacionId: file.solicitanteDocumentoId,
        ejecucionId: file.febosId
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
    cancelFile(file) {
      this.cancelModal = true;
      console.log('file', file);
    },
    translateTime: (time, abr) => { // ASCO
      const seconds = time * 60;
      const numdays = Math.floor(seconds / 86400);
      const numhours = Math.floor((seconds % 86400) / 3600);
      const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);

      if (numdays !== 0) {
        if (abr) {
          return `${numdays } d ${ numhours } hrs ${ numminutes } min `;
        }
        return `${numdays } dias ${ numhours } horas ${ numminutes } minutos `;
      }

      if (numdays === 0 && numhours !== 0) {
        if (abr) {
          return `${numhours } hrs ${ numminutes } min `;
        }
        return `${numhours } horas ${ numminutes } minutos `;
      }

      if (numdays === 0 && numhours === 0 && numminutes !== 0) {
        if (abr) {
          return `${numminutes } min `;
        }
        return `${numminutes } minutos `;
      }

      if (numminutes === 0) {
        if (abr) {
          return `${numminutes } min`;
        }
        return `${numminutes } minutos`;
      }
      return numminutes;
    } // END ASCO, o no?
  },
  mounted() {
    const view = this.$route.params.vista;
    const filters = this.getFilterView(view);
    this.listDocuments({
      tipo: 'aprobaciones',
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
</style>
