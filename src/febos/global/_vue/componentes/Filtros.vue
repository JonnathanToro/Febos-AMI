<template>
  <div>
    <vs-chip :color="colores.navbar" v-if="filtrosAplicados.length > 0">
      <vs-avatar icon="search" color="primary" :badge="filtrosAplicados.length"/>
      <strong>Actualizar resultados</strong>
    </vs-chip>
    <vs-chip color="gray" v-if="filtrosAplicados.length == 0">
      <vs-avatar icon="search" color="#ccc"/>
      <strong>No hay filtros aplicados</strong>
    </vs-chip>
    <vs-chip :color="colores.navbar" v-for="filtro in filtrosAplicados" :key="filtro.campo"
             v-on:click.native="modificarFiltro(filtro)" style="cursor: context-menu">
      <vs-avatar icon="clear" color="primary" v-on:click.native="eliminarFiltro(filtro)"/>
      <strong>{{ filtro.nombre }}: </strong>{{ filtro.valorFormateado }}
    </vs-chip>
    <vs-dropdown>
      <vs-chip color="primary">
        <vs-avatar icon="add" color="primary"/>
        Agregar
      </vs-chip>
      <vs-dropdown-menu>
        <vs-dropdown-item v-for="filtro in filtrosDisponibles" :key="filtro.campo"
                          v-on:click.native="agregarFiltro(filtro)" style="width:200px">
          {{ filtro.nombre }}
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
    <vs-popup :title="tituloConfiguracion" :active.sync="mostrarVentanaConfiguracionFiltro"
              @keyup.enter.native="mostrarVentanaConfiguracionFiltro = false">
    </vs-popup>
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
      tituloConfiguracion(){
        return "Configuración de filtro: "+this.filtroActual.nombre;
      },
      ...mapState('Personalizacion', {
        colores: state => state.colores,
      }),
      filtrosDisponibles() {
        let filtros = [];
        for (let i = 0; i < this.configuracionVista.filtrosHabilitados.length; i++) {
          let campo = this.configuracionVista.filtrosHabilitados[i].campo;
          if (!this.filtroYaEstaAplicado(campo)) {
            let filtro = configuracionCamposFiltros[campo];
            if (typeof filtro == 'undefined') console.log("FALTA ESTE CAMPO: ", campo);
            filtro.tipo = this.configuracionVista.filtrosHabilitados[i].tipo;
            filtros.push(filtro);
          }
        }
        return filtros;
      }
    },
    data: () => ({
      filtrosAplicados: [
        //    {"campo": "fechaEmision", "nombre": "Fecha de Emisión", "valor":"","valorFormateado":"Del 13/04/20 al 13/05/20"},
        //    {"campo": "tipoDocumento", "nombre": "Tipo de Documento", "valor":"","valorFormateado":"Todos"},
      ],
      valorActual: 10,
      mostrarVentanaConfiguracionFiltro: false,
      filtroActual:{}
    }),
    watch: {
      valorActual() {
        this.$emit('input', this.valorActual)
        this.$emit('change', this.valorActual)
      }
    },
    mounted() {
      //cargar filtros por defecto
      for (let i = 0; i < this.configuracionVista.filtrosPorDefecto.length; i++) {
        let campo = this.configuracionVista.filtrosPorDefecto[i].campo;
        if (!this.filtroYaEstaAplicado(campo)) {
          let filtro = configuracionCamposFiltros[campo];
          filtro.valor = this.configuracionVista.filtrosPorDefecto[i].valor;
          filtro.campo = this.configuracionVista.filtrosPorDefecto[i].campo;
          this.agregarFiltro(filtro);
        }
      }
    },
    methods: {
      filtroYaEstaAplicado(campo) {
        for (let i = 0; i < this.filtrosAplicados.length; i++) {
          if (this.filtrosAplicados[i].campo == campo) {
            return true;
          }
        }
        return false;
      },
      eliminarFiltro(filtro) {
        for (let i = 0; i < this.filtrosAplicados.length; i++) {
          if (this.filtrosAplicados[i].campo == filtro.campo) {
            this.filtrosAplicados.splice(i, 1);
            break;
          }
        }
      },
      modificarFiltro(filtro) {
        console.log("modificar filtro", filtro);
        this.filtroActual=filtro;
        this.mostrarVentanaConfiguracionFiltro=true;
      },
      agregarFiltro(filtro) {
        let filtrosHabilitados = this.configuracionVista.filtrosHabilitados
        let filtroHabilitado = filtrosHabilitados.find(o => {
          return o.campo === filtro.campo
        });
        let valoresUsadosEnHumano = [];
        let valoresNoUsadosEnHumano = JSON.parse(JSON.stringify({opciones:filtroHabilitado.opciones})).opciones;
        switch (filtro.tipo) {
          case "multi":
            filtro.opciones=filtroHabilitado.opciones;
            filtro.valor.forEach(
              valor => {
                valoresUsadosEnHumano.push(
                  filtroHabilitado.opciones.find(opcion => {
                    return opcion.valor == valor
                  }).nombre
                )
                for (let i = 0; i < valoresNoUsadosEnHumano.length; i++) {
                  if (valoresNoUsadosEnHumano[i].valor == valor) valoresNoUsadosEnHumano.splice(i, 1);
                }
              }
            );
            if (valoresNoUsadosEnHumano.length == 0) {
              filtro.valorFormateado = "Todos";
            } else if (filtro.valor.length <= filtroHabilitado.opciones.length/2 ) {
              filtro.valorFormateado = valoresUsadosEnHumano.join(", ").replace(/,(?=[^,]*$)/, ' y');
            } else {
              filtro.valorFormateado = "Todos menos " + valoresNoUsadosEnHumano.map(
                valor => {
                  return valor.nombre
                }
              ).join(", ").replace(/,(?=[^,]*$)/, ' y');
            }
            break;
          default:
            filtro.valorFormateado = filtro.valor;
        }
        if (typeof filtro.valor == 'undefined' || filtro.valor == "" || filtro.valor.length == 0) return;

        this.filtrosAplicados.push(filtro);
      }
    }
  }
</script>

<style scoped>

</style>
