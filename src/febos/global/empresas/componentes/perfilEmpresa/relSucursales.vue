<template>
  <div>
    <vs-button size="small" style="margin-bottom: 10px;">Agregar</vs-button>
    <vs-table :data="registros">
      <template slot="thead">
        <vs-th>Código</vs-th>
        <vs-th>Comuna</vs-th>
        <vs-th>Ciudad</vs-th>
        <vs-th>Dirección</vs-th>
        <vs-th>Teléfono</vs-th>
        <vs-th>Activa</vs-th>
        <vs-th>Acciones</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].codigoSii">
            {{data[indextr].codigoSii}}
          </vs-td>
          <vs-td :data="data[indextr].comuna">
            {{data[indextr].comuna}}
          </vs-td>
          <vs-td :data="data[indextr].ciudad">
            {{data[indextr].ciudad}}
          </vs-td>
          <vs-td :data="data[indextr].direccion">
            {{data[indextr].direccion}}
          </vs-td>
          <vs-td :data="data[indextr].telefono">
            {{data[indextr].telefono}}
          </vs-td>
          <vs-td :data="data[indextr].sucursalActiva" style="text-align: center">
            <vs-icon icon="done" color="success" v-if="data[indextr].sucursalActiva"></vs-icon>
            <vs-icon icon="clear" color="danger" v-if="!data[indextr].sucursalActiva"></vs-icon>
          </vs-td>
          <vs-td :data="data[indextr].id">
            <div
              class="btn-group" size="small"
              role="group">
              <vs-button
                size="small"
                color="primary"
                @click="detalleAceptar(tr, indextr)">Editar</vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>

    </vs-table>



  </div>
</template>

<script>
export default {
  name: "relSucursales",
  props: ["iut", "sucursales"],
  components: {
  },
  data() {
    return {
      registros: [],
    }
  },
  computed: {},
  mounted() {
    this.filtrarSucursales();
  },
  methods: {
    filtrarSucursales() {
      this.registros = this.sucursales.filter(element => !element.casaMatriz);
    }
  }
}
</script>

<style scoped>

</style>
