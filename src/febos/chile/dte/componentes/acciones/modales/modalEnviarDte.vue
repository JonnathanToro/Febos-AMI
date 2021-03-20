<template>
  <div>
    <form data-vv-scope="envioDTE">
      <div class="centerx">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
              label="Correo del destinatario"
              maxlength="100"
              type="email"
              v-model="envio.destinatario"
              class="w-full"
              name="destinatario"
              v-validate="'required|email'"/>
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('destinatario')" >Debe ingresar un email válido</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col md:w-1/3 w-full">
            <vs-checkbox color="danger" v-model="envio.adjuntarXml">Adjuntar XML</vs-checkbox>
          </div>
          <div class="vx-col md:w-1/3 w-full">
            <vs-checkbox color="danger" v-model="envio.adjuntarPdf">Adjuntar PDF</vs-checkbox>
          </div>
          <div class="vx-col md:w-1/3 w-full">
            <vs-checkbox color="danger" v-model="envio.recibirCopia">Recibir Copia</vs-checkbox>
          </div>
        </div>
        <div class="vx-row mb-2 mt-2">
          <div class="vx-col w-full">
            <vs-input
              label="Copias (correos electrónicos separados por coma)"
              maxlength="150"
              type="email"
              v-model="envio.copias"
              class="w-full"
              name="copias"/>
          </div>
        </div>
        <br />
        <div>
          <vs-textarea label="Mensaje" v-model="envio.mensaje" name="mensaje" v-validate="'required|min:10'" />
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('mensaje')" >Debe definir un mensaje de al menos 10 caracteres</span>
        </div>
      </div>
    </form>
    <div align="right">
      <div>
        <vs-button  color="primary" type="filled submit" v-on:click="enviarDte">Enviar</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import modalStore from '@/store/modals/acciones';
import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';

export default {
  name: 'modalEnviarDte',
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  data() {
    return {
      envio: {
        adjuntarXml: false,
        adjuntarPdf: true,
        recibirCopia: true,
        mensaje: '',
        destinatario: '',
        copias: '',
      },
      respuesta: null
    };
  },
  mounted() {
  },
  methods: {
    getError(par) {
      const retorno = null;
      const ret = this.errors.items.find((elemento) => elemento.field == par);
      if (ret !== undefined && retorno === null) {
        if (par == 'email' && ret.rule == 'email') {
          return 'email';
        }
        if (ret.rule == 'required') {
          return 'required';
        }
      }
      return null;
    },
    cerrarVentana() {
      modalStore.commit('ocultarBitacora');
    },
    enviarDte() {
      this.$validator.validateAll('envioDTE').then((result) => {
        if (result) {
          this.__enviarDte();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Envío DTE', text: 'Debe ingresar todos los datos requeridos'
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    __enviarDte() {
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      this.envio.adjuntarXml = (this.envio.adjuntarXml == true) ? 'si' : 'no';
      this.envio.adjuntarPdf = (this.envio.adjuntarPdf == true) ? 'si' : 'no';
      this.envio.recibirCopia = (this.envio.recibirCopia == true) ? 'si' : 'no';
      clienteFebosAPI.post(`/documentos/${ this.getData.febosId }/envio`, this.envio).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Envío DTE', text: 'DTE enviado.'
          });
          this.cerrarVentana();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Envío DTE', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, time: 10000
          });
        }
      }).catch((error) => {
        console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Envío DTE', text: 'No fue posible enviar el documento', time: 10000
        });
        this.$vs.loading.close();
      });
    }

  },
};
</script>

<style>
.con-vs-popup .vs-popup {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  z-index: 100;
  width: 35%;
  margin: 10px;
  max-width: calc(100% - 30px);
  max-height: calc(100% - 30px);
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  -webkit-animation: rebound 0.3s;
  animation: rebound 0.3s;
}
.vs-input--input {
  color: inherit;
  position: relative;
  padding: 0.4rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  width: 100%;
}
.is-label-placeholder {
  width: 100%;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
  padding: -0.25rem 2rem;
  margin: 10px;
}
.mensaje{
  height: 15px;
  padding-bottom: 5px;
}
</style>
