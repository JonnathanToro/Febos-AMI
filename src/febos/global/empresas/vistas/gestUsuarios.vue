<template>
<div>
  <vx-card title="Gestión de usuarios" title-color="primary">

    <vs-button size="small" style="margin-bottom: 10px;" @click="agregarUsuario">Agregar</vs-button>
    <vs-table :data="usuarios" :search="true" :pagination="true" :maxItems="10" noDataText="Sin registros encontrados">
      <template slot="thead">
        <vs-th>Alias</vs-th>
        <vs-th>RUT</vs-th>
        <vs-th>Nombre</vs-th>
        <vs-th>Correo</vs-th>
        <vs-th>Acciones</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].alias">
            {{data[indextr].alias}}
          </vs-td>
          <vs-td :data="data[indextr].iut">
            {{data[indextr].iut}}
          </vs-td>
          <vs-td :data="data[indextr].nombre">
            {{data[indextr].nombre}}
          </vs-td>
          <vs-td :data="data[indextr].correo">
            {{data[indextr].correo}}
          </vs-td>
          <vs-td :data="data[indextr].id">
            <div
              class="btn-group" size="small"
              role="group">
              <vs-button
                size="small"
                color="primary"
                @click="editarUsuario(tr)">Editar</vs-button>
<!--              <vs-button-->
<!--                size="small"-->
<!--                color="success"-->
<!--                @click="editarUsuario(tr)">Permisos</vs-button>-->
              <!--<vs-button
                size="small"
                color="warning"
                @click="editarEmpresas(tr)">Empresas</vs-button>-->
              <vs-button
                size="small"
                color="dark"
                @click="eliminarUsuario(tr)">Eliminar</vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>

    </vs-table>

  </vx-card>

  <modal-usuario :editar="editar" :usuario="usuario" @cerrarEdicionUsuario="cancelarEdicion"></modal-usuario>
<!--  <modal-empresas :editar="editarEmpresa" :usuario="usuario" :empresas="empresas" @cerrarEdicionUsuarioEmpresas="cancelarEmpresas"></modal-empresas>-->

</div>
</template>

<script>
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";
import modalUsuario from "@/febos/global/empresas/componentes/gestUsuarios/modalUsuario";
// import modalEmpresas from "@/febos/global/empresas/componentes/gestUsuarios/modalEmpresas";

export default {
  name: "gestUsuarios",
  components: {
    modalUsuario, /*modalEmpresas*/
  },
  data()  {
    return {
      usuarios: [],
      editar: false,
      usuario: null,
      editarEmpresa: false,
      empresas: null
    }
  },
  computed: {

  },
  mounted() {
    this.cargarEmpresas();
    this.obtenerUsuarios();
  },
  methods:  {
    obtenerUsuarios() {
      this.usuarios = [];
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" });
      clienteFebosAPI.get("/usuarios?filas=10000&pagina=1").then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.usuarios = response.data.usuarios;
          console.log(this.usuarios);
        } else {
          this.$vs.notify({
            color: "danger", title: "Configuración de usuarios", text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId, fixed: true
          });
        }
      }).catch(() => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: "danger", title: "Configuración de usuarios", text: "No fue posible procesar la cesión del documento", fixed: true
        });
      })

    },
    agregarUsuario()  {
      this.usuario = { id: null, iut: null, nombre: null, alias: null, correo: null };
      this.editar = true;
    },
    editarUsuario(val)  {
      this.editar = true;
      this.usuario = { id: val.id, iut: val.iut, nombre: val.nombre, alias: val.alias, correo: val.correo };
    },
/*    editarEmpresas(val) {
      this.editarEmpresa = true;
      this.usuario = val;
    },*/
    eliminarUsuario(val)  {
      console.log(val);
    },
    cancelarEdicion(val) {
      this.editar = false;
      this.usuario = null;
      if (val) this.obtenerUsuarios();
    },
    cancelarEmpresas() {
      this.editarEmpresa = false;
      this.usuario = null;
    },



    cargarEmpresas()  {
      this.empresas = null;
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" });
      clienteFebosAPI.get("/empresas?busquedaSimple=si&filas=9000&pagina=1").then((response) => {
        this.$vs.loading.close();

        if (response.data.codigo == 10) {
          this.empresas = response.data.empresas;
          this.empresas.forEach(elemento => elemento.seleccionado = false);
          // this.obtenerActuales();
        } else {
          this.$vs.loading.close();
          this.$vs.notify({
            color: "danger", title: "Empresas del usuario", text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId, fixed: true
          });
        }
      }).catch(() => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: "danger", title: "Empresas del usuario", text: "Error de plataforma", fixed: true
        });
      })

    },


  }
}
</script>

<style  lang="css">

[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
  padding: -0.25rem 2rem;
  margin: 10px;
}
[dir] .btn-group button {
  /*padding: 1rem 1.25rem !important;*/
  padding: 6px !important;
}


table {
  border-spacing: 0;
  width: 100%;
  border-collapse: unset !important;
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

.fila:hover {
  background-color: #efefef;
}
</style>
