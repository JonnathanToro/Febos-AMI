<template>
  <div>
    <div style="float:left">
      <vs-chip :color="colores.navbar" v-if="filtrosAplicados.length > 0">
        <vs-avatar icon="search" color="primary" :badge="filtrosAplicados.length"/>
        <strong>Aplicar filtros</strong>
      </vs-chip>
      <vs-chip color="gray" v-if="filtrosAplicados.length == 0">
        <vs-avatar icon="search" color="#ccc"/>
        <strong>No hay filtros aplicados</strong>
      </vs-chip>
    </div>
    <div style="float:right">
      <vs-dropdown>
        <vs-chip color="primary">
          <vs-avatar icon="add" color="primary"/>
          Agregar filtro
        </vs-chip>
        <vs-dropdown-menu>
          <vs-dropdown-item  v-for="(filtro, index) in filtrosDisponibles" :key="`filtro-${index}`"
                             v-on:click.native="agregarFiltro(filtro)" style="width:200px">
            {{ typeof filtro == 'undefined'?'':filtro.nombre }}
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
    <div style="clear: both;border-bottom: solid 1px #ccc;margin-bottom: 10px"></div>

    <vs-chip :color="colores.navbar" v-for="(filtro,index) in filtrosAplicados" :key="`filtro-aplicado-${index}`"
             v-on:click.native="ventanaModificarFiltro(filtro)" style="cursor: context-menu">
      <vs-avatar icon="clear" color="primary" v-on:click.native="eliminarFiltro(filtro)"/>
      <strong>{{ typeof filtro == 'undefined'?'':filtro.nombre }}: </strong><span class="pl-1">{{ typeof filtro == 'undefined'?'':filtro.valorFormateado || "" }}</span>
    </vs-chip>


    <vs-modal ref="configFiltro" >
      <div slot="header" v-html="tituloConfiguracion" class="titulo-modal"></div>
      <div v-if="filtroActual.tipo == 'multi'">
        <div v-if="filtroActual.valor.length==1" class="alerta">
          Debe seleccionar como mínimo 1 de las opciones. Seleccione otra opcion antes de desmarcar la actual si es que desea cambiarla.
        </div>
        <vs-checkbox v-model="seleccionarTodos" class="modal-opcion" v-on:change.native="modificarFiltro(filtroActual)">
          Seleccionar Todos
        </vs-checkbox>
        <hr/><br/>
         <div v-for="opcion in filtroActual.opciones" v-bind:key="opcion.nombre" class="modal-opcion">
           <vs-checkbox v-model="filtroActual.valor" :vs-value="parseInt(opcion.valor)" v-on:change.native="modificarFiltro(filtroActual)"
             :disabled="filtroActual.valor.length == 1 && filtroActual.valor.includes(parseInt(opcion.valor))"
           >{{ opcion.nombre}}</vs-checkbox>
         </div>
      </div>
      <div v-if="filtroActual.tipo == 'rangoFecha'">
        <div class="swtich-tipo-rango-fecha">
          <div class="rango-fecha-parte">Rango Simple </div>
          <div class="rango-fecha-parte rango-fecha-switch"><vs-switch v-model="tipoRangoFechaAvanzado"/></div>
          <div class="rango-fecha-parte">Rango Avanzado</div>
        </div>
        <br/><hr/><br/>
        <div v-if="!tipoRangoFechaAvanzado">
          <div class="center">
            <template  v-if="periodo.valor != 'personalizado'" v-for="(periodo, index) in periodos" >
              <vs-button :disabled="periodo.valor == filtroActual.valor" size="medium" color="primary" type="filled" v-on:click="seleccionarRango(filtroActual,periodo.valor)" class="w-full mb-1" :key="`periodo-${index}`">
                {{ periodo.nombre.charAt(0).toUpperCase() + periodo.nombre.slice(1) }} <br/>
                <span style="font-size: 80%">(desde el {{ formatoTipoRango(periodo.valor,true) }} hasta hoy)</span>
              </vs-button>
            </template>
          </div>
        </div>
        <div v-if="tipoRangoFechaAvanzado">
          entre el
          <datetime v-model="rangoAvanzado.desde" input-class="fecha" :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}" value-zone="local" format="yyyy-MM-dd"></datetime>
          y el
          <datetime v-model="rangoAvanzado.hasta" input-class="fecha" :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}" value-zone="local" format="yyyy-MM-dd"></datetime>
        </div>
      </div>
    </vs-modal>

  </div>
</template>

<script>

  import {mapState} from "vuex";
  import Vue from 'vue';
  import configuracionCamposFiltros from "./configuracionCamposFiltros";
  import VsModal from "vs-modal";

  export default {
    name: 'FiltrosDte',
    components:{VsModal},
    props: {
      value: {
        type: String,
        required: false
      },
      configuracionVista: {
        type: Object,
        required: false
      },
      periodos: {
        type: Array,
        required: false
      }
    },
    computed: {
      tituloConfiguracion(){
        return "Configuración de filtro: <strong>"+this.filtroActual.nombre+"</strong>";
      },
      ...mapState('Personalizacion', {
        colores: state => state.colores,
      }),
      seleccionarTodos:{
        get(){
          var opcionesTotales=this.filtroActual.opciones.length;
          var opcionesMarcadas=this.filtroActual.valor.length;
          return opcionesMarcadas == opcionesTotales;
        },
        set(){
          var opcionesTotales=this.filtroActual.opciones.length;
          var opcionesMarcadas=this.filtroActual.valor.length;
          if(opcionesMarcadas == opcionesTotales){
            this.selected=false;
            this.filtroActual.valor.splice(0,this.filtroActual.valor.length);
            this.seleccionarAlMenosUnaOpcionDeFiltro(this.filtroActual);
          }
          if(opcionesMarcadas < opcionesTotales){
            this.selected=true;
            this.filtroActual.valor.splice(0,this.filtroActual.valor.length);
            for(let i=0;i<this.filtroActual.opciones.length;i++){
              this.filtroActual.valor.push(parseInt(this.filtroActual.opciones[i].valor));
            }
          }
        }
      },
      filtrosDisponibles() {
        let filtros = [];
        for (let i = 0; i < this.configuracionVista.filtrosHabilitados.length; i++) {
          let campo = this.configuracionVista.filtrosHabilitados[i].campo;
          if (!this.filtroYaEstaAplicado(campo)) {
            let filtro = configuracionCamposFiltros[campo];
            filtro.tipo = this.configuracionVista.filtrosHabilitados[i].tipo;
            filtros.push(filtro);
          }
        }
        return filtros;
      }
    },
    data: () => ({
      Vue:Vue,
      filtrosAplicados: [
        //    {"campo": "fechaEmision", "nombre": "Fecha de Emisión", "valor":"","valorFormateado":"Del 13/04/20 al 13/05/20"},
        //    {"campo": "tipoDocumento", "nombre": "Tipo de Documento", "valor":"","valorFormateado":"Todos"},
      ],
      valorActual: 10,
      mostrarVentanaConfiguracionFiltro: false,
      filtroActual:{},
      tipoRangoFechaAvanzado: false,
      fechaSimpleActual:'',
      rangoAvanzado:{
        desde:'',
        hasta:''
      }
    }),
    watch: {
      valorActual() {
        this.$emit('input', this.valorActual)
        this.$emit('change', this.valorActual)
      },
      rangoAvanzado(){
        this.seleccionarRango(this.filtroActual,this.filtroActual.valor);
      },
      tipoRangoFechaAvanzado(){
        if(!this.filtroActual.valor.includes("--") && !this.filtroActual.valor.includes(" ")){
          this.rangoAvanzado.desde=this.formatoTipoRango(this.filtroActual.valor);
          this.rangoAvanzado.hasta=Vue.moment().subtract(0, 'days').format('YYYY-MM-DD');
          this.filtroActual.valor=this.rangoAvanzado.desde + "--" + this.rangoAvanzado.hasta;
          this.seleccionarRango(this.filtroActual,this.filtroActual.valor,false);
        }else{
          this.rangoAvanzado.desde=this.filtroActual.valor.split("--")[0];
          this.rangoAvanzado.hasta=this.filtroActual.valor.split("--")[1];
        }
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
      formatoTipoRango(formato,humano=false){
        let estilo=humano?'LL':'YYYY-MM-DD';
        switch(formato){
          case 'ultimas4semanas':
            return Vue.moment().subtract(28, 'days').format(estilo);
          case 'esteMes':
            return this.rangoAvanzado.desde=Vue.moment().startOf('month').format(estilo);
          case 'esteMesConAnterior':
            return this.rangoAvanzado.desde=Vue.moment().subtract(1, 'month').startOf('month').format(estilo);
          case 'ultimos3meses':
            return this.rangoAvanzado.desde=Vue.moment().subtract(2, 'month').startOf('month').format(estilo);
          case 'ultimos6meses':
            return this.rangoAvanzado.desde=Vue.moment().subtract(5, 'month').startOf('month').format(estilo);
        }
      },
      seleccionarRango(filtro,valor,cerrar=true){
        for (let i = 0; i < this.filtrosAplicados.length; i++) {
          if (this.filtrosAplicados[i].campo == filtro.campo) {
            this.filtrosAplicados[i].valor=valor;
            this.filtrosAplicados[i]=this.formatearValor(filtro);
            if(cerrar)this.$refs['configFiltro'].close();
            break;
          }
        }
      },
      seleccionarAlMenosUnaOpcionDeFiltro(filtro){
        filtro.valor.push(parseInt(filtro.opciones[0].valor));
      },
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
      ventanaModificarFiltro(filtro) {
        // solo levantar el modal si es que el filtro esta "aplicado"
        for (let i = 0; i < this.filtrosAplicados.length; i++) {
            if (this.filtrosAplicados[i].campo == filtro.campo) {
              this.filtroActual = filtro;
              if(this.filtroActual.tipo=="rangoFecha"){
                if(this.filtroActual.valor.includes("--")){
                  this.tipoRangoFechaAvanzado=true;
                  this.rangoAvanzado.desde=filtro.valor.split("--")[0];
                  this.rangoAvanzado.hasta=filtro.valor.split("--")[1];
                }else{
                  this.tipoRangoFechaAvanzado=false;
                }
              }
              this.$refs['configFiltro'].open();
              break;
            }
        }
      },
      modificarFiltro(filtro){
        if(this.filtrosAplicados.length == 0){
          this.seleccionarAlMenosUnaOpcionDeFiltro(filtro);
        }
        for (let i = 0; i < this.filtrosAplicados.length; i++) {
          if (this.filtrosAplicados[i].campo == filtro.campo) {
            this.filtrosAplicados[i]=this.formatearValor(filtro);
            break;
          }
        }
      },
      formatearValor(filtro){
        let filtrosHabilitados = this.configuracionVista.filtrosHabilitados
        let filtroHabilitado = filtrosHabilitados.find(o => {
          return o.campo === filtro.campo
        });

        switch (filtro.tipo) {
          case "rangoFecha": {
            if(filtro.valor.includes("--")){
              let desde=filtro.valor.split("--")[0].split("-");
              let hasta=filtro.valor.split("--")[1].split("-")
              filtro.valorFormateado=`${desde[2]}-${desde[1]}-${desde[0].substring(2)} al ${hasta[2]}-${hasta[1]}-${hasta[0].substring(2)}`;
            }else {
              filtro.valorFormateado = this.periodos.find(o => {
                return o.valor === filtro.valor;
              }).nombre;
            }
            break;
          }
          case "multi": {
            let valoresUsadosEnHumano = [];
            let valoresNoUsadosEnHumano = JSON.parse(JSON.stringify({opciones: filtroHabilitado.opciones})).opciones;
            filtro.opciones = filtroHabilitado.opciones;
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
            } else if (filtro.valor.length <= filtroHabilitado.opciones.length / 2) {
              filtro.valorFormateado = valoresUsadosEnHumano.join(", ").replace(/,(?=[^,]*$)/, ' y');
            } else {
              filtro.valorFormateado = "Todos menos " + valoresNoUsadosEnHumano.map(
                valor => {
                  return valor.nombre
                }
              ).join(", ").replace(/,(?=[^,]*$)/, ' y');
            }
            break;
          }
          default: {
            filtro.valorFormateado = filtro.valor;
          }
        }
        if (typeof filtro.valor == 'undefined' || filtro.valor == "" || filtro.valor.length == 0) return;
        return filtro;
      },
      agregarFiltro(filtro) {
        filtro=this.formatearValor(filtro);
        this.filtrosAplicados.push(filtro);
      }
    }
  }
</script>

<style scoped>
.titulo-modal{
  margin: 15px;
  font-size: 15px;
}
.modal-opcion{
  margin-bottom: 5px;
}
.alerta{
  margin: 10px;
  padding:10px;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: darkorange;
  color: white;
}
.swtich-tipo-rango-fecha{
  text-align: center;
  vertical-align: top;
}
.rango-fecha-parte{
  width:120px;
  display: inline-block;
  margin:2px;
  position: relative;
  top: -8px;

}
.rango-fecha-switch{
  width: 50px!important;
  position: relative;
  top: 0px;
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
</style>
