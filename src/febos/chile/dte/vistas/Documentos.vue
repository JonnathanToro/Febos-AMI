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
        <datetime
          v-model="periodoDesde"
          input-class="fecha"
          :phrases="{ok: 'Seleccionar',
           cancel: 'Cancelar'}"
          value-zone="local"
          format="yyyy-MM-dd"
        />
        y el
        <datetime
          v-model="periodoHasta"
          input-class="fecha"
          :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
          value-zone="local"
          format="yyyy-MM-dd"
        />
      </span>
      <vs-dropdown style="margin-left: 15px">
        <a class="a-icon" href="#">
          Cambiar
          <vs-icon class="" icon="expand_more"></vs-icon>
        </a>
        <vs-dropdown-menu>
          <vs-dropdown-item
            style="width:200px"
            v-for="periodo in periodos"
            :key="periodo.valor"
            v-on:click.native="seleccionarPeriodo(periodo)"
          >
            {{ periodo.nombre }}
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </template>

    <filtros
      :configuracion-vista="configuracion"
      :periodos="periodos"
      v-on:filtros-aplicados="manipularFiltros"
    />
    <table id="listado-documentos">
      <thead>
      <tr>
        <th class="selector">
          <vs-checkbox></vs-checkbox>
        </th>
        <th v-for="(campo,index) in campos" :key="index" :width="campo.ancho">
          {{ campo.nombre }}
        </th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody v-if="!cargandoDocumentos && documentos.length == 0">
      <tr>
        <td :colspan="campos.length + 2" class="mensaje-tabla">
          No se encontraron documentos
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <template v-for="doc in documentos">
        <tr :key="doc.febosId + random()" class="fila" v-on:dblclick="mostrarInfoExtendida(doc)">
          <td class="selector">
            <vs-checkbox></vs-checkbox>
          </td>
          <td v-for="(campo,index) in campos" :key="index">
            <component :is="cargarComponenteCampo(campo.campo)" :documento="doc"></component>
          </td>
          <td>
            <AccionesWrapper
              :acciones="configuracion.acccionesIndividuales"
              :documento="doc"
            />
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <vs-row>
      <vs-col
        vs-offset="2"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="8"
        v-if="documentos"
      >
        <info-tabla-basica
          :items-de-esta-pagina="documentos.length"
          :items-por-pagina="registrosPorPagina"
          :pagina="pagina"
          :registros-totales="registrosEncontrados"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="3">
        <selector-cantidad-registros
          v-model="registrosPorPagina"
          class="mt-7"
        />
      </vs-col>
      <vs-col vs-w="9">
        <fb-paginacion
          :total="paginasTotales"
          :max="10"
          v-model="pagina"
          class="mt-7"
        />
      </vs-col>
    </vs-row>

    <vs-popup
      fullscreen
      title="Información extendida"
      :active.sync="informacionExtendida"
      @keyup.enter.native="informacionExtendida = false"
    >
    </vs-popup>
  </vx-card>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

import AccionesWrapper from '../componentes/AccionesWrapper';
import CamposListadoFacturaElectronicaMixin from '../mixins/CamposListadoFacturaElectronicaMixin';
import FbPaginacion from '../../_vue/componentes/FbPaginacion';
import SelectorCantidadRegistros from '../componentes/SelectorCantidadRegistros';
import InfoTablaBasica from '../../../global/_vue/componentes/tabla/InfoTablaBasica';
import Filtros from '../../../global/_vue/componentes/Filtros';
import SelectorRangoFecha from '../componentes/SelectorRangoFecha';

import configVistas from './configVistas';

export default {
  components: {
    SelectorRangoFecha,
    Filtros,
    InfoTablaBasica,
    SelectorCantidadRegistros,
    AccionesWrapper,
    FbPaginacion
  },
  mixins: [CamposListadoFacturaElectronicaMixin],
  data() {
    const product = process.env.VUE_APP_PORTAL;
    const category = this.$route.params.categoria;
    const view = this.$route.params.vista;
    const configView = configVistas[product][category][view];
    return {
      periodos: [
        { nombre: 'las últimas 4 semanas', valor: 'ultimas4semanas' },
        { nombre: 'éste mes', valor: 'esteMes' },
        { nombre: 'éste mes y el anterior', valor: 'esteMesConAnterior' },
        { nombre: 'los últimos 3 meses', valor: 'ultimos3meses' },
        { nombre: 'los últimos 6 meses', valor: 'ultimos6meses' },
        { nombre: '* Rango personalizado', valor: 'personalizado' }
      ],
      // periodoSeleccionado: { nombre: 'las últimas 4 semanas', valor: 'ultimas4semanas' },
      periodoSeleccionado: { nombre: 'los últimos 6 meses', valor: 'ultimos6meses' },
      periodoDesde: '',
      periodoHasta: '',
      informacionExtendida: false,
      configuracion: configView,
      componentes: {},
      pagina: 1,
      registrosPorPagina: 10,
      camposApi: '',
      filtrosFijos: configView.filtrosFijos,
      filtrosPorDefecto: configView.filtrosPorDefecto,
      filtrosVariables: configView.filtrosVariables,
      filtrosAplicados: '',
      filtrosDelComponente: '' // se actualiza con el componente de filtros
    };
  },
  watch: {
    pagina(nuevoValor) {
      // console.log("CAMBIO DE PAGINA",nuevoValor);
      this.listar(nuevoValor);
    },
    registrosPorPagina() {
      if (this.pagina === 1) {
        this.listar(1);
      } else {
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
        this.$vs.loading.close('#listado-documentos > .con-vs-loading');
      }
    }
  },
  computed: {
    ...mapState('Empresas', {
      empresaActual: (state) => state.empresa,
    }),
    ...mapState('Dtes', {
      cargandoDocumentos: (state) => state.cargando,
      documentos: (state) => state.documentos,
      documentosSeleccionados: (state) => state.documentosSeleccionados,
      documentoActual: (state) => state.documentoActual,
      paginaActual: (state) => state.paginaActual,
      paginasTotales: (state) => state.paginasTotales,
      registrosEncontrados: (state) => state.registrosEncontrados,
      // filtros: state => state.filtros,
      campos: (state) => state.campos,
    }),
    campos() {
      const campos = [];
      const self = this;
      this.configuracion.campos.forEach((obj) => {
        campos.push(self.obtenerCampoTabla(obj));
      });
      return campos;
    }
  },
  methods: {
    ...mapActions('Dtes', {
      listarDocumentos: 'listarDocumentos',
      setDocumentoActual: 'setDocumentoActual',
    }),
    manipularFiltros(filtros) {
      console.log('manipulando', filtros);
      this.filtrosDelComponente = filtros;
      this.filtros = `fechaCreacion:${this.periodoDesde}--${this.periodoHasta}`;
      if (filtros !== '') {
        this.filtros += `|${filtros}`;
      }
      this.listar(1);
    },
    seleccionarPeriodo(periodo) {
      switch (periodo.valor) {
        case 'ultimas4semanas':
          this.periodoDesde = Vue.moment().subtract(28, 'days')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'esteMes':
          this.periodoDesde = Vue.moment().startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'esteMesConAnterior':
          this.periodoDesde = Vue.moment().subtract(2, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'ultimos3meses':
          this.periodoDesde = Vue.moment().subtract(3, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'ultimos6meses':
          this.periodoDesde = Vue.moment().subtract(6, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        default:
          this.periodoDesde = Vue.moment().subtract(6, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = Vue.moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
      }
      this.periodoSeleccionado = periodo;
      this.manipularFiltros(this.filtrosDelComponente);
    },
    random() {
      return Math.random().toString(36)
        .replace(/[^a-zA-Z0-9]+/g, '')
        .substr(0, 25);
    },
    cargarComponenteCampo(nombreCampo) {
      if (!this.componentes[nombreCampo]) {
        this.componentes[nombreCampo] = () => import(`@/febos/chile/dte/componentes/campos/Campo${nombreCampo}.vue`);
      }
      return this.componentes[nombreCampo];
    },
    listar(pagina) {
      this.listarDocumentos({
        categoria: this.configuracion.categoria,
        inicio: pagina,
        cantidad: this.registrosPorPagina,
        consulta: 'trackId,tipoDocumento,folio,rutEmisor,razonSocialEmisor,rutReceptor,'
          + 'razonSocialReceptor,rutCesionario,razonSocialCesionario,indicadorDeTraslado,'
          + 'fechaCesion,codigoSii,fechaEmision,fechaRecepcion,fechaRecepcionSii,plazo,'
          + 'estadoComercial,estadoSii,fechaReciboMercaderia,formaDePago,montoTotal,iva,'
          + 'contacto,correoReceptor,fechaCesion,tipo,monto,lugar,comentario,fecha,'
          + 'fechaVencimiento,medio,tpoTraVenta,tpoTranCompra,tpoTranCompraCodIva,externalId,'
          + 'indicadorDeMontoBruto,tieneAptobacionActiva,tieneNc,tieneNd,diasParaPago,'
          + 'estadoPagado,tieneAptobacionActivaNombre', // this.camposApi,
        filtros: this.filtros,
        orden: '-fechaCreacion',
        dominioPortal: window.location.hostname,
      });
    },
    extraerCampos() {
      let campos = [];
      this.campos.forEach((item) => {
        campos = campos.concat(item.camposApi);
      });
      this.camposApi = campos.join(',');
    },
    mostrarInfoExtendida(documento) {
      this.setDocumentoActual(documento);
      this.informacionExtendida = true;
    }
  },
  created() {
    this.periodoDesde = Vue.moment().subtract(6, 'month').format('YYYY-MM-DD');
    this.periodoHasta = Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
  },
  mounted() {
    console.log('THIS DOCS', this);
    this.extraerCampos();
    this.listar(1);
  }

};
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
