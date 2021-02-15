<template>
  <div>
    <div style="text-align: right;margin-bottom: 5px;">
      <span>
        Viendo documentos que ingresaron
      </span>
      <span v-if="periodoSeleccionado.valor !== 'personalizado'">
        {{ periodoSeleccionado.nombre }}
      </span>
      <span v-if="periodoSeleccionado.valor === 'personalizado'">
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
    </div>
    <filtros
      :users="usersCompany"
      :groups="groupsCompany"
      :documents="documentTypesState.list"
      :institutions="institutionTypesState.list"
      :configuracion-vista="configuracion"
      :periodos="periodos"
      v-on:filtros-aplicados="changeFilters"
    />
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import Filtros from '@/febos/global/_vue/componentes/FiltrosDnt';
import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';
import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  components: { Filtros },
  props: ['value'],
  mixins: [FiltersDntMixin, FindTypeDocumentMixin],
  data() {
    const view = this.$route.params.vista;
    const filters = this.getFilterView(view);

    return {
      periodos: [
        { nombre: 'las últimas 4 semanas', valor: 'ultimas4semanas' },
        { nombre: 'este mes', valor: 'esteMes' },
        { nombre: 'este mes y el anterior', valor: 'esteMesConAnterior' },
        { nombre: 'los últimos 3 meses', valor: 'ultimos3meses' },
        { nombre: 'los últimos 6 meses', valor: 'ultimos6meses' },
        { nombre: '* Rango personalizado', valor: 'personalizado' }
      ],
      periodoSeleccionado: { nombre: 'los últimos 6 meses', valor: 'ultimos6meses' },
      periodoDesde: '',
      periodoHasta: '',
      configuracion: filters,
      currentFilters: ''
    };
  },
  created() {
    this.periodoDesde = this.$moment().subtract(6, 'month').format('YYYY-MM-DD');
    this.periodoHasta = this.$moment().format('YYYY-MM-DD');

    if (!this.usersCompany.length) {
      this.getUsersCompany({
        empresaId: this.empresa.id,
        pagina: 1,
        filas: 9999,
        buscarInfoExtra: 'si',
        filtroInfoExtra: 'CARGO'
      });
    }
    if (!this.groupsCompany.length) {
      this.getGroupsCompany({
        empresaId: this.empresa.id
      });
    }
    if (!this.documentTypesState.length) {
      this.fetchDocumentTypes();
    }
    if (!this.institutionTypesState.length) {
      this.fetchInstitutionTypes();
    }
  },
  computed: {
    ...mapGetters('Empresas', [
      'empresa',
      'usersCompany',
      'groupsCompany'
    ]),
    ...mapGetters('List', [
      'documentTypesState',
      'institutionTypesState'
    ])
  },
  methods: {
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany'
    ]),
    ...mapActions('List', [
      'fetchDocumentTypes',
      'fetchInstitutionTypes'
    ]),
    changeFilters(filters) {
      const defaultFilters = `fechaCreacion:${this.periodoDesde}--${this.periodoHasta}`;
      this.currentFilters = filters;
      const newFilters = filters !== ''
        ? `${defaultFilters}|${filters}`
        : defaultFilters;

      this.$emit('input', newFilters);
    },
    seleccionarPeriodo(periodo) {
      switch (periodo.valor) {
        case 'ultimas4semanas':
          this.periodoDesde = this.$moment().subtract(28, 'days')
            .format('YYYY-MM-DD');
          this.periodoHasta = this.$moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'esteMes':
          this.periodoDesde = this.$moment().startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = this.$moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'esteMesConAnterior':
          this.periodoDesde = this.$moment().subtract(2, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = this.$moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'ultimos3meses':
          this.periodoDesde = this.$moment().subtract(3, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = this.$moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        case 'ultimos6meses':
          this.periodoDesde = this.$moment().subtract(6, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = this.$moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
        default:
          this.periodoDesde = this.$moment().subtract(6, 'month').startOf('month')
            .format('YYYY-MM-DD');
          this.periodoHasta = this.$moment().subtract(0, 'days')
            .format('YYYY-MM-DD');
          break;
      }
      this.periodoSeleccionado = periodo;
      this.changeFilters(this.currentFilters);
    }
  }
};

</script>
