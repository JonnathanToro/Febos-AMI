<template>
<div>
  <vx-card title="Gestión de Documentos" title-color="primary">
    <div>
      <div class="row mb-5">
        <div class="col-md-4 wrap-tree">
          <div class="mt-3">
            <tree-documents
              class="item"
              :item="personalRepository"
              @make-folder="makeFolder"
              @add-item="addItem"
              @get-children="getChildren"
              @get-detail="getDetail"
            ></tree-documents>
          </div>
        </div>
        <div class="col-md-8" id="list-documents">
          <div>
            <h5 class="mt-1">
              Detalles
              <span v-if="detailItem.type === 'folder'">
                de la carpeta
              </span>
              <span v-if="detailItem.type === 'document'">
                del documento
              </span>
              <span class="text-primary">{{detailItem.nombre}}</span>
            </h5>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="actions">
                <vs-button
                  radius
                  v-tooltip="'Agregar carpeta'"
                  class="action mr-2"
                  color="primary"
                  icon="create_new_folder"
                  @click="makeFolder"
                />
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
                  icon="note_add"
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
              <div class="mt-4 wrap-table" v-show="selectedFolder.children">
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
              <vs-divider />
              <div class="mt-4 wrap-detail">
                <div style="display: none">
                  <h5 class="mt-4">
                    Detalles
                    <span v-if="detailItem.type === 'folder'">
                       de la carpeta
                    </span>
                    <span v-if="detailItem.type === 'document'">
                       del documento
                    </span>
                    <span class="text-primary">{{detailItem.nombre}}</span>
                  </h5>
                </div>
                <vs-tabs alignment="center">
                  <vs-tab label="Detalles">
                    <div class="row">
                      <div class="col-md-6">
                        <vs-list>
                          <vs-list-item
                            :title="detailItem.fechaCreacion"
                            subtitle="Fecha de creación"
                          />
                          <vs-list-item
                            :title="detailItem.fechaPublicacion"
                            subtitle="Fecha de publicación"
                          />
                          <vs-list-item
                            v-if="detailItem.type === 'folder'"
                            title="Carpeta"
                            subtitle="Tipo de elemento"
                          />
                          <vs-list-item
                            v-if="detailItem.type === 'document'"
                            title="Documento"
                            subtitle="Tipo de elemento"
                          />
                          <div>
                            <span v-if="detailItem.estado === '1'">
                              <vs-icon
                                class="mt-2 ml-1"
                                v-tooltip="'Documento No publicado'"
                                icon="error_outline"
                                color="gray"
                              />
                              No publicado
                            </span>
                            <span v-if="detailItem.estado === '2'">
                               <vs-icon
                                 class="mt-2 ml-1"
                                 v-tooltip="'Documento publicado'"
                                 icon="check_circle"
                                 color="#77cc77"
                               />
                              Publicado
                            </span>
                            <div class="vs-list--subtitle subtitle">Estado del elemento</div>
                          </div>
                        </vs-list>
                      </div>
                      <div class="col-md-6">
                        <vs-list>
                          <vs-list-item
                            :title="detailItem.nombre"
                            subtitle="Nombre de elemento"
                          />
                          <vs-list-item
                            :title="detailItem.febosId"
                            subtitle="ID de elemento"
                          />
                          <vs-list-item
                            :title="detailItem.size"
                            subtitle="Tamaño de elemento"
                          />
                          <vs-list-item
                            :title="detailItem.responsable"
                            subtitle="Creado por"
                          />
                        </vs-list>
                      </div>
                    </div>
                  </vs-tab>
                  <vs-tab label="Permisos">
                    <vs-list class="row">
                      <vs-list-item
                        class="col-md-6"
                        v-for="permission in detailItem.permisos"
                        :key="permission.codigo"
                        :title="permission.nombre"
                        :subtitle="permission.codigo"
                      />
                    </vs-list>
                  </vs-tab>
                  <vs-tab label="Suscripciones">
                    <vs-list class="row" v-if="detailItem.suscriptores">
                      <div
                        class="col-md-6 border-bottom"
                        v-for="subscriber in detailItem.suscriptores"
                        :key="subscriber.id"
                      >
                        <vs-list-item
                          :title="subscriber.nombre"
                          :subtitle="subscriber.correo"
                        >
                          <vs-chip color="primary">
                            {{ subscriber.rango }}
                          </vs-chip>
                        </vs-list-item>
                      </div>
                    </vs-list>
                    <div v-if="!detailItem.suscriptores">
                      <h5 class="mt-3">No hay suscripciones para este elemento</h5>
                    </div>
                  </vs-tab>
                </vs-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vx-card>
  <PopUpAddElement :element="this.detailItem" :type="typeOfElement" />
</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import PopUpAddElement from '@/febos/global/documentManagement/vistas/modals/PopUpAddElement';
import TreeDocuments from '@/febos/global/documentManagement/components/TreeDocuments';

export default {
  components: {
    TreeDocuments,
    PopUpAddElement
  },
  data() {
    return {
      page: 1,
      paginate: 10,
      treeView: true,
      selectedFolder: {},
      selectedDocument: {},
      detailItem: {},
      typeOfElement: ''
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
    ...mapActions('Modals', [
      'showModals',
      'closeModal'
    ]),
    makeFolder() {
      this.typeOfElement = 'folder';
      this.showModals('addElement');
    },
    getChildren(item) {
      if (item.type === 'folder') {
        this.selectedFolder = item;
      } else {
        this.selectedDocument = item;
      }
    },
    getDetail(item) {
      this.detailItem = item;
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
    this.closeModal();
    this.selectedFolder = this.personalRepository;
    this.detailItem = this.personalRepository;
    this.selectedItem = this.personalRepository;
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
.wrap-table {
  height: 300px;
  overflow: scroll;
}

.wrap-detail {
  height: 300px;
  overflow: scroll;
}
.subtitle {
  font-size: 0.85rem;
  padding-left: 4px;
}
.text-primary {
  color: #671e85 !important;
}
.wrap-tree {
  background: #323e4836;
  border-radius: 6px;
}
</style>
