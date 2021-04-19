<template>
  <vs-popup
    :title="`Referencias en expediente ${file.numero}`"
    :active.sync="showModal"
  >
    <div>
      <div class="row mb-3">
        <div class="col-md-12">
          <div class="py-2 box-activities">
            <vs-table
              class="wrap-table"
              stripe
              :data="(references || [])"
              noDataText="No hay referencias aun"
            >
              <template slot="header">
              </template>
              <template slot="thead">
                <vs-th>
                  Tipo Doc.
                </vs-th>
                <vs-th>
                  Número / Folio
                </vs-th>
                <vs-th>
                  Fecha
                </vs-th>
              </template>
              <template>
                <tbody>
                <vs-tr
                  v-for="(reference, index) in references"
                  :key="index"
                >
                  <vs-td>
                    {{ findTypeDocument(reference.tipoCodigo) }}
                  </vs-td>
                  <vs-td>
                    {{ reference.folioReferencia }}
                  </vs-td>
                  <vs-td>
                    {{ reference.fechaEmision }}
                  </vs-td>
                </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
        </div>
      </div>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import FindTypeDocumentMixin from '@/febos/chile/dnt/mixins/FindTypeDocumentMixin';

export default {
  name: 'PopUpReferencesFile',
  mixins: [FindTypeDocumentMixin],
  props: {
    file: {
      type: [Object]
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('Dnts', [
      'references'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'references';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Modals', [
      'closeModal'
    ])
  }
};
</script>
<style>

.box-activities {
  height: 260px;
  overflow-y: scroll;
}

.m-top-20 {
  margin-top: 20px;
}
.title-activity {
  color: #671e85;
}
.chip-custom {
  font-size: 12px;
  margin-top: 10px;
  color: #ffb300;
  background: #fff5df;
  border-radius: 10px;
  padding: 4px 8px;
}
</style>
