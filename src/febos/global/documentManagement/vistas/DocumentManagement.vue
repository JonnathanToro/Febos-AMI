<template>
<div>
  <vx-card title="Gestión de Documentos" title-color="primary">
    <div>
      <div class="row">
        <div class="col-md-4">
          <div class="mt-3">
            <tree-documents
              class="item"
              :item="personalRepository"
              @make-folder="makeFolder"
              @add-item="addItem"
              @get-children="getChildren"
            ></tree-documents>
          </div>
        </div>
        <div class="col-md-8" id="list-documents">
          <div class="row">
            <div class="col-md-12">
              <div class="actions">
                <vs-button
                  radius
                  v-tooltip="'Editar data documento'"
                  class="action mr-2"
                  color="primary"
                  icon="edit"
                />
                <vs-button
                  radius
                  v-tooltip="'Agregar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="add_circle_outline"
                />
                <vs-button
                  radius
                  v-tooltip="'Agregar carpeta'"
                  class="action mr-2"
                  color="primary"
                  icon="add_circle_outline"
                />
                <vs-button
                  radius
                  v-tooltip="'Copiar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="content_copy"
                />
                <vs-button
                  radius
                  v-tooltip="'Descargar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="save_alt"
                />
                <vs-button
                  radius
                  v-tooltip="'Deshabilitar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="toggle_off"
                />
                <vs-button
                  radius
                  v-tooltip="'Suscribirme'"
                  class="action mr-2"
                  color="primary"
                  icon="notifications_active"
                />
                <vs-button
                  radius
                  v-tooltip="'Enviar a flujo'"
                  class="action mr-2"
                  color="primary"
                  icon="sync_alt"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="mt-4" v-if="selectedFolder.children">
                <table class="w-100">
                  <thead style="background: #671e85; color:white;">
                    <tr>
                      <th>
                        Estado
                      </th>
                      <th>
                        Nombre
                      </th>
                      <th>
                        Tamaño
                      </th>
                      <th>
                        Fecha Publicación
                      </th>
                      <th>
                        Publicado por
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="document in selectedFolder.children" :key="document.febosId">
                      <td class="text-center">
                        <span v-if="document.estado === '1'">
                           <vs-icon
                             v-tooltip="'Documento No publicado'"
                             size="small"
                             icon="error_outline"
                             color="gray"
                           />
                        </span>
                        <span v-if="document.estado === '2'">
                          <vs-icon
                            v-tooltip="'Documento publicado'"
                            size="small"
                            icon="check_circle"
                            color="#77cc77"
                          />
                        </span>
                      </td>
                      <td>
                        {{document.nombre}}
                      </td>
                      <td>
                        {{document.size}}
                      </td>
                      <td>
                        {{document.fechaPublicacion}}
                      </td>
                      <td>
                        {{document.responsable}}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vx-card>
  <!--<PopUpGroup :group="selectedGroup" />-->
</div>
</template>

<script>

import { mapGetters } from 'vuex';

import TreeDocuments from '@/febos/global/documentManagement/components/TreeDocuments';

export default {
  components: {
    TreeDocuments
  },
  data() {
    return {
      page: 1,
      paginate: 10,
      treeView: true,
      selectedFolder: {},
      selectedDocument: {}
    };
  },
  watch: {
    loading(value) {
      if (!value) {
        this.$vs.loading.close('#list-documents > .con-vs-loading');
        return;
      }

      this.$vs.loading({
        container: '#list-documents',
        scale: 0.6
      });
    },
  },
  computed: {
    ...mapGetters('DocManagement', [
      'personalRepository',
      'loading'
    ]),
  },
  methods: {
    makeFolder(item) {
      // Vue.set(item, 'children', []);
      this.addItem(item);
      console.log('MAKE FOLDER', item);
    },
    getChildren(item) {
      if (item.type === 'folder') {
        this.selectedFolder = item;
      } else {
        this.selectedDocument = item;
      }
      console.log('getting info', item);
    },
    addItem(item) {
      item.children.push({
        name: 'new stuff'
      });
    },
    editGroup() {
      this.selectedGroup = this.group;
      this.showModals('modalGroup');
    },
    addGroup() {
      this.selectedGroup = {
        nombre: '',
        descripcion: '',
        codigo: '',
        isOffice: false
      };
      // this.showModals('modalGroup');
      console.log('ADD', this.selectedGroup);
    },
    addSubGroup() {
      console.log('ADD SUB', this.selectedGroup);
    }
  },
  mounted() {
    console.log('HOLA MUNDO', this.personalRepository);
  }
};
</script>

<style  lang="css">

.user-wrap {
  padding: 2px;
  display: flex;
}

.wrap-actions {
  display: flex;
  justify-content: flex-end;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
