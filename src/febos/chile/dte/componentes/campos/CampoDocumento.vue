<template>
  <div>
    <span class="razonSocial">{{ razonSocial }}</span>
    <div>
      <vs-chip :color="colores.navbar">
        Factura Electrónica
      </vs-chip>
      <vs-chip color="#aaa">
        # 432
      </vs-chip>
      <vs-chip color="primary">
        29 días
      </vs-chip>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "CampoDocumento",
    props: {
      documento: {
        type: Object,
      },
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('Empresas', {
        iut: state => state.iut,
      }),
      ...mapState('Personalizacion', {
        colores: state => state.colores,
      }),
      razonSocial() {
        if (this.iut != this.documento.rutEmisor) {
          return this.documento.razonSocialReceptor;
        } else return this.documento.razonSocialEmisor;
      }
    },
    created() {

    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
  .razonSocial{
    font-size:90%;
    font-weight: bold;
  }
</style>
