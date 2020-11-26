<template>
  <vx-card :title="configuracion.titulo">
    <template slot="actions">
      <span>
        Viendo documentos que ingresaron
      </span>
      <span v-if="periodoSeleccionado.valor != 'personalizado'">
        {{ periodoSeleccionado.nombre }}
      </span>
      <span v-if="periodoSeleccionado.valor == 'personalizado'">
        entre el
        <!--<input type="date" class="fecha" v-model="periodoDesde">-->
        <datetime v-model="periodoDesde" input-class="fecha" :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}" value-zone="local" format="yyyy-MM-dd"></datetime>
        y el
        <datetime v-model="periodoHasta" input-class="fecha" :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}" value-zone="local" format="yyyy-MM-dd"></datetime>
      </span>
      <vs-dropdown style="margin-left: 15px">
        <a class="a-icon" href="#">
          Cambiar
          <vs-icon class="" icon="expand_more"></vs-icon>
        </a>
        <vs-dropdown-menu>
          <vs-dropdown-item style="width:200px" v-for="periodo in periodos" :key="periodo.valor" v-on:click.native="seleccionarPeriodo(periodo)">
            {{ periodo.nombre }}
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </template>

    <filtros :configuracion-vista="configuracion" :periodos="periodos"  v-on:filtros-aplicados="manipularFiltros"></filtros>
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
        <tr :key="doc.febosId + random()" class="fila" v-on:dblclick="mostrarInfoExtendida(doc)">
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
    <vs-row>
      <vs-col vs-offset="2" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <info-tabla-basica :items-de-esta-pagina="documentos.length" :items-por-pagina="registrosPorPagina"
                           :pagina="pagina" :registros-totales="registrosEncontrados"></info-tabla-basica>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="3">
        <selector-cantidad-registros v-model="registrosPorPagina" class="mt-7"></selector-cantidad-registros>
      </vs-col>
      <vs-col vs-w="9">
        <fb-paginacion :total="paginasTotales" :max="10" v-model="pagina" class="mt-7"></fb-paginacion>
      </vs-col>
    </vs-row>


    <vs-popup fullscreen title="Información extendida" :active.sync="informacionExtendida"
              @keyup.enter.native="informacionExtendida = false">
    </vs-popup>
  </vx-card>
</template>

<script>
  import Vue from 'vue';
  import CamposListadoFacturaElectronicaMixin from "../mixins/CamposListadoFacturaElectronicaMixin";
  import AccionesWrapper from "../componentes/AccionesWrapper";
  import configVistas from "./configVistas";
  import {mapActions, mapState} from 'vuex'
  import FbPaginacion from "../../_vue/componentes/FbPaginacion";
  import SelectorCantidadRegistros from "../componentes/SelectorCantidadRegistros";
  import InfoTablaBasica from "../../../global/_vue/componentes/tabla/InfoTablaBasica";
  import Filtros from "../../../global/_vue/componentes/Filtros";
  import SelectorRangoFecha from "../componentes/SelectorRangoFecha";

  export default {
    components: {
      SelectorRangoFecha,
      Filtros, InfoTablaBasica, SelectorCantidadRegistros, AccionesWrapper, FbPaginacion},
    mixins: [CamposListadoFacturaElectronicaMixin],
    data() {
      return {
        periodos:[
          {nombre:'las últimas 4 semanas',valor:'ultimas4semanas'},
          {nombre:'éste mes',valor:'esteMes'},
          {nombre:'éste mes y el anterior',valor:'esteMesConAnterior'},
          {nombre:'los últimos 3 meses',valor:'ultimos3meses'},
          {nombre:'los últimos 6 meses',valor:'ultimos6meses'},
          {nombre:'* Rango personalizado',valor:'personalizado'}
        ],
        periodoSeleccionado: {nombre:'las últimas 4 semanas',valor:'ultimas4semanas'},
        periodoDesde:'',
        periodoHasta:'',
        informacionExtendida: false,
        configuracion: configVistas[process.env.VUE_APP_PORTAL][this.$route.params.categoria][this.$route.params.vista],
        componentes: {},
        pagina: 1,
        registrosPorPagina: 10,
        camposApi: '',
        filtrosFijos: configVistas[process.env.VUE_APP_PORTAL][this.$route.params.categoria][this.$route.params.vista].filtrosFijos,
        filtrosPorDefecto: configVistas[process.env.VUE_APP_PORTAL][this.$route.params.categoria][this.$route.params.vista].filtrosPorDefecto,
        filtrosVariables: configVistas[process.env.VUE_APP_PORTAL][this.$route.params.categoria][this.$route.params.vista].filtrosVariables,
        filtrosAplicados: "",
        filtrosDelComponente:"" //se actualiza con el componente de filtros
      }
    },
    watch: {
      pagina(nuevoValor) {
        //console.log("CAMBIO DE PAGINA",nuevoValor);
        this.listar(nuevoValor);
      },
      registrosPorPagina() {
        if(this.pagina==1){
          this.listar(1);
        }else {
          this.pagina = 1;
        }
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
      ...mapState('Empresas', {
        empresaActual: state => state.empresa,
      }),
      ...mapState('Dtes', {
        cargandoDocumentos: state => state.cargando,
        documentos: state => state.documentos,
        documentosSeleccionados: state => state.documentosSeleccionados,
        documentoActual: state => state.documentoActual,
        paginaActual: state => state.paginaActual,
        paginasTotales: state => state.paginasTotales,
        registrosEncontrados: state => state.registrosEncontrados,
       // filtros: state => state.filtros,
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
      manipularFiltros(filtros){
        this.filtrosDelComponente=filtros;
        this.filtros=`fechaCreacion:${this.periodoDesde}--${this.periodoHasta}`;
        if(filtros!=""){
          this.filtros+=`|${filtros}`;
        }
        this.listar(1);
      },
      seleccionarPeriodo(periodo){
        switch(periodo.valor){
          case 'ultimas4semanas':
            console.log("4");
            this.periodoDesde=Vue.moment().subtract(28, 'days').format('YYYY-MM-DD');
            this.periodoHasta=Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
            break;
          case 'esteMes':
            console.log("este");
            this.periodoDesde=Vue.moment().startOf('month').format('YYYY-MM-DD');
            this.periodoHasta=Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
            break;
          case 'esteMesConAnterior':
            console.log("este y el anteior");
            this.periodoDesde=Vue.moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
            this.periodoHasta=Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
            break;
          case 'ultimos3meses':
            console.log("3");
            this.periodoDesde=Vue.moment().subtract(2, 'month').startOf('month').format('YYYY-MM-DD');
            this.periodoHasta=Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
            break;
          case 'ultimos6meses':
            console.log("6");
            this.periodoDesde=Vue.moment().subtract(5, 'month').startOf('month').format('YYYY-MM-DD');
            this.periodoHasta=Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
            break;
        }
        this.periodoSeleccionado=periodo;
      },
      random() {
        return Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 25);
      },
      cargarComponenteCampo(nombreCampo) {
        if (!this.componentes[nombreCampo]) {
          this.componentes[nombreCampo] = () => import(`@/febos/chile/dte/componentes/campos/Campo${nombreCampo}.vue`);
        }
        return this.componentes[nombreCampo];
      },
      listar(pagina) {
        //console.log("listando documentos");
        console.log(this.periodoDesde,this.periodoHasta,this.periodoSeleccionado);
          this.listarDocumentos({
            categoria: this.configuracion.categoria,
            inicio: pagina,
            cantidad: this.registrosPorPagina,
            consulta: 'trackId,tipoDocumento,folio,rutEmisor,razonSocialEmisor,rutReceptor,razonSocialReceptor,rutCesionario,razonSocialCesionario,indicadorDeTraslado,fechaCesion,codigoSii,fechaEmision,fechaRecepcion,fechaRecepcionSii,plazo,estadoComercial,estadoSii,fechaReciboMercaderia,formaDePago,montoTotal,iva,contacto,correoReceptor,fechaCesion,tipo,monto,lugar,comentario,fecha,fechaVencimiento,medio,tpoTraVenta,tpoTranCompra,tpoTranCompraCodIva,externalId,indicadorDeMontoBruto,tieneAptobacionActiva,tieneNc,tieneNd,diasParaPago,estadoPagado,tieneAptobacionActivaNombre',//this.camposApi,
            filtros: this.filtros,//"rutEmisor:76179952-5|fechaCreacion:2020-05-01--2020-07-01|tipoDocumento:33,34,43,46,56,61,110,111,112|estadoSii:0,1,2,3,4,5,6,7,8,9|incompleto:N",
            orden: "-fechaCreacion",
            dominioPortal: window.location.hostname,
          });

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
    created(){
      this.periodoDesde=Vue.moment().subtract(28, 'days').format('YYYY-MM-DD');
      this.periodoHasta=Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
    },
    mounted() {
      this.extraerCampos();
      this.listar(1);
    }

  }
</script>
<style lang="css">



  input::-webkit-calendar-picker-indicator{
    padding-left: 0px;
    margin-left: 0px;


  }
  .fecha{
    width:185px;
    text-align:center;
    border: none;
    display: inline-block;
    border-bottom: dashed 1px #ccc;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    cursor: pointer;
  }

  table {
    border-spacing: 0;
    width: 100%;
    border-collapse: unset !important;
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
