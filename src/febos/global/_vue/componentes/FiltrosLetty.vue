<template>
  <div>
    <div style="float:left">
      <vs-chip
        style="cursor:pointer;"
        v-if="filtrosAplicados.length > 0"
        v-on:click.native="setFilters()"
      >
        <vs-avatar icon="search" color="primary" :badge="filtrosAplicados.length"/>
        <strong>Aplicar filtros</strong>
      </vs-chip>
      <vs-chip
        style="cursor:pointer;"
        color="gray"
        v-if="!filtrosAplicados.length"
        v-on:click.native="setFilters()"
      >
        <vs-avatar icon="search" color="#ccc"/>
        <strong>No hay filtros aplicados</strong>
      </vs-chip>
    </div>
    <div style="float:right">
      <vs-dropdown vs-trigger-click>
        <vs-chip color="primary">
          <vs-avatar icon="add" color="primary"/>
          Agregar filtro Letty
        </vs-chip>
        <vs-dropdown-menu class="scroll-options shadow">
          <vs-dropdown-item
            v-for="(filter, index) in filtrosDisponibles"
            :key="`filter-${ index }`"
            v-on:click="addFilter(filter)"
            style="width:200px"
          >
            {{ filter.nombre }}
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
    <vs-chip
      color="primary" transparent
      v-for="(filtro, index) in filtrosAplicados"
      v-if="filtro.valor !== ''"
      :key="`filtro-aplicado-${ index }`"
      style="cursor: context-menu"
    >
      <vs-avatar
        icon="clear"
        v-on:click.native="removeFilter(filtro)"
        color="primary"
      />
      <span />
      <vs-tooltip
        :text="`Modificar filtro ${filtro.nombre}`"
        v-on:click.native="modificarFiltro(filtro)"
      >
        <strong>{{ filtro.nombre }}: </strong>
        <span class="pl-1">
          {{ filtro.valorFormateado }}
        </span>
      </vs-tooltip>
    </vs-chip>
    <vs-modal
      :title="`Filtrar por ${actualFilter.nombre}`"
      ref="configFiltro"
      dismiss-on="close-button esc"
    >
      <div>
        <div v-if="actualFilter.tipo === 'usuarioIds'">
          <div class="texto-normal">
            <multiselect
              v-model="filterOptions.users"
              select-label="Presiona enter para seleccionar"
              selected-label="Presiona enter para remover"
              deselect-label="Presiona enter para remover"
              placeholder="Seleccione los usuarios"
              label="nombre" track-by="valor"
              :options="actualFilter.opciones" :multiple="true"
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
        <div v-if="actualFilter.tipo === 'correos'">
          <div class="texto-normal">
            <multiselect
              v-model="filterOptions.userCorreos"
              select-label="Presiona enter para seleccionar"
              selected-label="Presiona enter para remover"
              deselect-label="Presiona enter para remover"
              placeholder="Seleccione los usuarios"
              label="nombre" track-by="valor"
              :options="actualFilter.opciones" :multiple="true"
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
        <div v-if="actualFilter.tipo === 'derivadoIds'">
          <div class="texto-normal">
            <multiselect
              v-model="filterOptions.derivados"
              select-label="Presiona enter para seleccionar"
              selected-label="Presiona enter para remover"
              deselect-label="Presiona enter para remover"
              placeholder="Seleccione los usuarios"
              label="nombre" track-by="valor"
              :options="actualFilter.opciones" :multiple="true"
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
        <div v-if="actualFilter.tipo === 'opcionDoc'">
          <div class="texto-normal">
            <multiselect
              v-model="filterOptions.documents"
              select-label="Presiona enter para seleccionar"
              selected-label="Presiona enter para remover"
              deselect-label="Presiona enter para remover"
              placeholder="Seleccione los tipos"
              label="nombre" track-by="valor"
              :options="actualFilter.opciones" :multiple="true"
              :close-on-select="false" :clear-on-select="false"
              :preserve-search="true" :preselect-first="false"
            >
              <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                {{ values.length }} docs seleccionados</span>
              </template>
            </multiselect>
          </div>
        </div>
        <div v-if="actualFilter.tipo === 'opcionInst'">
          <div class="texto-normal">
            <multiselect
              v-model="filterOptions.institutions"
              select-label="Presiona enter para seleccionar"
              selected-label="Presiona enter para remover"
              deselect-label="Presiona enter para remover"
              placeholder="Seleccione los tipos"
              label="nombre" track-by="valor"
              :options="actualFilter.opciones" :multiple="true"
              :close-on-select="false" :clear-on-select="false"
              :preserve-search="true" :preselect-first="false"
            >
              <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                {{ values.length }} instituciones seleccionados</span>
              </template>
            </multiselect>
          </div>
        </div>
        <div v-if="actualFilter.tipo === 'grupoIds'">
          <div class="texto-normal">
            <multiselect
              v-model="filterOptions.groups"
              select-label="Presiona enter para seleccionar"
              selected-label="Presiona enter para remover"
              deselect-label="Presiona enter para remover"
              placeholder="Seleccione los grupos"
              label="nombre" track-by="valor"
              :options="actualFilter.opciones" :multiple="true"
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
        <div v-if="actualFilter.tipo === 'grupoCreador'">
          <div class="texto-normal">
            <multiselect
              v-model="filterOptions.groupCreator"
              select-label="Presiona enter para seleccionar"
              selected-label="Presiona enter para remover"
              deselect-label="Presiona enter para remover"
              placeholder="Seleccione los grupos"
              label="nombre" track-by="valor"
              :options="actualFilter.opciones" :multiple="true"
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
        <div v-if="actualFilter.tipo == 'multi'">
          <div v-if="actualFilter.valor.length==1" class="alerta">
            Debe seleccionar como mínimo 1 de las opciones. Seleccione otra
            opción antes de desmarcar la actual si es que desea cambiarla.
          </div>
          <vs-checkbox
            v-model="selectAllOptions"
            class="modal-opcion"
            v-on:change.native="selectFilter(actualFilter)"
          >
            Seleccionar Todos
          </vs-checkbox>
          <hr/>
          <br/>
          <div
            v-for="[valor, nombre] in Object.entries(actualFilter.opciones)"
            v-bind:key="nombre"
            class="modal-opcion"
          >
            <vs-checkbox
              v-model="actualFilter.valor"
              :vs-value="valor"
              v-on:change.native="selectFilter(actualFilter)"
              :disabled="actualFilter.valor.length === 1 && actualFilter.valor.includes(valor)"
            >
              {{ nombre }}
            </vs-checkbox>
          </div>
        </div>
        <div v-if="actualFilter.tipo== 'texto'">
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
        <div v-if="actualFilter.tipo== 'fecha'">
          <div class="texto-normal">
            <datetime
              input-class="input-date"
              v-model="actualFilter.valor"
              :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
              value-zone="local" format="yyyy-MM-dd"
            />
          </div>
        </div>
        <div v-if="actualFilter.tipo === 'rangoFecha'">
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
                  :disabled="periodo.valor === actualFilter.valor"
                  size="medium" color="primary" type="filled"
                  v-on:click="seleccionarRango(periodo.valor)"
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
              input-class="input-date"
              :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
              value-zone="local" format="yyyy-MM-dd"
            />
            y el
            <datetime
              v-model="rangoAvanzado.hasta"
              input-class="input-date" :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
              value-zone="local"
              format="yyyy-MM-dd"
            />
          </div>
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

import VsModal from 'vs-modal';
import VueTagsInput from '@johmun/vue-tags-input';
import Multiselect from 'vue-multiselect';
import { mapGetters } from 'vuex';
import Vue from 'vue';

export default {
  name: 'FiltrosLettyDnt',
  components: { VsModal, VueTagsInput, Multiselect },
  props: {
    filtersView: {
      type: Object,
      required: true
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
    periodos: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      modalFilter: false,
      actualFilter: {},
      filtrosAplicados: [],
      filtrosDisponibles: [],
      selectAllOptions: false,
      tipoRangoFechaAvanzado: false,
      tipoRango: false,
      fechaSimpleActual: '',
      rangoAvanzado: {
        desde: '',
        hasta: ''
      },
      tag: '',
      tags: [],
      filterOptions: {
        users: [],
        userCorreos: [],
        derivados: [],
        documents: [],
        correos: [],
        institutions: [],
        groups: [],
        groupCreator: [],
      }
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    'actualFilter.valor': function (nuevoValor) {
      if (this.actualFilter.tipo === 'fecha') {
        this.actualFilter.valor = Vue.moment(nuevoValor).format('YYYY-MM-DD');
        this.actualFilter.valorFormateado = Vue.moment(nuevoValor).format('YYYY-MM-DD');
      }
    },
    // eslint-disable-next-line func-names
    'actualFilter.valorFormateado': function (nuevoValor) {
      this.actualFilter.valorFormateado = nuevoValor;
    },
    // eslint-disable-next-line func-names
    'filterOptions.users': function (valorNuevo) {
      console.log('watc users', valorNuevo);
      this.actualFilter.valor = valorNuevo.map((user) => user.valor);
      this.actualFilter.valorFormateado = valorNuevo.map((user) => user.nombre).join(',');
    },
    // eslint-disable-next-line func-names
    'filterOptions.derivados': function (valorNuevo) {
      console.log('watc derivados', valorNuevo);
      this.actualFilter.valor = valorNuevo.map((user) => user.valor);
      this.actualFilter.valorFormateado = valorNuevo.map((user) => user.nombre).join(',');
    },
    // eslint-disable-next-line func-names
    'filterOptions.userCorreos': function (valorNuevo) {
      console.log('watc correos', valorNuevo);
      this.actualFilter.valor = valorNuevo.map((user) => user.valor);
      this.actualFilter.valorFormateado = valorNuevo.map((user) => user.nombre).join(',');
    },
    // eslint-disable-next-line func-names
    'filterOptions.documents': function (valorNuevo) {
      this.actualFilter.valor = valorNuevo.map((document) => document.valor);
      this.actualFilter.valorFormateado = valorNuevo.map((document) => document.nombre).join(',');
    },
    // eslint-disable-next-line func-names
    'filterOptions.institutions': function (valorNuevo) {
      this.actualFilter.valor = valorNuevo.map((inst) => inst.valor);
      this.actualFilter.valorFormateado = valorNuevo.map((inst) => inst.nombre).join(',');
    },
    // eslint-disable-next-line func-names
    'filterOptions.groups': function (valorNuevo) {
      this.actualFilter.valor = valorNuevo.map((group) => group.valor);
      this.actualFilter.valorFormateado = valorNuevo.map((group) => group.nombre).join(',');
    },
    // eslint-disable-next-line func-names
    'filterOptions.groupCreator': function (valorNuevo) {
      this.actualFilter.valor = valorNuevo.map((group) => group.valor);
      this.actualFilter.valorFormateado = valorNuevo.map((group) => group.nombre).join(',');
    },
    rangoAvanzado: {
      handler(valor) {
        this.$log.debug('watch.rangoAvanzado');
        this.$log.info('valor rango avanzado', valor);
        try {
          const desde = valor.desde.split('T')[0];
          const hasta = valor.hasta.split('T')[0];
          this.actualFilter.valor = `${desde}--${hasta}`;
        } catch (e) {
          this.$log.info('Una de las fechas de rango avanzado no esta correctamente '
            + 'formateada,se necesitan ambas para setear el valor del filtro');
        }
        this.seleccionarRango(this.actualFilter.valor);
      },
      deep: true
    },
    tipoRangoFechaAvanzado() {
      if (!this.actualFilter.valor.includes('--') && !this.actualFilter.valor.includes(' ')) {
        this.rangoAvanzado.desde = this.formatoTipoRango(this.actualFilter.valor);
        this.rangoAvanzado.hasta = Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
        this.actualFilter.valor = `${this.rangoAvanzado.desde }--${ this.rangoAvanzado.hasta}`;
        // this.seleccionarRango(this.actualFilter.valor);
      } else {
        const [desde, hasta] = this.actualFilter.valor.split('--');
        this.rangoAvanzado.desde = desde;
        this.rangoAvanzado.hasta = hasta;
      }
    },
    tags(valorNuevo) {
      const valor = valorNuevo;

      this.actualFilter.valor = valor.map((tag) => tag.text); // .join(",");
      this.actualFilter.valorFormateado = valor.map((tag) => tag.text).join(', ');

      this.filtrosAplicados = this.filtrosAplicados.map((filterApplied) => {
        if (filterApplied.campo === this.actualFilter.campo) {
          return {
            ...filterApplied,
            valor: valor.map((tag) => tag.text).join(','),
            valorFormateado: valor.map((tag) => tag.text).join(', ')
          };
        }
        return filterApplied;
      });
    },
    selectAllOptions(valorNuevo) {
      if (valorNuevo === true) {
        this.actualFilter.valor = Object.keys(this.actualFilter.opciones);
        this.actualFilter.valorFormateado = Object.values(this.actualFilter.opciones);
      } else {
        this.actualFilter.valor = [];
        this.actualFilter.valorFormateado = [];
      }
    }
  },
  computed: {
    ...mapGetters('Empresas', [
      'company'
    ]),
    ...mapGetters('Usuario', [
      'currentUser'
    ])
  },
  methods: {
    clearOptions() {
      this.tag = '';
      this.tags = [];
    },
    removeFilter(filter) {
      this.filtrosAplicados = this.filtrosAplicados
        .filter((filterApplied) => filterApplied.campo !== filter.campo);
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
    formatRangeDate() {
      if (this.actualFilter.valor.includes('--')) {
        const [desde, hasta] = this.actualFilter.valor.split('--');
        this.actualFilter.valorFormateado = `${desde} al ${hasta}`;
      } else {
        const foundPeriod = this.periodosDisponibles
          .find((period) => period.valor === this.actualFilter.valor);
        this.actualFilter.valorFormateado = foundPeriod.nombre;
      }
    },
    seleccionarRango(valor) {
      if (valor === 'personalizado') {
        this.tipoRangoFechaAvanzado = true;
        this.actualFilter.valor = valor;
      } else {
        this.actualFilter.valor = valor;
        this.filtrosAplicados = this.filtrosAplicados.map((filterApplied) => {
          if (filterApplied.campo === this.actualFilter.campo) {
            return {
              ...filterApplied,
              valor,
              valorFormateado: this.formatRangeDate()
            };
          }
          return filterApplied;
        });
      }
      console.log('rango seleccionado', this.filtrosAplicados);
    },
    modificarFiltro(filter) {
      // this.clearOptions();
      this.actualFilter = filter;
      if (this.actualFilter.tipo === 'rangoFecha') {
        if (this.actualFilter.valor.includes('--')) {
          this.tipoRangoFechaAvanzado = true;
          const [desde, hasta] = filter.valor.split('--');
          this.rangoAvanzado.desde = desde;
          this.rangoAvanzado.hasta = hasta;
        } else {
          this.tipoRangoFechaAvanzado = false;
        }
      } else if (this.actualFilter.tipo === 'numero' || this.actualFilter.tipo === 'texto') {
        this.tags = this.actualFilter.valor.map((valor) => ({ text: valor }));
        this.tipoRango = this.actualFilter.valor.includes('--');
      }

      this.actualFilter.valor = filter.valor;
      this.$refs.configFiltro.open();
      console.log('MODIFICIAR', this.actualFilter);
    },
    seleccionarTodos() {
      this.actualFilter.valor = Object.keys(this.actualFilter.opciones);
    },
    verificarFiltrosAlCerrar() {
      /*
      if (this.actual.tipo === 'rangoFecha' && this.tipoRangoFechaAvanzado) {
        let rango = this.rangoAvanzado.desde.split('T')[0];
        rango += '--';
        rango += this.rangoAvanzado.hasta.split('T')[0];
        this.filtroActual = rango;
        console.log('aca', this.filtroActual);
        // this.aplicarFiltros();
      }
      */

      this.filtrosAplicados = this.filtrosAplicados.map((filterApplied) => {
        if (filterApplied.campo === this.actualFilter.campo) {
          return {
            ...filterApplied,
            valor: this.actualFilter.valor,
            valorFormateado: this.actualFilter.valorFormateado
          };
        }
        return filterApplied;
      });

      this.filtrosAplicados = this.filtrosAplicados.filter((filter) => {
        return filter.valor !== '' || filter.valor.length;
      });

      // this.actualFilter = {};
      this.$refs.configFiltro.close();
    },
    setFilters() {
      const query = [];
      // para los filtros
      this.filtersView.filtrosFijos.forEach((filter) => {
        let { valor } = filter;
        // eslint-disable-next-line no-template-curly-in-string
        if (valor === '${iutEmpresa}') {
          // eslint-disable-next-line no-template-curly-in-string
          valor = valor.replace('${iutEmpresa}', this.company.iut);
        }
        // eslint-disable-next-line no-template-curly-in-string
        if (valor === '${correoUsuario}') {
          // eslint-disable-next-line no-template-curly-in-string
          valor = valor.replace('${correoUsuario}', this.currentUser.correo);
        }
        // eslint-disable-next-line no-template-curly-in-string
        if (valor === '${idUsuario}') {
          // eslint-disable-next-line no-template-curly-in-string
          valor = valor.replace('${idUsuario}', this.currentUser.id);
          valor = valor.concat(',--grupos--');
        }
        if (filter.tipo === 'multi') {
          valor = Object.keys(filter.opciones);
        }
        query.push(`${ filter.campo }:${ valor}`);
      });

      // para los filtros disponibles que fueron aplicados

      this.filtrosAplicados.forEach((filter) => {
        if (filter.tipo === 'rangoFecha' && !filter.valor.includes('--')) {
          const inicio = this.formatoTipoRango(filter.valor);
          const fin = Vue.moment().format('YYYY-MM-DD');
          query.push(`${filter.campo}:${inicio}--${fin}`);
        } else {
          query.push(`${ filter.campo }:${ filter.valor }`);
        }
      });

      console.log('FILTROS A APLICAR', query.join('|'));
      this.$emit('filtros-aplicados', query.join('|'));
    },
    searchAvailableFilters() {
      let { filtrosHabilitados } = this.filtersView;

      filtrosHabilitados = filtrosHabilitados
        .sort(({ nombre: a }, { nombre: b }) => a.localeCompare(b));
      this.filtrosDisponibles = { ...filtrosHabilitados };
    },
    setOptionsFilter(addedFilter) {
      let opciones = [];
      switch (addedFilter.tipo) {
        case 'usuarioIds': {
          opciones = this.users.map((user) => {
            const userOption = {
              nombre: user.nombre,
              valor: user.id
            };
            return userOption;
          });
          break;
        }
        case 'derivadoIds': {
          opciones = this.users.map((user) => {
            const userOption = {
              nombre: user.nombre,
              valor: user.id
            };
            return userOption;
          });
          break;
        }
        case 'opcionInst': {
          opciones = this.institutions.map((institution) => {
            const institutionOption = {
              nombre: institution.label,
              valor: institution.value
            };
            return institutionOption;
          });
          break;
        }
        case 'opcionDoc': {
          opciones = this.documents.map((document) => {
            const documentOption = {
              nombre: document.label,
              valor: document.value
            };
            return documentOption;
          });
          break;
        }
        case 'grupoCreador':
        case 'grupoIds': {
          opciones =  this.groups.map((group) => {
            const groupOption = {
              nombre: group.nombre,
              valor: group.id
            };
            return groupOption;
          });
          break;
        }
        case 'correos': {
          opciones =  this.users.map((user) => {
            const userOption = {
              nombre: user.nombre,
              valor: user.correo
            };
            return userOption;
          });
          break;
        }
        default: {
          console.log('format filtro default', this.actualFilter);
        }
      }
      return opciones;
    },
    addFilter(filter) {
      this.actualFilter = {};
      this.clearOptions();
      const isApplied = this.filtrosAplicados
        .some((filterApplied) => filterApplied.campo === filter.campo);

      if (isApplied) {
        return;
      }

      this.actualFilter = filter;
      const addedFilter = filter;
      switch (addedFilter.tipo) {
        case 'usuarioIds': {
          this.actualFilter.opciones = this.setOptionsFilter(filter);
          break;
        }
        case 'derivadoIds': {
          this.actualFilter.opciones = this.setOptionsFilter(filter);
          break;
        }
        case 'opcionInst': {
          this.actualFilter.opciones = this.setOptionsFilter(filter);
          break;
        }
        case 'opcionDoc': {
          this.actualFilter.opciones = this.setOptionsFilter(filter);
          break;
        }
        case 'grupoIds': {
          this.actualFilter.opciones = this.setOptionsFilter(filter);
          break;
        }
        case 'grupoCreador': {
          this.actualFilter.opciones = this.setOptionsFilter(filter);
          break;
        }
        case 'correos': {
          this.actualFilter.opciones = this.setOptionsFilter(filter);
          break;
        }
        default: {
          console.log('format filtro default', this.actualFilter);
        }
      }
      this.filtrosAplicados.push(addedFilter);
      this.$refs.configFiltro.open();
    },
    selectFilter(filter) {
      this.actualFilter.valorFormateado = filter.valor
        .map((valor) => this.actualFilter.opciones[valor])
        .join(', ');

      this.filtrosAplicados = this.filtrosAplicados.map((filterApplied) => {
        if (filterApplied.campo === filter.campo) {
          return {
            ...filterApplied,
            valorFormateado: this.actualFilter.valorFormateado,
            valor: filter.valor
          };
        }
        return filterApplied;
      });
    }
  },
  mounted() {
    this.periodosDisponibles = this.periodos.filter((periodo) => periodo.valor !== 'personalizado');
    this.searchAvailableFilters();
    this.setFilters();
  }
};

</script>
<style>
.input-date {
  border: 1px solid #bcbcbc;
  padding: 6px 8px;
  border-radius: 5px;
}

.scroll-options {
  max-height: 400px;
  overflow-y: scroll;
}
</style>
