<template>
  <vx-card :title="configuracion.titulo">
    <table id="listado-documentos">
      <thead>
      <tr>
        <th class="selector">
          <vs-checkbox></vs-checkbox>
        </th>
        <th v-for="(campo,index) in campos" :key="index" :width="campo.ancho">{{ campo.nombre }}</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td :colspan="campos.length + 2" v-if="!cargandoDocumentos && documentos.length == 0" class="mensaje-tabla">
          No se encontraron documentos
        </td>
      </tr>
      <template v-for="doc in documentos">
        <tr :key="doc.febosId" class="fila" v-on:dblclick="mostrarInfoExtendida(doc)">
          <td class="selector">
            <vs-checkbox></vs-checkbox>
          </td>
          <td v-for="(campo,index) in campos" :key="index">
            <component :is="cargarComponenteCampo(campo.campo)" :documento="doc"></component>
          </td>
          <td>
            <AccionesWrapper :acciones="configuracion.acccionesIndividuales" :documento="doc"></AccionesWrapper>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <fb-paginacion :total="paginasTotales" :max="10" v-model="pagina" class="mt-10"></fb-paginacion>

    <vs-popup fullscreen title="Información extendida" :active.sync="informacionExtendida"
              @keyup.enter.native="informacionExtendida = false">

    </vs-popup>
  </vx-card>
</template>

<script>
  import CamposListadoFacturaElectronicaMixin from "../mixins/CamposListadoFacturaElectronicaMixin";
  import AccionesWrapper from "../componentes/AccionesWrapper";
  import configVistas from "./configVistas";
  import {mapActions, mapState} from 'vuex'
  import FbPaginacion from "../../_vue/componentes/FbPaginacion";

  export default {
    components: {AccionesWrapper, FbPaginacion},
    mixins: [CamposListadoFacturaElectronicaMixin],
    data() {
      return {
        informacionExtendida: false,
        configuracion: configVistas[this.$route.params.categoria][this.$route.params.vista],
        componentes: {},
        pagina: 1,
        paginax: 1,
        registrosPorPagina: 15,
        camposApi: '',
        filtrosFijos: configVistas[this.$route.params.categoria][this.$route.params.vista].filtrosFijos,
        filtrosPorDefecto: configVistas[this.$route.params.categoria][this.$route.params.vista].filtrosPorDefecto,
        filtrosVariables: configVistas[this.$route.params.categoria][this.$route.params.vista].filtrosVariables
      }
    },
    watch: {
      pagina(nuevoValor) {
        //console.log("CAMBIO DE PAGINA",nuevoValor);
        this.listar(nuevoValor);
      },
      cargandoDocumentos(nuevoValor) {
        if (nuevoValor) {
          this.$vs.loading({
            container: '#listado-documentos',
            scale: 0.6
          });
        } else {
          this.$vs.loading.close('#listado-documentos > .con-vs-loading')
        }
      }
    },
    computed: {
      ...mapState('Dtes', {
        cargandoDocumentos: state => state.cargando,
        documentos: state => state.documentos,
        documentosSeleccionados: state => state.documentosSeleccionados,
        documentoActual: state => state.documentoActual,
        paginaActual: state => state.paginaActual,
        paginasTotales: state => state.paginasTotales,
        registrosEncontrados: state => state.registrosEncontrados,
        filtros: state => state.filtros,
        campos: state => state.campos,
      }),
      campos() {
        let campos = [];
        var self = this;
        this.configuracion.campos.forEach(function (obj) {
          campos.push(self.obtenerCampoTabla(obj));
        });
        return campos;
      }
    },
    methods: {
      ...mapActions("Dtes", {
        listarDocumentos: "listarDocumentos",
        setDocumentoActual: "setDocumentoActual",
      }),
      cargarComponenteCampo(nombreCampo) {
        if (!this.componentes[nombreCampo]) {
          this.componentes[nombreCampo] = () => import(`@/febos/chile/dte/componentes/campos/Campo${nombreCampo}.vue`);
        }
        return this.componentes[nombreCampo];
      },
      listar(pagina) {
        console.log("listando documentos");
        this.listarDocumentos({
          categoria: this.configuracion.categoria,
          inicio: pagina,
          cantidad: this.registrosPorPagina,
          consulta: this.camposApi,
          filtros: "rutEmisor:76179952-5|fechaCreacion:2020-04-01--2020-05-01|tipoDocumento:33,34,43,46,56,61,110,111,112|estadoSii:0,1,2,3,4,5,6,7,8,9|incompleto:N",
          orden: "-fechaCreacion",
          dominioPortal: window.location.hostname,
        })
      },
      extraerCampos() {
        var campos = [];
        this.campos.forEach(function (item) {
          campos = campos.concat(item.camposApi);
        });
        this.camposApi = campos.join(',');
      },
      mostrarInfoExtendida(documento) {
        this.setDocumentoActual(documento);
        this.informacionExtendida = true;

      }
    },
    mounted() {
      this.extraerCampos();
      this.listar(1);
    }

  }
</script>
<style lang="css">
  table {
    border-spacing: 0;
    width: 100%;
  }

  .selector {
    width: 10px;
    padding-left: 2px;
    padding-right: 0px;
  }

  th.selector > div > span.checkbox_x.vs-checkbox {
    border: 2px solid #ffffff !important;
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

  .acciones {
    cursor: pointer;
  }

  .mensaje-tabla {
    text-align: center;
  }

  .fila:hover {
    background-color: #efefef;
  }
</style>
