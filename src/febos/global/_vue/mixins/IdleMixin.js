import {mapActions, mapGetters, mapState} from "vuex";

export default {
  data() {
    return {
      _keepAliveSession: {}
    }
  },
  methods: {
    ...mapGetters('Usuario', {
      sesionEstaActiva: 'sesionEstaActiva',
    }),
    ...mapActions('Usuario', {
      latido: 'latido',
    }),
    _mantenerSesionActiva(){
      if (this.sesionEstaActiva()) {
        this.latido(self._usuarioId);
      }
    }
  },
  computed: {
    ...mapState('Usuario', {_usuarioId: 'id'})
  },
  onIdle() {
    // cuando entra en estado IDLE quiere decir que el usuario hace 15 minutos que no hace nada en la pagina
    // ni siquiera mueve el mouse, entonces se deja de enviar el heartbeat a Febos
    clearInterval(this._keepAliveSession)
    this._mantenerSesionActiva();
  },
  onActive() {
    // se mantiene viva la sesion, mandando un hearbeat a Febos cada 10 minutos
    this._mantenerSesionActiva();
    var self = this;
    this._keepAliveSession = setInterval(function () {
      self._mantenerSesionActiva();
    }, 1000 * 60 * 10); //10 minutos
  }
}
