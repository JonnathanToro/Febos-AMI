import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      timer: null
    };
  },
  methods: {
    ...mapGetters('Usuario', [
      'isSessionAlive',
      'currentUserId'
    ]),
    ...mapActions('Usuario', {
      latido: 'heartbeat'
    }),
    keepAliveSession() {
      if (this.isSessionAlive()) {
        this.latido(this.currentUserId);
      }
    }
  },
  onIdle() {
    /*
    cuando entra en estado
    IDLE quiere decir que el usuario hace 15 minutos que no hace nada en la pagina
    ni siquiera mueve el mouse, entonces se deja de enviar el heartbeat a Febos
   */
    clearInterval(this.timer);
    this.keepAliveSession();
  },
  onActive() {
    // se mantiene viva la sesion, mandando un hearbeat a Febos cada 10 minutos
    this.keepAliveSession();
    this.timer = setInterval(() => {
      this.keepAliveSession();
    }, 1000 * 60 * 10); // 10 minutos
  }
};
