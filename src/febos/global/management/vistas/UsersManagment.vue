<template>
<div>
  <vx-card title="Gestión de usuarios" title-color="primary">
    <div style="display: flex; justify-content: end;">
      <span v-if="treeView" class="pr-2">Cambiar a vista de árbol</span>
      <span v-if="!treeView" class="pr-2">Cambiar a vista de tabla</span>
      <vs-switch v-model="treeView"/>
    </div>
    <div v-if="!treeView">
      <vs-table
        :data="usersCompany" :search="true"
        :pagination="true" :maxItems="10"
        noDataText="Sin registros encontrados"
      >
        <template slot="header">
          <vs-button
            size="small"
            style="margin-bottom: 10px;"
            @click="agregarUsuario"
          >
            Agregar
          </vs-button>
        </template>
        <template slot="thead">
          <!--<vs-th>Alias</vs-th>-->
          <vs-th>RUT</vs-th>
          <vs-th>Nombre</vs-th>
          <vs-th>Correo</vs-th>
          <vs-th>Acciones</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <!--<vs-td :data="data[indextr].alias">
              {{data[indextr].alias}}
            </vs-td>-->
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
              <div class="wrap-buttons">
                <vs-button
                  size="small"
                  radius color="primary"
                  type="border" icon="search"
                  @click="viewData(tr)"
                />
                <vs-button
                  size="small"
                  radius color="primary"
                  type="border" icon="edit"
                  @click="editarUsuario(tr)"
                />

                <!--              <vs-button-->
                <!--                size="small"-->
                <!--                color="success"-->
                <!--                @click="editarUsuario(tr)">Permisos</vs-button>-->
                <!--<vs-button
                  size="small"
                  color="warning"
                  @click="editarEmpresas(tr)">Empresas</vs-button>-->
                <vs-button
                  radius
                  icon="clear"
                  size="small"
                  color="dark"
                  type="border"
                  @click="eliminarUsuario(tr)"
                />
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <div v-if="treeView">
      <div>
        <tree-view :tree="tree"></tree-view>
      </div>
    </div>
  </vx-card>

  <modal-usuario
    :editar="editar"
    :usuario="usuario"
    @cerrarEdicionUsuario="cancelarEdicion"
  />

</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';
import modalUsuario from '@/febos/global/empresas/componentes/gestUsuarios/modalUsuario';

export default {
  name: 'gestUsuarios',
  components: {
    modalUsuario
  },
  data() {
    return {
      treeView: true,
      editar: false,
      usuario: null,
      editarEmpresa: false,
      empresas: null,
      tree: [
        {
          text: 'Dogs',
          nodes: [{
            text: 'Germany',
            nodes: [{
              text: 'American Eskimo Dog',
              nodes: [{
                text: 'Fluffy',
                link: {
                  type: 'link', // Type `link` will create an `Anchor` tag
                  value: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/American_Eskimo_Dog_1.jpg/1920px-American_Eskimo_Dog_1.jpg' // URL of the link
                }
              }]
            }, {
              text: 'Bavarian Mountain Hound'
            }, {
              text: 'Boxer',
              nodes: [{
                text: 'Rip (Router-link)',
                link: {
                  type: 'router-link', // Type `router-link` will create a router-link, duh.
                  key: 'path', // key to use when giving it the value, router-link(:to="{ path: '/d-ger-boxer-rip' }")
                  value: '/d-ger-boxer-rip'
                }
              }, {
                text: 'Mackenzie (Router-link)',
                link: {
                  type: 'router-link',
                  key: 'name',
                  value: 'd-ger-boxer-machenzie'
                }
              }]
            }, {
              text: 'Bullenbeisser'
            }, {
              text: 'Deutsche Bracke',
              nodes: [{
                text: 'Mini',
                link: {
                  type: 'link',
                  value: 'https://animalsbreeds.com/wp-content/uploads/2015/07/Deutsche-Bracke.jpg'
                }
              }]
            }]
          }, {
            text: 'France',
            nodes: [{
              text: 'Ariegeois'
            }, {
              text: 'Artois Hound'
            }]
          }]
        },
        { // >= v0.3.0
          text: 'Standing Up',
          link: {
            type: 'router-link',
            key: 'path',
            value: 'templink'
          },
          icon: 'cube',
          nodes: [
            {
              text: 'mixamo.com',
              link: {
                type: 'router-link',
                key: 'path',
                value: 'templink'
              },
              icon: 'running'
            }
          ]
        }
      ],
      icons: {
        closed: 'angle-up',
        opened: 'angle-down'
      }
    };
  },
  computed: {
    ...mapGetters('Empresas', [
      'company',
      'usersCompany',
      'groupsCompany'
    ]),
  },
  methods: {
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany'
    ]),
    agregarUsuario() {
      this.usuario = {
        id: null, iut: null, nombre: null, alias: null, correo: null
      };
      this.editar = true;
    },
    viewData(user) {
      this.editar = true;
      this.usuario = user;
    },
    editarUsuario(val) {
      this.editar = true;
      this.usuario = val;
    },
    eliminarUsuario(val) {
      console.log(val);
    },
    async cancelarEdicion(val) {
      this.editar = false;
      this.usuario = null;
      if (val) this.obtenerUsuarios();
      await this.$validator.reset();
    },
    cancelarEmpresas() {
      this.editarEmpresa = false;
      this.usuario = null;
    },

    cargarEmpresas() {
      this.empresas = null;
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      clienteFebosAPI.get('/empresas?busquedaSimple=si&filas=9000&pagina=1').then((response) => {
        this.$vs.loading.close();

        if (response.data.codigo == 10) {
          this.empresas = response.data.empresas;
          this.empresas.forEach((elemento) => elemento.seleccionado = false);
          // this.obtenerActuales();
        } else {
          this.$vs.loading.close();
          this.$vs.notify({
            color: 'danger', title: 'Empresas del usuario', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, time: 10000
          });
        }
      }).catch(() => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger', title: 'Empresas del usuario', text: 'Error de plataforma', time: 10000
        });
      });
    }
  },
  mounted() {
    this.cargarEmpresas();
    this.getUsersCompany({
      empresaId: this.company.id,
      pagina: 1,
      filas: 9999,
      buscarInfoExtra: 'si',
      filtroInfoExtra: 'CARGO'
    });
    this.getGroupsCompany({
      empresaId: this.company.id
    });
    console.log('ACA', this);
  },
};
</script>

<style  lang="css">

.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}

.wrap-buttons {
  display: flex;
  justify-content: space-evenly;
}

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
