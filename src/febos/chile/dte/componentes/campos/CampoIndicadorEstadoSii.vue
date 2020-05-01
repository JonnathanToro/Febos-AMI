<template>
  <vx-tooltip :text="estados[estado].tooltip" position="top">
    <vs-icon :icon="estados[estado].icono" size="medium" :bg="estados[estado].color" round color="#ffffff"></vs-icon>
  </vx-tooltip>
</template>

<script>
  export default {
    name: "CampoIndicadorEstadoSii",
    props: {
      documento: {
        type: Object,
      },
    },
    data() {
      return {
        estado:this.documento.estadoSii,
        //estado:20,
        estados:{
          0:{
            icono:"add",
            color:"gray",
            tooltip:"Creado"
          },
          1:{
            icono:"schedule",
            color:"orange",
            tooltip:"Pendiente de envío al SII"
          },
          2:{
            icono:"send",
            color:"#2A3FD8",
            tooltip:"Enviado al SII"
          },
          3:{
            icono:"cancel_schedule_send",
            color:"red",
            tooltip:"Error al enviar al SII"
          },
          4:{
            icono:"check_circle_outline",
            color:"green",
            tooltip:"Aceptado por el SII"
          },
          5:{
            icono:"done",
            color:"#D4CC26",
            tooltip:"Aceptado con reparos por el SII"
          },
          6:{
            icono:"close",
            color:"red",
            tooltip:"Rechazado por el SII"
          },
          7:{
            icono:"schedule",
            color:"#D4CC26",
            tooltip:"Pendiente de consulta en el SII"
          },
          8:{
            icono:"error_outline",
            color:"red",
            tooltip:"Error al consultar en el SII"
          },
          9:{
            icono:"mail_outline",
            color:"#2A3FD8",
            tooltip:"Ensobrado"
          },
          10:{
            icono:"not_interested",
            color:"black",
            tooltip:"Anulado"
          },
          20:{
            icono:"schedule",
            color:"#D4CC26",
            tooltip:"Pendiente de validación"
          }
        }
      }
    },
    computed: {},
    created() {

    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>

</style>
