<template>
  <div>
    <table>
      <thead>
      <tr>
        <th class="selector">
          <vs-checkbox color="#ffffff"></vs-checkbox>
        </th>
        <th v-for="(campo,index) in campos" :key="index" :width="campo.ancho">{{ campo.nombre }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="doc in documentos" :key="doc.febosId">
        <td class="selector">
          <vs-checkbox></vs-checkbox>
        </td>
        <td v-for="(campo,index) in campos" :key="index">
          <component :is="cargarComponenteCampo(campo.campo)" :documento="doc"></component>
        </td>
      </tr>
      </tbody>
    </table>
    <vs-pagination :total="totalPaginas" :value="paginaActual" class="mt-10"></vs-pagination>
  </div>
</template>

<script>
import CamposListadoFacturaElectronicaMixin from '@/febos/chile/dte/mixins/CamposListadoFacturaElectronicaMixin';

export default {
  name: 'Tabla',
  mixins: [CamposListadoFacturaElectronicaMixin],
  props: {
    respuestaApi: Object,
    config: Object
  },
  data() {
    return {
      componentes: {},
      documentosSeleccionados: []
    };
  },
  computed: {
    paginaActual() {
      return this.respuestaApi.pagina;
    },
    totalPaginas() {
      return this.respuestaApi.paginas;
    },
    documentos() {
      return this.respuestaApi.documentos;
    },
    campos() {
      const campos = [];
      const self = this;
      this.config.campos.forEach((obj) => {
        campos.push(self.obtenerCampoTabla(obj));
      });
      return campos;
    }
  },
  created() {

  },
  methods: {
    cargarComponenteCampo(nombreCampo) {
      if (!this.componentes[nombreCampo]) {
        this.componentes[nombreCampo] = () => import(`@/febos/chile/dte/componentes/campos/Campo${nombreCampo}.vue`);
      }
      return this.componentes[nombreCampo];
    }
  },
  mounted() {

  }
};
</script>

<style lang="css">
  table {
    border-spacing: 0;
    width: 100%;
  }

 /* th.selector {
    background-color: white;
  }
*/
  .selector {
    width: 10px;
    padding-left: 2px;
    padding-right: 0px;
  }

  tr th {
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    font-size: 100%;
    background-color: rgba(var(--vs-primary), 1);
    color: white;
  }

  th, td {
    padding: 0.5em 1em;
    border-top: 1px solid rgba(var(--vs-primary), 1);;
  }

  tr:last-child td {
    border-bottom: 1px solid rgba(var(--vs-primary), 1);;
  }

  th:first-child, td:first-child {
    border-left: 1px solid rgba(var(--vs-primary), 1);;
  }

  th:last-child, td:last-child {
    border-right: 1px solid rgba(var(--vs-primary), 1);
  }

  thead tr:first-child th:first-child {
    border-radius: 0.6em 0 0 0;
  }

  thead tr:first-child th:last-child {
    border-radius: 0 0.6em 0 0;
  }

  tbody tr:last-child td:first-child {
    border-radius: 0 0 0 0.6em;
  }

  tbody tr:last-child td:last-child {
    border-radius: 0 0 0.6em 0;
  }
</style>
