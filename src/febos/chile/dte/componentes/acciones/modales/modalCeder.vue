<template>
  <div>
    <div class="mt-5">
      <div>
        <h3>Datos del Cesionario</h3>
        <br />
        <div class="vx-row mb-2">
          <div class="vx-col w-full margen-inferior">
            <vs-input color="danger" label-placeholder="Rut 11111111-1" type="text" v-model="ceder.cesionarioRut"  />
          </div>
          <div class="vx-col w-full margen-inferior">
            <vs-input color="danger" label-placeholder="Razón" type="text" v-model="ceder.cesionarioRazonSocial"  />
          </div>
          <div class="vx-col w-full margen-inferior">
            <vs-input color="danger" label-placeholder="Dirección" type="text" v-model="ceder.cesionarioDireccion"  />
          </div>
          <div class="vx-col w-full margen-inferior">
            <vs-input color="danger" label-placeholder="Correo" required type="email" v-model="ceder.cesionarioMail"  />
          </div>
        </div>
      </div>
      <br />
      <div>
        <h3>Datos de Contacto de Cesión</h3>
        <br />
        <div class="vx-row mb-2 ">
          <div class="vx-col w-full margen-inferior">
            <vs-input color="danger" label-placeholder="Nombre" type="text" v-model="ceder.contactoNombreContacto" />
          </div>
          <div class="vx-col w-full margen-inferior">
            <vs-input color="danger" label-placeholder="Correo Notificación" type="email" v-model="ceder.contactoEmailContato"  />
          </div>
          <div class="vx-col w-full margen-inferior">
            <vs-input color="danger" label-placeholder="Teléfono" type="number" v-model="ceder.contactoTelefonoContacto" />
          </div>
        </div>
      </div>
    </div>
    <br />
    <div align="center">
      <div class="margin-bot">
        <vs-alert title="Alerta" class="mensaje" :active="respuesta" color="success">
          Cesion realizada correctamente
          <br>
        </vs-alert>
        <vs-alert title="Alerta"  :active="respuesta == false" color="danger">
          <div v-if="error">
            {{ error }}
          </div>
          <div v-else>
            Error al realizar la operación, reintente o contacte a soporte
          </div>
          <br>
        </vs-alert>
      </div>
    </div>
    <div align="right">
      <div>
        <vs-button color="primary" type="filled" v-on:click="enviarCeder()">Si, Cedelo</vs-button>
        <vs-button color="primary" type="border" v-on:click="cerrarVentana()">No, me arrepenti</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import modalStore from "@/store/modals/acciones";
import clienteFebosAPI from "../../../../../servicios/clienteFebosAPI";

export default {
  name: "modalCeder",
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  mounted() {
    this.ceder.febosId = this.getData.febosId
  },
  data() {
    return {
      ceder: {
        cesionarioRut: '',
        cesionarioRazonSocial: '',
        cesionarioDireccion: '',
        cesionarioMail: '',
        contactoNombreContacto: '',
        contactoEmailContato: '',
        contactoTelefonoContacto: '569',
        febosId: null
      },
      respuesta: null,
      error: null
    }
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
      //this.confirmaCierre();
      // this.alertaCierre();
    },
    enviarCeder() {
      console.log("DATOS: ", this.ceder);
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      clienteFebosAPI.post("/sii/dte/cesion", this.ceder).then((response) => {
        console.log(response);
        if(response.data.codigo == 10) {
          this.respuesta = true;
          this.$vs.loading.close();
        }else{
          if (response.data.codigo == 162) {
            this.error = response.data.mensaje
          }
          this.respuesta = false;
          this.$vs.loading.close();
        }
      }).catch(() => {
        this.respuesta = false;
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
.margen-inferior {
  margin-bottom: 15px;
}
</style>
