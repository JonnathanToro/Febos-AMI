<template>
  <h4>You are in home.</h4>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('Usuario', ['currentUser'])
  },
  methods: {
    ...mapActions('Usuario', ['signIn'])
  }
};
</script>

<style lang="scss">
/*
.chat-card-log {
  height: 400px;

  .chat-sent-msg {
    background-color: #f2f4f7 !important;
  }
}
*/
</style>
