<template>
<div>
  <vx-card title="Gestión de Documentos" title-color="primary">
    <div>
      <div class="row mb-5">
        <div class="col-md-4 shadow bg-white rounded">
          <div class="mt-3">
            <tree-documents
              class="item"
              :item="tree"
              @make-folder="makeFolder"
              @add-item="addItem"
              @get-children="getChildren"
              @get-detail="getDetail"
            />
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
                  v-if="!editMood
                   && detailItem.permisos && detailItem.permisosCodigo.includes('PER2')"
                  radius
                  v-tooltip="'Editar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="edit"
                  @click="enableEditMood"
                />
                <vs-button
                  v-if="editMood
                   && detailItem.permisos && detailItem.permisosCodigo.includes('PER2')"
                  radius
                  v-tooltip="'Editar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="save"
                  @click="saveModification"
                />
                <vs-button
                  radius
                  v-tooltip="'Agregar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="note_add"
                  @click="addItem"
                />
                <vs-button
                  v-if="!editMood
                   && detailItem.permisos && detailItem.permisosCodigo.includes('PER4')"
                  radius
                  v-tooltip="'Descargar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="save_alt"
                  @click="downloadDocument"
                />
                <vs-button
                  v-if="detailItem.estado === '2'
                    && detailItem.permisos && detailItem.permisosCodigo.includes('PER8')"
                  radius
                  v-tooltip="'Deshabilitar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="toggle_on"
                  @click="disableItem"
                />
                <vs-button
                  v-if="detailItem.estado === '1'
                    && detailItem.permisos && detailItem.permisosCodigo.includes('PER8')"
                  radius
                  v-tooltip="'Publicar documento'"
                  class="action mr-2"
                  color="primary"
                  icon="toggle_off"
                  @click="publishItem"
                />
                <vs-button
                  v-if="detailItem.responsable !== 'Letty Villamizar'"
                  radius
                  v-tooltip="'Subscrito'"
                  class="action mr-2"
                  color="primary"
                  icon="notifications_active"
                  @click="unSubscribe"
                />
                <vs-button
                  v-if="detailItem.permisos && detailItem.permisosCodigo.includes('PER6')"
                  radius
                  v-tooltip="'Enviar a flujo'"
                  class="action mr-2"
                  color="primary"
                  icon="sync_alt"
                  @click="sendToFlow"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="mt-4 wrap-table shadow bg-white rounded">
                <table class="w-100 rounded">
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
                    <tr v-if="detailItem.type === 'document'">
                      <td class="text-center d-flex justify-content-lg-around">
                        <span v-if="detailItem.estado === '1'">
                          <vs-icon
                            v-tooltip="'Documento No publicado'"
                            size="small"
                            icon="error_outline"
                            color="gray"
                          />
                        </span>
                        <span v-if="detailItem.estado === '2'">
                          <vs-icon
                            v-tooltip="'Documento publicado'"
                            size="small"
                            icon="check_circle"
                            color="#77cc77"
                          />
                        </span>
                        <span>
                          <vs-icon
                            v-if="detailItem.type === 'folder'"
                            size="small"
                            icon="folder"
                            color="gray"
                          />
                          <vs-icon
                            v-if="detailItem.type === 'document'"
                            size="small"
                            icon="file_present"
                            color="gray"
                          />
                        </span>
                      </td>
                      <td>
                        {{detailItem.nombre}}
                      </td>
                      <td>
                        {{detailItem.size}}
                      </td>
                      <td>
                        {{detailItem.fechaPublicacion}}
                      </td>
                      <td>
                        {{detailItem.responsable}}
                      </td>
                    </tr>
                    <tr
                      v-for="document in detailItem.children"
                      :key="document.febosId"
                      v-show="detailItem.children.length"
                    >
                      <td class="text-center d-flex justify-content-lg-around">
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
                        <span>
                          <vs-icon
                            v-if="document.type === 'folder'"
                            size="small"
                            icon="folder"
                            color="gray"
                          />
                          <vs-icon
                            v-if="document.type === 'document'"
                            size="small"
                            icon="file_present"
                            color="gray"
                          />
                        </span>
                      </td>
                      <td>
                        <span
                          v-on:click="getDetail(document)"
                          style="cursor:pointer;"
                        >
                          {{document.nombre}}
                        </span>
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
              <div class="mt-4 wrap-detail shadow bg-white rounded">
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
  <PopUpAddElement :element="this.detailItem" :typeElement="typeOfElement" />
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
      tree: {},
      selectedFolder: {},
      selectedDocument: {},
      detailItem: {},
      typeOfElement: '',
      editMood: false,
      editElement: {}
    };
  },
  watch: {
    personalRepository() {
      this.tree.children = this.makeTree();
    },
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
      'personalRepositoryParent',
      'loading'
    ]),
  },
  methods: {
    ...mapActions('Modals', [
      'showModals',
      'closeModal'
    ]),
    ...mapActions('DocManagement', [
      'publishElement',
      'disableElement',
      'unSubscribeTo',
      'goToFlow',
      'downloadFilePDF'
    ]),
    unSubscribe() {
      this.unSubscribeTo(this.detailItem);
    },
    enableEditMood() {
      this.typeOfElement = this.detailItem.type;
      this.showModals('addElement');
    },
    saveModification() {
      console.log('SAVE', this.editElement);
    },
    downloadDocument() {
      this.downloadFilePDF({
        febosId: '68483ee2201b324e08295632f39fb0458e66',
        imagen: 'si',
        regenerar: 'si',
        tipoImagen: 0
      });
    },
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
    publishItem() {
      this.publishElement(this.detailItem);
    },
    disableItem() {
      this.disableElement(this.detailItem);
    },
    addItem() {
      this.typeOfElement = 'document';
      this.showModals('addElement');
    },
    sendToFlow() {
      this.goToFlow();
    },
    checkParent(group) {
      return this.personalRepository
        .filter((groupNode) => groupNode.padreId === group.febosId).map((groupMap) => ({
          ...groupMap,
          children: this.checkParent(groupMap)
        }));
    },
    makeTree() {
      return this.personalRepositoryParent.map((group) => ({
        ...group,
        children: this.checkParent(group)
      }));
    }
  },
  created() {
    this.closeModal();
    // eslint-disable-next-line prefer-destructuring
    this.tree = this.makeTree()[0];
    this.selectedFolder = this.tree;
    this.detailItem = this.tree;
    this.selectedItem = this.tree;
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
.wrap-option {
  background:  #f8f8f8;
  margin-bottom: 6px;
}

.input-option {
  color: inherit;
  margin-top: 4px;
  width: 80%;
  background: transparent;
}

.input-blocked {
  color: inherit;
  pointer-events: none;
  border: none !important;
  padding: 4px 4px 6px 4px;
  border-radius: 5px;
}

.input-edit {
  color: inherit;
  border: 1px solid #66258324;
  padding: 4px 4px 6px 4px;
  border-radius: 5px;
}

.label-details {
  color: red;
}

</style>
