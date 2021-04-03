<template>
  <div>
    <div style="float:left">
      <vs-chip
        :color="colores.navbar"
        v-if="filtrosAplicados.length > 0"
        class="accionable"
        v-on:click.native="aplicarFiltros()"
      >
        <vs-avatar icon="search" color="primary" :badge="filtrosAplicados.length"/>
        <strong>Aplicar filtros</strong>
      </vs-chip>
      <vs-chip color="gray" v-if="filtrosAplicados.length === 0" >
        <vs-avatar icon="search" color="#ccc"/>
        <strong>No hay filtros aplicados</strong>
      </vs-chip>
      <vs-chip
        :color="colores.navbar"
        v-if="hasQueryFilters"
        style="cursor: context-menu"
        v-on:click.native="clearQueryFilters()"
      >
        <vs-avatar icon="link" color="primary"/>
        <strong>Borrar filtros de enlace</strong>
      </vs-chip>
    </div>
    <div style="float:right">
      <vs-dropdown>
        <vs-chip color="primary">
          <vs-avatar icon="add" color="primary"/>
          Agregar filtro
        </vs-chip>
        <vs-dropdown-menu>
          <vs-dropdown-item
            v-for="(filtro, index) in filtrosDisponibles"
            :key="`filtro-${index}`"
            v-on:click.native="agregarFiltro(filtro,true)"
            style="width:200px"
          >
            {{ typeof filtro == 'undefined' ? '' : filtro.nombre }}
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
    <div style="clear: both;border-bottom: solid 1px #ccc;margin-bottom: 10px"></div>

    <vs-chip
      :color="colores.navbar"
      v-for="(filtro,index) in filtrosAplicados"
      :key="`filtro-aplicado-${index}`"
      v-on:click.native="ventanaModificarFiltro(filtro)"
      style="cursor: context-menu"
    >
      <vs-avatar
        icon="clear"
        color="primary"
        v-on:click.native="eliminarFiltro(filtro)"
        v-if="esEliminable[filtro.campo]"
      />
      <span />
      <vs-tooltip :text="`Modificar filtro ${filtro.nombre}`">
        <strong>{{ typeof filtro == 'undefined' ? '' : filtro.nombre }}: </strong>
        <span class="pl-1">
          {{ typeof filtro == 'undefined' ? '' : filtro.valorFormateado || "" }}
        </span>
      </vs-tooltip>
    </vs-chip>

    <vs-modal
      ref="configFiltro"
      v-on:close="verificarFiltrosAlCerrar"
      dismiss-on="close-button esc"
    >
      <div slot="header" v-html="tituloConfiguracion" class="titulo-modal"></div>
      <div v-if="filtroActual.tipo == 'multi'">
        <div v-if="filtroActual.valor.length==1" class="alerta">
          Debe seleccionar como mínimo 1 de las opciones. Seleccione otra
          opción antes de desmarcar la actual si es que desea cambiarla.
        </div>
        <vs-checkbox
          v-model="seleccionarTodos"
          class="modal-opcion"
          v-on:change.native="modificarFiltro(filtroActual)"
        >
          Seleccionar Todos
        </vs-checkbox>
        <hr/>
        <br/>
        <div
          v-for="opcion in filtroActual.opciones"
          v-bind:key="opcion.nombre"
          class="modal-opcion"
        >
          <vs-checkbox
            v-model="filtroActual.valor"
            :vs-value="opcion.valor"
            v-on:change.native="modificarFiltro(filtroActual)"
            :disabled="filtroActual.valor.length === 1
            && filtroActual.valor.includes(opcion.valor)"
          >
            {{ opcion.nombre }}
          </vs-checkbox>
        </div>
      </div>
      <div v-if="filtroActual.tipo== 'numero'">
        <div class="texto-normal">
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            placeholder="Agregar"
            :separators="[',']"
            :validation="[{
              classes: 'es-numero',
              rule: /^\d+$/,
              disableAdd: true
             }]"
          />
        </div>
      </div>
      <div v-if="filtroActual.tipo== 'rut'">
        <div class="texto-normal">
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            placeholder="Agregar"
            :separators="[',']"
            :validation="[{
              classes: 'es-rut',
              rule: /^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/,
              disableAdd: true
             }]"
          />
        </div>
      </div>
      <div v-if="filtroActual.tipo== 'texto'">
        <div class="texto-normal">
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            placeholder="Agregar"
            :separators="[',']"
          />
        </div>
      </div>
      <div v-if="filtroActual.tipo == 'solicitanteCorreo'">
        <div class="texto-normal">
          <multiselect
            v-model="filterCreators"
            select-label="Presiona enter para seleccionar"
            selected-label="Presiona enter para remover"
            deselect-label="Presiona enter para remover"
            placeholder="Seleccione los usuarios"
            label="nombre" track-by="valor"
            :options="filtroActual.opciones" :multiple="true"
            :close-on-select="false" :clear-on-select="false"
            :preserve-search="true" :preselect-first="false"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                {{ values.length }} usuarios seleccionados</span>
            </template>
          </multiselect>
        </div>
      </div>
      <div v-if="filtroActual.tipo == 'destinoCopiaIds'">
        <div class="texto-normal">
          <multiselect
            v-model="filterCopies"
            select-label="Presiona enter para seleccionar"
            selected-label="Presiona enter para remover"
            deselect-label="Presiona enter para remover"
            placeholder="Seleccione los usuarios"
            label="nombre" track-by="valor"
            :options="filtroActual.opciones" :multiple="true"
            :close-on-select="false" :clear-on-select="false"
            :preserve-search="true" :preselect-first="false"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                {{ values.length }} usuarios seleccionados</span>
            </template>
          </multiselect>
        </div>
      </div>
      <div v-if="filtroActual.tipo == 'destinoUsuarios'
       || filtroActual.tipo == 'usuarioIds'">
        <div class="texto-normal">
          <multiselect
            v-model="filterUsers"
            select-label="Presiona enter para seleccionar"
            selected-label="Presiona enter para remover"
            deselect-label="Presiona enter para remover"
            placeholder="Seleccione los usuarios"
            label="nombre" track-by="valor"
            :options="filtroActual.opciones" :multiple="true"
             :close-on-select="false" :clear-on-select="false"
            :preserve-search="true" :preselect-first="false"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                {{ values.length }} usuarios seleccionados</span>
            </template>
          </multiselect>
        </div>
      </div>
      <div v-if="filtroActual.tipo == 'tipoDocumento'">
        <div class="texto-normal">
          <multiselect
            v-model="filterDocuments"
            select-label="Presiona enter para seleccionar"
            selected-label="Presiona enter para remover"
            deselect-label="Presiona enter para remover"
            placeholder="Seleccione los tipos"
            label="nombre" track-by="valor"
            :options="filtroActual.opciones" :multiple="true"
            :close-on-select="false" :clear-on-select="false"
            :preserve-search="true" :preselect-first="false"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                {{ values.length }} tipos seleccionados</span>
            </template>
          </multiselect>
        </div>
      </div>
      <div v-if="filtroActual.tipo == 'tipoInstitucion'">
        <div class="texto-normal">
          <multiselect
            v-model="filterInstitutions"
            select-label="Presiona enter para seleccionar"
            selected-label="Presiona enter para remover"
            deselect-label="Presiona enter para remover"
            placeholder="Seleccione los tipos"
            label="nombre" track-by="valor"
            :options="filtroActual.opciones" :multiple="true"
            :close-on-select="false" :clear-on-select="false"
            :preserve-search="true" :preselect-first="false"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                {{ values.length }} tipos seleccionados</span>
            </template>
          </multiselect>
        </div>
      </div>
      <div v-if="filtroActual.tipo == 'destinoGrupos'">
        <div class="texto-normal">
          <multiselect
            v-model="filterGroups"
            select-label="Presiona enter para seleccionar"
            selected-label="Presiona enter para remover"
            deselect-label="Presiona enter para remover"
            placeholder="Seleccione los grupos"
            label="nombre" track-by="valor"
            :options="filtroActual.opciones" :multiple="true"
            :close-on-select="false" :clear-on-select="false"
            :preserve-search="true" :preselect-first="false"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                {{ values.length }} grupos seleccionados</span>
            </template>
          </multiselect>
        </div>
      </div>
      <div v-if="filtroActual.tipo === 'destinoCorreos'">
        <div class="texto-normal">
          <vue-tags-input
            v-model="emails"
            :tags="filterEmails"
            @tags-changed="newTags => filterEmails = newTags"
            placeholder="Agregar"
            :separators="[',']"
          />
        </div>
      </div>
      <div v-if="filtroActual.tipo === 'rangoFecha'">
        <div class="swtich-tipo-rango">
          <div class="rango-parte">Rango Simple</div>
          <div class="rango-parte rango-switch">
            <vs-switch v-model="tipoRangoFechaAvanzado"/>
          </div>
          <div class="rango-parte">Rango Avanzado</div>
        </div>
        <br/>
        <hr/>
        <br/>
        <div v-if="!tipoRangoFechaAvanzado">
          <div class="center">
            <template
              v-for="(periodo, index) in periodos"
            >
              <vs-button
                :disabled="periodo.valor === filtroActual.valor"
                size="medium" color="primary" type="filled"
                v-on:click="seleccionarRango(filtroActual,periodo.valor)"
                class="w-full mb-1"
                :key="`periodo-${index}`"
              >
                {{ periodo.nombre.charAt(0).toUpperCase() + periodo.nombre.slice(1) }} <br/>
                <span style="font-size: 80%">
                  (desde el {{ formatoTipoRango(periodo.valor, true) }} hasta hoy)
                </span>
              </vs-button>
            </template>
          </div>
        </div>
        <div v-if="tipoRangoFechaAvanzado">
          entre el
          <datetime
            v-model="rangoAvanzado.desde"
            input-class="fecha"
            :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
            value-zone="local" format="yyyy-MM-dd"
          />
          y el
          <datetime
            v-model="rangoAvanzado.hasta"
            input-class="fecha" :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
            value-zone="local"
            format="yyyy-MM-dd"
          />
        </div>
      </div>
      <div class="text-center mt-2">
        <vs-button size="small" v-on:click="verificarFiltrosAlCerrar" >
          Confirmar
        </vs-button>
      </div>
    </vs-modal>

  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex';
import Vue from 'vue';
import VsModal from 'vs-modal';
import Multiselect from 'vue-multiselect';
import VueTagsInput from '@johmun/vue-tags-input'; // docs: http://www.vue-tags-input.com/#/api/props

import configuracionCamposFiltros from './configuracionCamposFiltrosDnt';

export default {
  name: 'FiltrosDnt',
  components: { VsModal, VueTagsInput, Multiselect },
  props: {
    configuracionVista: {
      type: Object,
      required: false
    },
    periodos: {
      type: Array,
      required: false
    },
    users: {
      type: Array,
      required: false
    },
    groups: {
      type: Array,
      required: false
    },
    documents: {
      type: Array,
      required: false
    },
    institutions: {
      type: Array,
      required: false
    },
    hasQueryFilters: {
      type: Boolean,
      default: false
    },
    clearQueryFilters: {
      type: Function
    }
  },
  computed: {
    ...mapState('Empresas', {
      empresaActual: (state) => state.empresa,
    }),
    ...mapGetters('Usuario', [
      'usuarioActual'
    ]),
    tituloConfiguracion() {
      return `Configuración de filtro: <strong>${ this.filtroActual.nombre }</strong>`;
    },
    ...mapState('Personalizacion', {
      colores: (state) => state.colores,
    }),
    esEliminable() {
      const tipoFiltros = {};
      this.configuracionVista.filtrosHabilitados.forEach((filtro) => {
        tipoFiltros[filtro.campo] = true;
      });
      this.configuracionVista.filtrosPorDefecto.forEach((filtro) => {
        tipoFiltros[filtro.campo] = false;
      });
      return tipoFiltros;
    },
    seleccionarTodos: {
      get() {
        try {
          const opcionesTotales = this.filtroActual.opciones.length;
          const opcionesMarcadas = this.filtroActual.valor.length;
          return opcionesMarcadas === opcionesTotales;
        } catch (e) {
          const { filtrosHabilitados } = this.configuracionVista;
          const filtro = filtrosHabilitados.find((o) => o.campo === this.filtroActual.campo);
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.filtroActual.opciones = filtro.opciones;
          if (typeof (filtro.opciones[0].valor) === 'number') {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.filtroActual.valor = [filtro.opciones[0].valor];
          } else {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.filtroActual.valor = [filtro.opciones[0].valor];
          }
          return false;
        }
      },
      set() {
        const opcionesTotales = this.filtroActual.opciones.length;
        const opcionesMarcadas = this.filtroActual.valor.length;
        if (opcionesMarcadas === opcionesTotales) {
          this.selected = false;
          this.filtroActual.valor.splice(0, this.filtroActual.valor.length);
          this.seleccionarAlMenosUnaOpcionDeFiltro(this.filtroActual);
        }
        if (opcionesMarcadas < opcionesTotales) {
          this.selected = true;
          this.filtroActual.valor.splice(0, this.filtroActual.valor.length);
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.filtroActual.opciones.length; i++) {
            this.filtroActual.valor.push(this.filtroActual.opciones[i].valor);
          }
        }
      }
    },
    filtrosDisponibles() {
      const filtros = [];
      try {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.configuracionVista.filtrosHabilitados.length; i++) {
          const { campo } = this.configuracionVista.filtrosHabilitados[i];
          if (!this.filtroYaEstaAplicado(campo)) {
            const filtro = configuracionCamposFiltros[campo];
            filtro.campo = campo;
            filtro.tipo = this.configuracionVista.filtrosHabilitados[i].tipo;
            filtros.push(filtro);
          }
        }
        return filtros;
      } catch (e) {
        console.log(e);
      }
      return filtros;
    }
  },
  data: () => ({
    Vue,
    filtroRecientementeEliminado: false,
    periodosDisponibles: [],
    filtrosAplicados: [],
    valorActual: 10,
    mostrarVentanaConfiguracionFiltro: false,
    filtroActual: {},
    tipoRangoFechaAvanzado: false,
    tipoRango: false,
    fechaSimpleActual: '',
    rangoAvanzado: {
      desde: '',
      hasta: ''
    },
    tag: '',
    tags: [],
    filterUsers: [],
    filterGroups: [],
    filterDocuments: [],
    filterInstitutions: [],
    emails: '',
    filterEmails: [],
    creators: '',
    filterCreators: [],
    copies: '',
    filterCopies: []
  }),
  watch: {
    tags(valorNuevo, valorAntiguo) {
      if (this.filtroActual.tipo !== 'numero'
        && this.filtroActual.tipo !== 'rut'
        && this.filtroActual.tipo !== 'texto') return;
      let valor = [];
      if (valorNuevo === '') {
        valor = valorAntiguo;
      } else {
        valor = valorNuevo;
      }

      const valores = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < valor.length; i++) {
        valores.push(valor[i].text);
      }
      this.filtroActual.valor = valores;// .join(",");

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.filtrosAplicados.length; i++) {
        if (this.filtrosAplicados[i].campo === this.filtroActual.campo) {
          this.filtrosAplicados[i].valor = this.filtroActual.valor;
          this.filtrosAplicados[i] = this.formatearValor(this.filtroActual);
          break;
        }
      }
    },
    rangoAvanzado: {
      handler(valor) {
        this.$log.debug('watch.rangoAvanzado');
        this.$log.info('valor rango avanzado', JSON.parse(JSON.stringify(valor)));
        try {
          const desde = valor.desde.split('T')[0];
          const hasta = valor.hasta.split('T')[0];
          this.filtroActual.valor = `${desde}--${hasta}`;
        } catch (e) {
          this.$log.info('Una de las fechas de rango avanzado no esta correctamente '
            + 'formateada,se necesitan ambas para setear el valor del filtro');
        }
        this.seleccionarRango(this.filtroActual, this.filtroActual.valor, false);
      },
      deep: true
    },
    tipoRangoFechaAvanzado() {
      if (!this.filtroActual.valor.includes('--') && !this.filtroActual.valor.includes(' ')) {
        this.rangoAvanzado.desde = this.formatoTipoRango(this.filtroActual.valor);
        this.rangoAvanzado.hasta = Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
        this.filtroActual.valor = `${this.rangoAvanzado.desde }--${ this.rangoAvanzado.hasta}`;
        this.seleccionarRango(this.filtroActual, this.filtroActual.valor, false);
      } else {
        const [desde, hasta] = this.filtroActual.valor.split('--');
        this.rangoAvanzado.desde = desde;
        this.rangoAvanzado.hasta = hasta;
      }
    },
    filterDocuments(valorNuevo) {
      this.filtroActual.valor = valorNuevo.map((document) => document.valor);
      this.filtroActual.valorFormateado = valorNuevo.map((document) => document.nombre).join(',');
    },
    filterInstitutions(valorNuevo) {
      this.filtroActual.valor = valorNuevo.map((document) => document.valor);
      this.filtroActual.valorFormateado = valorNuevo.map((document) => document.nombre).join(',');
    },
    filterUsers(valorNuevo) {
      this.filtroActual.valor = valorNuevo.map((user) => user.valor);
      this.filtroActual.valorFormateado = valorNuevo.map((group) => group.nombre).join(',');
    },
    filterGroups(valorNuevo) {
      this.filtroActual.valor = valorNuevo.map((group) => group.valor);
      this.filtroActual.valorFormateado = valorNuevo.map((group) => group.nombre).join(',');
    },
    filterEmails(valorNuevo) {
      this.filtroActual.valor = valorNuevo.map((email) => email.text);
      this.filtroActual.valorFormateado = valorNuevo.map((email) => email.text).join(',');
    },
    filterCreators(valorNuevo) {
      this.filtroActual.valor = valorNuevo.map((user) => user.valor);
      this.filtroActual.valorFormateado = valorNuevo.map((group) => group.nombre).join(',');
    },
    filterCopies(valorNuevo) {
      this.filtroActual.valor = valorNuevo.map((user) => user.valor);
      this.filtroActual.valorFormateado = valorNuevo.map((group) => group.nombre).join(',');
    }
  },
  methods: {
    verificarFiltrosAlCerrar() {
      if (this.filtroActual.tipo === 'rangoFecha' && this.tipoRangoFechaAvanzado) {
        let rango = this.rangoAvanzado.desde.split('T')[0];
        rango += '--';
        rango += this.rangoAvanzado.hasta.split('T')[0];
        this.filtroActual = rango;
        this.aplicarFiltros();
      }

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.filtrosAplicados.length; i++) {
        if (this.filtrosAplicados[i].valor === '' || this.filtrosAplicados[i].valor.length === 0) {
          this.filtrosAplicados.splice(i, 1);
          return;
        }
      }
      this.$refs.configFiltro.close();
    },
    aplicarFiltros(onMounted = false) {
      const query = [];
      const that = this;
      this.filtrosAplicados.forEach((filter) => {
        const filtro = filter;
        if (filtro.tipo === 'rangoFecha' && !filtro.valor.includes('--')) {
          const inicio = that.formatoTipoRango(filtro.valor);
          const fin = Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
          query.push(`${filtro.campo}:${inicio}--${fin}`);
        } else {
          if (filtro.tipo === 'destinoUsuarios'
            || filtro.tipo === 'destinoGrupos') {
            filtro.campo = 'destinoParticipanteIds';
          }
          if (filtro.tipo === 'destinoCorreos') {
            filtro.campo = 'destinoCorreoIds';
          }
          if (filtro.campo === 'referenciaTipo') {
            filtro.campo = 'codigosReferenciasTipos';
          }
          if (filtro.campo === 'destinoCodigo') {
            filtro.campo = 'destinoCodigoIds';
          }
          if (filtro.campo === 'solicitanteCorreo') {
            filtro.campo = 'solicitanteEmail';
          }
          if (filtro.tipo === 'usuarioIds') {
            if (filtro.campo === 'codigosDerivacionUsuario') {
              filtro.campo = 'codigosDerivacionUsuario';
            }
          }
          query.push(`${filtro.campo }:${ filtro.valor}`);
        }
      });

      // filtros fijos, que estan ocultos a la vista
      this.configuracionVista.filtrosFijos.forEach((filtro) => {
        let { valor } = filtro;
        // mapeo de variables de filtros estaticos
        // TODO se debe acomodar con la config que esta en las vistas
        // eslint-disable-next-line no-template-curly-in-string
        if (valor === '${iutEmpresa}') {
          // eslint-disable-next-line no-template-curly-in-string
          valor = valor.replace('${iutEmpresa}', that.empresaActual.iut);
        }
        // eslint-disable-next-line no-template-curly-in-string
        if (valor === '${idUsuario}') {
          // eslint-disable-next-line no-template-curly-in-string
          valor = valor.replace('${idUsuario}', that.usuarioActual.id);
          valor = valor.concat(',--grupos--');
        }

        query.push(`${filtro.campo }:${ valor}`);
      });
      this.$emit('filtros-aplicados', query.join('|'), onMounted);
    },
    formatoTipoRango(formato, humano = false) {
      const estilo = humano ? 'LL' : 'YYYY-MM-DD';
      switch (formato) {
        case 'ultimas4semanas':
          return Vue.moment().subtract(28, 'days').format(estilo);
        case 'esteMes':
          return Vue.moment().startOf('month').format(estilo);
        case 'esteMesConAnterior':
          return Vue.moment().subtract(1, 'month').startOf('month').format(estilo);
        case 'ultimos3meses':
          return Vue.moment().subtract(2, 'month').startOf('month').format(estilo);
        case 'ultimos6meses':
          return Vue.moment().subtract(5, 'month').startOf('month').format(estilo);
        default:
          return Vue.moment().subtract(5, 'month').startOf('month').format(estilo);
      }
    },
    seleccionarRango(filtro, valor, cerrar = true) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.filtrosAplicados.length; i++) {
        if (this.filtrosAplicados[i].campo === filtro.campo) {
          this.filtrosAplicados[i].valor = valor;
          this.filtrosAplicados[i] = this.formatearValor(filtro);
          if (cerrar) this.$refs.configFiltro.close();
          break;
        }
      }
    },
    seleccionarAlMenosUnaOpcionDeFiltro(filtro) {
      filtro.valor.push(filtro.opciones[0].valor);
    },
    filtroYaEstaAplicado(campo) {
      try {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.filtrosAplicados.length; i++) {
          if (this.filtrosAplicados[i].campo === campo) {
            return true;
          }
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return false;
    },
    eliminarFiltro(filtro) {
      // eslint-disable-next-line no-plusplus
      if (filtro.tipo === 'destinoUsuarios') {
        this.filterUsers = [];
      } else if (filtro.tipo === 'usuarioIds') {
        this.filterUsers = [];
      } else if (filtro.tipo === 'destinoGrupos') {
        this.filterGroups = [];
      } else if (filtro.tipo === 'destinoCorreos') {
        this.filterEmails = [];
        this.emails = '';
      } else if (filtro.tipo === 'tipoDocumento') {
        this.filterDocuments = [];
      } else if (filtro.tipo === 'tipoInstitucion') {
        this.filterInstitutions = [];
      } else if (filtro.tipo === 'solicitanteCorreo') {
        this.filterCreators = [];
      } else if (filtro.tipo === 'destinoCopiaIds') {
        this.filterCopies = [];
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.filtrosAplicados.length; i++) {
        if (this.filtrosAplicados[i].campo === filtro.campo) {
          this.filtrosAplicados[i].valor = [];
          this.filtrosAplicados[i].valorFormateado = '';
          this.filtrosAplicados.splice(i, 1);
          this.filtroRecientementeEliminado = true;
          break;
        }
      }
    },
    ventanaModificarFiltro(filtro) {
      this.tag = '';
      this.tags = [];
      if (this.filtroRecientementeEliminado) {
        this.filtroRecientementeEliminado = false;
        return;
      }
      // solo levantar el modal si es que el filtro esta "aplicado"
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.filtrosAplicados.length; i++) {
        if (this.filtrosAplicados[i].campo === filtro.campo) {
          this.filtroActual = filtro;
          if (this.filtroActual.tipo === 'rangoFecha') {
            if (this.filtroActual.valor.includes('--')) {
              this.tipoRangoFechaAvanzado = true;
              const [desde, hasta] = filtro.valor.split('--');
              this.rangoAvanzado.desde = desde;
              this.rangoAvanzado.hasta = hasta;
            } else {
              this.tipoRangoFechaAvanzado = false;
            }
          } else if (this.filtroActual.tipo === 'numero' || this.filtroActual.tipo === 'rut') {
            // eslint-disable-next-line no-plusplus
            for (i = 0; i < this.filtroActual.valor.length; i++) {
              this.tags.push({ text: this.filtroActual.valor[i] });
            }
            this.tipoRango = this.filtroActual.valor.includes('--');
          }
          this.$refs.configFiltro.open();
          this.filtroActual.valor = this.formatearValor(filtro).valor;
          break;
        }
      }
    },
    modificarFiltro(filtro) {
      if (this.filtrosAplicados.length === 0) {
        this.seleccionarAlMenosUnaOpcionDeFiltro(filtro);
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.filtrosAplicados.length; i++) {
        if (this.filtrosAplicados[i].campo === filtro.campo) {
          this.filtrosAplicados[i] = this.formatearValor(filtro);
          break;
        }
      }
    },
    formatearValor(filter) {
      const filtro = filter;
      if (filtro.valor === '' || typeof filtro.valor === 'undefined') {
        filtro.valor = '';
        filtro.valorFormateado = '';
        switch (filtro.tipo) {
          case 'tipoDocumento': {
            filtro.opciones = this.documents.map((document) => {
              const documentOption = {
                nombre: document.label,
                valor: document.value
              };
              return documentOption;
            });
            break;
          }
          case 'tipoInstitucion': {
            filtro.opciones = this.institutions.map((institution) => {
              const institutionOption = {
                nombre: institution.label,
                valor: institution.value
              };
              return institutionOption;
            });
            break;
          }
          case 'usuarioIds':
          case 'destinoUsuarios': {
            filtro.opciones = this.users.map((user) => {
              const userOption = {
                nombre: user.nombre,
                valor: user.id
              };
              return userOption;
            });
            break;
          }
          case 'destinoGrupos': {
            filtro.opciones = this.groups.map((group) => {
              const groupOption = {
                nombre: group.nombre,
                valor: group.id
              };
              return groupOption;
            });
            break;
          }
          case 'solicitanteCorreo': {
            filtro.opciones = this.users.map((user) => {
              const userOption = {
                nombre: user.nombre,
                valor: user.correo
              };
              return userOption;
            });
            break;
          }
          case 'destinoCopiaIds': {
            filtro.opciones = this.users.map((user) => {
              const userOption = {
                nombre: user.nombre,
                valor: user.id
              };
              return userOption;
            });
            break;
          }
          default: {
            console.log('format filtro default', filtro);
          }
        }
        return filtro;
      }
      const { filtrosHabilitados } = this.configuracionVista;
      const filtroHabilitado = filtrosHabilitados.find((o) => o.campo === filtro.campo);
      switch (filtro.tipo) {
        case 'tipoDocumento': {
          filtro.opciones = this.documents.map((document) => {
            const documentOption = {
              nombre: document.label,
              valor: document.value
            };
            return documentOption;
          });
          break;
        }
        case 'tipoInstitucion': {
          filtro.opciones = this.institutions.map((institution) => {
            const institutionOption = {
              nombre: institution.label,
              valor: institution.value
            };
            return institutionOption;
          });
          break;
        }
        case 'usuarioIds':
        case 'destinoUsuarios': {
          filtro.opciones = this.users.map((user) => {
            const userOption = {
              nombre: user.nombre,
              valor: user.id
            };
            return userOption;
          });
          break;
        }
        case 'solicitanteCorreo': {
          filtro.opciones = this.users.map((user) => {
            const userOption = {
              nombre: user.nombre,
              valor: user.correo
            };
            return userOption;
          });
          break;
        }
        case 'destinoCopiaIds': {
          filtro.opciones = this.users.map((user) => {
            const userOption = {
              nombre: user.nombre,
              valor: user.id
            };
            return userOption;
          });
          break;
        }
        case 'destinoGrupos': {
          filtro.opciones = this.groups.map((group) => {
            const groupOption = {
              nombre: group.nombre,
              valor: group.id
            };
            return groupOption;
          });
          break;
        }
        case 'destinoCorreos': {
          filtro.valorFormateado = filtro.valor;
          break;
        }
        case 'rangoFecha': {
          if (filtro.valor.includes('--')) {
            const [desde, hasta] = filtro.valor.split('--');
            filtro.valorFormateado = `${desde} al ${hasta}`;
          } else {
            filtro.valorFormateado = (this.periodosDisponibles
              .find((o) => o.valor.toString() === filtro.valor.toString()) || {})
              .nombre;
          }
          break;
        }
        case 'multi': {
          const valoresUsadosEnHumano = [];
          const valoresNoUsadosEnHumano = JSON.parse(
            JSON.stringify({ opciones: filtroHabilitado.opciones })
          ).opciones;
          filtro.opciones = filtroHabilitado.opciones;
          if (typeof filtro.valor === 'boolean') {
            filtro.valor = [filtro.opciones[0].valor];
          }
          filtro.valor.forEach(
            (valor) => {
              valoresUsadosEnHumano.push(
                filtroHabilitado.opciones
                  .find((opcion) => (opcion.valor === valor))
                  .nombre
              );
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < valoresNoUsadosEnHumano.length; i++) {
                // eslint-disable-next-line eqeqeq
                if (valoresNoUsadosEnHumano[i].valor == valor) {
                  valoresNoUsadosEnHumano.splice(i, 1);
                }
              }
            }
          );
          if (valoresNoUsadosEnHumano.length === 0) {
            filtro.valorFormateado = 'Todos';
          } else if (filtro.valor.length <= filtroHabilitado.opciones.length / 2) {
            filtro.valorFormateado = valoresUsadosEnHumano.map((name) => name).join(', ')
              .replace(/,(?=[^,]*$)/, ' y');
          } else {
            filtro.valorFormateado = `Todos menos ${ valoresNoUsadosEnHumano.map(
              (valor) => valor.nombre
            ).join(', ').replace(/,(?=[^,]*$)/, ' y')}`;
          }
          break;
        }
        case 'rut':
        case 'texto':
        case 'numero': {
          if (filtro.valor.includes('--')) {
            filtro.valorFormateado = `del ${ filtro.valor.split('--')[0] } al ${ filtro.valor.split('--')[1]}`;
          } else if (Array.isArray(filtro.valor)) {
            if (filtro.valor.length > 7) {
              const nuevoArreglo = filtro.valor.slice(0, 7);
              filtro.valorFormateado = `${nuevoArreglo.join(', ') } y ${ filtro.valor.length - 7 } más`;
            } else {
              filtro.valorFormateado = filtro.valor.join(', ');
              filtro.valorFormateado = filtro.valorFormateado.replace(/,([^,]*)$/, ' y$1');
            }
          } else {
            filtro.valorFormateado = filtro.valor;
          }
          break;
        }
        default: {
          filtro.valorFormateado = filtro.valor;
        }
      }
      return filtro;
    },
    agregarFiltro(filter, desplegarVentanaDeModificacion = false) {
      const filtro = this.formatearValor(filter);
      this.filtrosAplicados.push(filtro);
      if (desplegarVentanaDeModificacion) this.ventanaModificarFiltro(filtro);
    }
  },
  mounted() {
    this.periodosDisponibles = this.periodos.filter((periodo) => periodo.valor !== 'personalizado');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.configuracionVista.filtrosPorDefecto.length; i++) {
      const { campo } = this.configuracionVista.filtrosPorDefecto[i];
      if (!this.filtroYaEstaAplicado(campo)) {
        const filtro = configuracionCamposFiltros[campo];
        filtro.valor = this.configuracionVista.filtrosPorDefecto[i].valor;
        filtro.campo = this.configuracionVista.filtrosPorDefecto[i].campo;
        this.agregarFiltro(filtro);
      }
    }
    this.aplicarFiltros(true);
  }
};
</script>

<style scoped>
.titulo-modal {
  margin: 15px;
  font-size: 15px;
}

.modal-opcion {
  margin-bottom: 5px;
}

.alerta {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: darkorange;
  color: white;
}

.swtich-tipo-rango {
  text-align: center;
  vertical-align: top;
}

.rango-parte {
  width: 120px;
  display: inline-block;
  margin: 2px;
  position: relative;
  top: -8px;

}

.rango-switch {
  width: 50px !important;
  position: relative;
  top: 0px;
}

.fecha {
  width: 185px;
  text-align: center;
  border: none;
  display: inline-block;
  border-bottom: dashed 1px #ccc;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  cursor: pointer;
}

.texto-normal {
  font-size: 14px !important;
}

input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.accionable {
  cursor: pointer;
}
</style>
