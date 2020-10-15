<template>
  <div>
    <div class="mt-5">
      <div>
        <h3>Datos del Cesionario</h3>
        <br />
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input color="danger" label-placeholder="Rut" v-model="ceder.cesionarioRut"  />
          </div>
          <div class="vx-col w-full">
            <vs-input color="danger" label-placeholder="Razón" v-model="ceder.cesionarioRazonSocial"  />
          </div>
          <div class="vx-col w-full">
            <vs-input color="danger" label-placeholder="Dirección" v-model="ceder.cesionarioDireccion"  />
          </div>
          <div class="vx-col w-full">
            <vs-input color="danger" label-placeholder="Correo" v-model="ceder.cesionarioMail"  />
          </div>
        </div>
      </div>
      <br />
      <div>
        <h3>Datos de Contacto de Cesión</h3>
        <br />
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input color="danger" label-placeholder="Nombre" v-model="ceder.contactoNombreContacto" />
          </div>
          <div class="vx-col w-full">
            <vs-input color="danger" label-placeholder="Correo Notificación" v-model="ceder.contactoEmailContato"  />
          </div>
          <div class="vx-col w-full">
            <vs-input color="danger" label-placeholder="Teléfono +569" v-model="ceder.contactoTelefonoContacto" />
          </div>
        </div>
      </div>
    </div>
    <br />
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

export default {
  name: "modalCeder",
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
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
        contactoTelefonoContacto: ''
      }

    };
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
      //this.confirmaCierre();
      // this.alertaCierre();
    },
    enviarCeder() {
      this.ceder.push({
        cesionarioRut : this.cesionarioRut,
        cesionarioRazonSocial : this.cesionarioRazonSocial,
        cesionarioDireccion : this.cesionarioDireccion,
        cesionarioMail : this.cesionarioMail,
        contactoNombreContacto : this.contactoNombreContacto,
        contactoEmailContato : this.contactoEmailContato,
        contactoTelefonoContacto : this.contactoTelefonoContacto
      })
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
</style>
