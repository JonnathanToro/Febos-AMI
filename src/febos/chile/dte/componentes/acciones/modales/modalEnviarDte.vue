<template>
  <div>
    <div class="mt-5">
      <div>
        <h3>Formulario de Envío</h3>
        <br />
      </div>
      <div class="centerx">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
              color="danger"
              label-placeholder="Destinatario (ej: msalas@gmail.com) *"
              v-model="envio.destinatario"
            />
          </div>
        </div>
        <ul class="demo-alignment">
          <li>
            <vs-checkbox color="danger" v-model="envio.adjuntarXml">Adjuntar XML</vs-checkbox>
          </li>
        </ul>
        <ul class="demo-alignment">
          <li>
            <vs-checkbox color="danger" v-model="envio.adjuntarPdf">Adjuntar PDF</vs-checkbox>
            <p>
              <small>(Debe seleccionar al menos uno) *</small>
            </p>
          </li>
        </ul>
        <ul class="demo-alignment">
          <li>
            <vs-checkbox color="danger" v-model="envio.recibirCopia">Recibir Copia</vs-checkbox>
          </li>
        </ul>
        <br />
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
              color="danger"
              label-placeholder=" Con Copia a Otros (ej: jperez@gmail.com,pjdiego@empresa.com,supervisor@mail.com)"
              v-model="envio.copias"
            />
          </div>
        </div>
        <br />
        <div>
          <vs-textarea label="Mensaje" v-model="envio.mensaje" />
        </div>
      </div>
    </div>
    <div align="center">
      <div>
        <vs-alert title="Alerta" class="mensaje" :active="respuesta" color="success">
          DTE Enviada correctamente
        </vs-alert>
        <vs-alert title="Alerta"  :active="respuesta == false" color="danger">
          La DTE no ha sido enviada, verifique el destinatario y que el mensaje tenga un largo minimo de 10 caracteres.
        </vs-alert>
      </div>
    </div>
    <div align="right">
      <div>
        <vs-button :disabled="activo" color="primary" type="filled submit" v-on:click="enviarDte">Si, envialo</vs-button>
        <vs-button color="primary" type="border" v-on:click="cerrarVentana">No, me arrepenti</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import modalStore from "@/store/modals/acciones";
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";

export default {
  name: "modalEnviarDte",
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
        mensaje: "",
        destinatario: "",
        copias:"",
      },
      activo: false,
      respuesta: null
    };
  },
  mounted() {
    console.log("OBJETO", this.getData.febosId);
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
      //this.confirmaCierre();
      // this.alertaCierre();
    },
     enviarDte(){
      this.$vs.loading({ color: "#ff8000", text: "Espera un momento por favor" });
      this.activo = true;

      if(this.envio.adjuntarXml == true){
        this.envio.adjuntarXml = "si";
      }else{
        this.envio.adjuntarXml = "no";
      }
      if(this.envio.adjuntarPdf == true){
        this.envio.adjuntarPdf = "si";
      }else{
        this.envio.adjuntarPdf = "no";
      }
      if(this.envio.recibirCopia == true){
        this.envio.recibirCopia = "si";
      }else{
        this.envio.recibirCopia = "no";
      }

       clienteFebosAPI.post("/documentos/" + this.getData.febosId + "/envio", this.envio).then((response) => {

        if(response.data.codigo == 10) {
          this.respuesta = true;
        }else{
          this.respuesta = false;
          this.activo = false;
        }
        this.$vs.loading.close();
      });

      this.envio.adjuntarXml = false;
      this.envio.adjuntarPdf = true;
      this.envio.recibirCopia = true;
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
