<template>
  <div />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      timer: null
    };
  },
  methods: {
    ...mapGetters('Usuario', [
      'isSessionAlive'
    ]),
    ...mapActions('Usuario', [
      'heartbeat',
      'signOut'
    ]),
    logOut() {
      this.signOut();
      this.$router.push('/ingreso');
      this.$vs.dialog({
        color: 'danger',
        title: 'Ups!',
        text: 'Después 15 minutos ausente, hemos cerrado tu sesión. Por tu seguridad.',
        acceptText: 'Ok'
      });
    },
    keepAliveSession() {
      if (!this.isSessionAlive()) {
        this.logOut();
        return;
      }

      this.heartbeat();
    },
  },
  onIdle() {
    /*
    cuando entra en estado
    IDLE quiere decir que el usuario hace 15 minutos que no hace nada en la pagina
    ni siquiera mueve el mouse, entonces se deja de enviar el heartbeat a Febos
   */
    clearInterval(this.timer);
    this.logOut();
  },
  mounted() {
    // se mantiene viva la sesion, mandando un hearbeat a Febos cada 10 minutos
    this.keepAliveSession();
    this.timer = setInterval(
      () => this.keepAliveSession(),
      1000 * 60 * 10 // 10 minutos
    );
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
