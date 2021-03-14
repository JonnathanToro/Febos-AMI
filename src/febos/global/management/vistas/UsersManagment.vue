<template>
<div>
  <vx-card title="Gestión de usuarios" title-color="primary">
    <div style="display: flex;">
      <span v-if="treeView" class="pr-2">Cambiar a vista de árbol</span>
      <span v-if="!treeView" class="pr-2">Cambiar a vista de tabla</span>
      <vs-switch v-model="treeView"/>
    </div>
    <div v-if="!treeView">
      <vs-table
        :data="usersCompany" :search="true"
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
      <div class="mt-5 mb-4">
        <fb-paginacion
          :total="pagination.pages"
          :max="10"
          v-model="page"
        />
      </div>
    </div>
    <div v-if="treeView">
      <div class="row bg-white shadow-sm">
        <div class="col-md-4">
          <div class="mt-3">
            <tree-item
              class="item"
              :item="tree"
              @get-children="getChildren"
            />
          </div>
        </div>
        <div class="col-md-8" id="list-users">
          <div class="wrap-actions">
            <vs-button
              v-if="selectedGroup.nombre"
              class="action mr-2"
              color="primary"
              type="border"
              @click="editGroup()"
              size="small"
              icon="edit">
              Editar
            </vs-button>
            <vs-button
              v-if="selectedGroup.nombre"
              class="action mr-2"
              color="primary"
              type="border"
              @click="addSubGroup()"
              size="small"
              icon="add_circle_outline">
              Agregar SubGrupo
            </vs-button>
            <vs-button
              class="action"
              color="primary"
              type="border"
              @click="addGroup()"
              size="small"
              icon="add_circle_outline">
              Agregar
            </vs-button>
            <vs-button
              class="action"
              color="primary"
              type="border"
              @click="viewUsers()"
              size="small"
              icon="groups">
              Usuarios
            </vs-button>
          </div>
          <div>
            <h5 class="mb-4" v-if="selectedGroup.nombre">
              Usuarios del grupo {{selectedGroup.nombre}}
            </h5>
            <ul v-if="usersTree.length" >
              <li v-for="user in usersTree" :key="user.id">
                <div class="user-wrap">
                  <div class="con-img mr-3">
                    <img
                      v-if="user.avatar"
                      key="onlineImg"
                      :src="user.avatar"
                      alt="user-img"
                      width="40"
                      height="40"
                      class="rounded-full shadow-md cursor-pointer block"
                    />
                    <img
                      v-if="!user.avatar"
                      key="onlineImg"
                      :src="noAvatar"
                      alt="user-img"
                      width="40"
                      height="40"
                      class="rounded-full shadow-md cursor-pointer block"
                    />
                  </div>
                  <span style="line-height: 38px;">{{user.nombre}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-4 mb-4">
            <fb-paginacion
              :total="pagination.pages"
              :max="10"
              v-model="page"
            />
          </div>
        </div>
      </div>
    </div>
  </vx-card>

  <modal-usuario
    :editar="editar"
    :usuario="usuario"
    @cerrarEdicionUsuario="cancelarEdicion"
  />
  <PopUpEditGroup
    v-if="selectedGroup && action"
    :group="selectedGroup"
    :name="selectedGroup.nombre"
    :action="action"
  />
  <PopUpUsersGroup
    :group="selectedGroup"
  />
</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import modalUsuario from '@/febos/global/empresas/componentes/gestUsuarios/modalUsuario';
import TreeItem from '@/febos/global/management/vistas/components/TreeItem';
import FbPaginacion from '@/febos/chile/_vue/componentes/FbPaginacion';
import PopUpEditGroup from '@/febos/global/management/vistas/components/PopUpEditGroup';
import PopUpUsersGroup from '@/febos/global/management/vistas/components/PopUpUsersGroup';

export default {
  name: 'UsersManagement',
  components: {
    modalUsuario,
    TreeItem,
    FbPaginacion,
    PopUpEditGroup,
    PopUpUsersGroup
  },
  data() {
    return {
      page: 1,
      paginate: 10,
      treeView: true,
      editar: false,
      usuario: null,
      editarEmpresa: false,
      empresas: null,
      noAvatar: require('../../../../assets/images/no-avatar.svg'),
      tree: {
        name: '',
        children: []
      },
      usersTree: [],
      selectedGroup: {},
      action: ''
    };
  },
  watch: {
    page(newValue) {
      this.getUsersCompany({
        empresaId: this.company.id,
        pagina: newValue,
        filas: 10,
        buscarInfoExtra: 'si',
        filtroInfoExtra: 'CARGO'
      });
    },
    usersByGroup(newValue) {
      this.usersTree = newValue;
    },
    loading(value) {
      if (!value) {
        this.$vs.loading.close('#list-users > .con-vs-loading');
        return;
      }

      this.$vs.loading({
        container: '#list-users',
        scale: 0.6
      });
    },
    groupsCompany(newValue, oldValue) {
      console.log('WAT', newValue, oldValue);
      if (newValue !== oldValue) {
        this.tree.children = this.makeTree();
      }
    }
  },
  computed: {
    ...mapGetters('Empresas', [
      'company',
      'usersCompany',
      'groupsCompany',
      'firstGroupsCompany',
      'pagination',
      'usersByGroup',
      'loading'
    ]),
    ...mapGetters('Management', [
      'element'
    ])
  },
  methods: {
    ...mapActions('Empresas', [
      'getUsersCompany',
      'getGroupsCompany',
      'getUsersGroup'
    ]),
    ...mapActions('Modals', [
      'showModals',
      'closeModal'
    ]),
    ...mapActions('Management', [
      'setElement'
    ]),
    viewUsers() {
      this.showModals('modalUsersGroup');
    },
    editGroup() {
      this.action = 'edit';
      this.showModals('modalEditGroup');
    },
    addGroup() {
      this.action = 'add';
      this.selectedGroup = {
        nombre: '',
        descripcion: '',
        codigo: '',
        isOffice: false
      };
      this.showModals('modalEditGroup');
    },
    addSubGroup() {
      this.action = 'add';
      const padreId = this.element.id;
      const parentName = this.element.nombre;
      this.selectedGroup = {
        nombre: '',
        descripcion: '',
        codigo: '',
        isOffice: false,
        padreId,
        padreNombre: parentName
      };
      this.showModals('modalEditGroup');
    },
    getChildren(item) {
      this.setElement(item);
      this.selectedGroup = { ...item };
      if (item.name !== this.company.razonSocial) {
        this.getUsersGroup(item.id);
        this.usersTree = this.usersByGroup;
      } else {
        this.getUsersCompany({
          empresaId: this.company.id,
          pagina: 1,
          filas: 10,
          buscarInfoExtra: 'si',
          filtroInfoExtra: 'CARGO'
        });
        this.usersTree = this.usersCompany;
      }
    },
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
    checkParent(groupNode) {
      return this.groupsCompany.filter((group) => group.padreId === groupNode.id).map((group) => ({
        ...group,
        children: this.checkParent(group)
      }));
    },
    makeTree() {
      return this.firstGroupsCompany.map((group) => ({
        ...group,
        children: this.checkParent(group)
      }));
    }
  },
  async created() {
    this.setElement({});
    this.closeModal();
    await this.getUsersCompany({
      empresaId: this.company.id,
      pagina: 1,
      filas: 10,
      buscarInfoExtra: 'si',
      filtroInfoExtra: 'CARGO'
    });
    await this.getGroupsCompany({
      empresaId: this.company.id
    });
    this.tree.name = this.company.razonSocial;
    this.tree.children = this.makeTree();
    this.usersTree = this.usersCompany;
    console.log('rbol', this);
  }
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

.user-wrap {
  padding: 2px;
  display: flex;
}

.wrap-actions {
  display: flex;
  justify-content: flex-end;
}
.action {
  cursor: pointer;
}
</style>
