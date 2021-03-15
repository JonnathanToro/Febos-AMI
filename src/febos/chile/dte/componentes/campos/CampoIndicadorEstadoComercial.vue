<template>
  <vx-tooltip :text="estados[estado].tooltip" position="top">
    <vs-icon :icon="estados[estado].icono" size="medium" :color="estados[estado].color"></vs-icon>
  </vx-tooltip>
</template>

<script>
export default {
  name: 'CampoIndicadorEstadoComercial',
  props: {
    documento: {
      type: Object,
    },
  },
  data() {
    return {
      estado: this.documento.estadoComercial,
      // estado:5,
      /*

        SIN_ACCION(0),
        ACEPTADO(1),
        ACEPTADO_SII(2),
        RECHAZADO(3),
        RECHAZADO_SII(4),
        RECLAMO_PARCIAL_SII(5),
        RECLAMO_TOTAL_SII(6),
        RECIBO_MERCADERIAS_SII(7),;
         */
      estados: {
        0: {
          icono: 'visibility',
          color: 'gray',
          tooltip: 'Sin gestión comercial'
        },
        1: {
          icono: 'done',
          color: 'green',
          tooltip: 'Pre-Aceptado comercialmente'
        },
        2: {
          icono: 'done_all',
          color: 'green',
          tooltip: 'Aceptado comercialmente con vinculación al SII'
        },
        3: {
          icono: 'pan_tool',
          color: 'red',
          tooltip: 'Pre-Rechazado comercialmente'
        },
        4: {
          icono: 'clear',
          color: 'red',
          tooltip: 'Rechazado comercialmente con vinculación al SII'
        },
        5: {
          icono: 'error',
          color: '#D4CC26',
          tooltip: 'Reclamado parcialmente en el SII'
        },
        6: {
          icono: 'error',
          color: 'red',
          tooltip: 'Reclamado totalmente en el SII'
        },
        7: {
          icono: 'verified_user',
          color: 'green',
          tooltip: 'Recepción de servicios y mercaderías en el SII'
        },
        8: {
          icono: 'check_outline',
          color: 'green',
          tooltip: 'Aceptado por omisión en el SII'
        },
        10: {
          icono: 'visibility',
          color: 'gray',
          tooltip: 'Sin gestión comercial'
        },
      }
    };
  }
};
</script>

<style scoped>

</style>
