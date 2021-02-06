<template>
  <vs-popup title="Comentarios Expediente" :active.sync="showModal">
    <div style="display: flex;flex-direction: column;">
      <template style="background: pink;height:200px; overflow-y:scroll">
        <div
          v-for="comment in commentsEd"
          :key="comment.comentarioId"
        >
          <div class="pill-comment-user" v-if="comment.usuarioId !== currentUserId">
            <vs-list-item
              :title="comment.comentario"
              :subtitle="comment.usuarioComentario">
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
              :subtitle="comment.usuarioComentario">
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
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpCommentsFile',
  props: {
    file: {
      type: [Object]
    }
  },
  data() {
    return {
      newComment: {
        comment: ''
      },
      counterDanger: false,
    };
  },
  computed: {
    ...mapGetters('Dnts', [
      'commentsEd'
    ]),
    ...mapGetters('Usuario', [
      'currentUserId'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'commentsFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'sendDntComment',
      'getFileComments'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    async sendNewComment() {
      await this.sendDntComment({
        febosId: this.file.febosId,
        comentario: this.newComment.comment
      });
      await this.getFileComments({
        febosId: this.file.febosId
      });

      this.newComment = {
        comment: ''
      };
    },
  }
};
</script>
<style>

.m-top-20 {
  margin-top: 20px;
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
