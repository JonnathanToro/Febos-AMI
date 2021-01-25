<template>
  <div>
    <vs-tabs>
      <vs-tab label="Adjuntos">
        <vs-table stripe :data="fileCommentDetails" v-if="Object.keys(fileCommentDetails).length">
          <template slot="header">
          </template>
          <template slot="thead">
            <vs-th>
              Usuario
            </vs-th>
            <vs-th>
              Documento
            </vs-th>
            <vs-th>
              Ver
            </vs-th>
          </template>

          <template>
            <tbody  v-for="(comment, index) in fileCommentDetails"
                    :key="index">
            <vs-tr :key="indextr" v-for="(doc, indextr) in comment.documentos" >
              <vs-td>
                {{comment.nombre}}
              </vs-td>

              <vs-td>
                {{doc.nombre}}
              </vs-td>

              <vs-td>
                <DownloadFile :path="doc.adjuntoUrl" :name="doc.nombre" :mood="'compact'"/>
              </vs-td>
            </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </vs-tab>
      <vs-tab label="Comentarios">
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
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import DownloadFile from '@/febos/chile/dnt/components/DownloadFile';

export default {
  name: 'PopUpDetailFile',
  components: { DownloadFile },
  props: {
    fileCommentDetails: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('Dnts', [
      'loading',
      'error',
      'successAccion'
    ])
  },
  methods: {
    ...mapActions('Dnts', [
      'downloadFilePDF'
    ])
  }
};
</script>
<style scoped>

.pill-info {
  border: 1px solid #3ca2d6;
  padding: 1px 5px;
  border-radius: 10px;
  font-size: 12px;
  margin-right: 20px;
  cursor:pointer;
}
</style>
