<template>
  <div>
    <vs-chip :color="colores.navbar" v-if="filtrosAplicados.length > 0">
      <vs-avatar icon="search" color="primary" :badge="filtrosAplicados.length"/>
      <strong>Filtros Aplicados</strong>
    </vs-chip>
    <vs-chip color="gray" v-if="filtrosAplicados.length == 0">
      <vs-avatar icon="search" color="#ccc"/>
      <strong>No hay filtros aplicados</strong>
    </vs-chip>
    <vs-chip :color="colores.navbar" v-for="filtro in filtrosAplicados" :key="filtro.campo">
      <vs-avatar icon="clear" color="primary" v-on:click.native="eliminarFiltro(filtro)"/>
      <strong>{{ filtro.nombre }}: </strong>{{ filtro.valorFormateado }}
    </vs-chip>
    <vs-dropdown>
      <vs-chip color="primary">
        <vs-avatar icon="add" color="primary"/>
        Agregar
      </vs-chip>
      <vs-dropdown-menu>
        <vs-dropdown-item v-for="filtro in filtrosDisponibles" :key="filtro.campo" v-on:click.native="agregarFiltro(filtro)" style="width:200px">
          {{ filtro.nombre }}
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>

  import {mapState} from "vuex";
  import configuracionCamposFiltros from "./configuracionCamposFiltros";
  export default {
    name: 'FiltrosDte',
    props: {
      value: {
        type: String,
        required: false
      },
      configuracionVista: {
        type: Object,
        required: false
      }
    },
    computed: {
      ...mapState('Personalizacion', {
        colores: state => state.colores,
      }),
      filtrosDisponibles(){
        let filtros=[];
        for(let i=0;i<this.configuracionVista.filtrosVariables.length;i++){
          let campo=this.configuracionVista.filtrosVariables[i];
          if(!this.filtroYaEstaAplicado(campo)){
            filtros.push(configuracionCamposFiltros[campo]);
          }
        }
        return filtros;
      }
    },
    data: () => ({
      filtrosAplicados: [
        {"campo": "fechaEmision", "nombre": "Fecha de Emisión", "valor":"","valorFormateado":"Del 13/04/20 al 13/05/20"},
        {"campo": "tipoDocumento", "nombre": "Tipo de Documento", "valor":"","valorFormateado":"Todos"},
      ],
      valorActual: 10,
    }),
    watch: {
      valorActual() {
        this.$emit('input', this.valorActual)
        this.$emit('change', this.valorActual)
      }
    },
    mounted() {

    },
    methods: {
      filtroYaEstaAplicado(campo){
        for(let i=0;i<this.filtrosAplicados.length;i++){
          if(this.filtrosAplicados[i].campo == campo){
            return true;
          }
        }
        return false;
      },
      eliminarFiltro(filtro){
        for(let i=0;i<this.filtrosAplicados.length;i++){
          if(this.filtrosAplicados[i].campo == filtro.campo){
            this.filtrosAplicados.splice(i,1);
            break;
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
