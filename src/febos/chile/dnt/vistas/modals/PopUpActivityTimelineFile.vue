<template>
  <vs-popup
    :title="`Actividades para expediente ${file.numero}`" :active.sync="showModal"
    @close="closeModal()"
  >
    <div>
      <div class="row mb-3">
        <div class="col-md-12">
          <div class="chip-custom">
            Acá podrás ver el detalle de las actividades
             registradas a este expediente... despliega sobre el usuario
             que quieras ver la información
          </div>
          <div class="my-3 order">
            Ordenar por usuarios
            <vs-switch class="ml-3" v-model="sortByUsers"/>
          </div>
          <div class="py-2 box-activities" v-if="sortByUsers">
            <vs-collapse accordion>
              <vs-collapse-item
                v-for="(activityUser, index) in Object.keys(activitiesHistory)"
                :key="index">
                <div slot="header" class="pt-2 title-activity">
                  {{ activityUser }}
                </div>
                <vs-table
                  class="wrap-table"
                  stripe
                  :data="(activityUser || [])"
                  noDataText="No hay actividades aun"
                >
                  <template slot="header">
                  </template>
                  <template slot="thead">
                    <vs-th>
                      Actividad
                    </vs-th>
                    <vs-th>
                      Estado
                    </vs-th>
                    <vs-th>
                      Fecha
                    </vs-th>
                  </template>
                  <template>
                    <tbody>
                    <vs-tr
                      v-for="(activity, index) in activitiesHistory[activityUser]"
                      :key="index"
                    >
                      <vs-td>
                        {{ activity.actividadDescripcion }}
                      </vs-td>
                      <vs-td>
                        {{activity.actividadEstadoDescripcion}}
                      </vs-td>
                      <vs-td>
                        <small>{{activity.fechaCreacion | dateFormatTime}}</small>
                      </vs-td>
                    </vs-tr>
                    </tbody>
                  </template>
                </vs-table>
              </vs-collapse-item>
            </vs-collapse>
          </div>
          <div class="py-2 box-activities" v-if="!sortByUsers">
            <vs-table
              class="wrap-table"
              stripe
              :data="(activitiesHistoryDates || [])"
              noDataText="No hay actividades aun"
            >
              <template slot="header">
              </template>
              <template slot="thead">
                <vs-th>
                  Actividad
                </vs-th>
                <vs-th>
                  Estado
                </vs-th>
                <vs-th>
                  Fecha
                </vs-th>
              </template>
              <template>
                <tbody>
                <vs-tr
                  v-for="(activity, index) in activitiesHistoryDates"
                  :key="index"
                >
                  <vs-td>
                    {{ activity.actividadDescripcion }}
                    <div>
                      <small>{{ activity.usuarioNombre }}</small>
                    </div>
                  </vs-td>
                  <vs-td>
                    {{activity.actividadEstadoDescripcion}}
                  </vs-td>
                  <vs-td>
                    <small>{{activity.fechaCreacion | dateFormatTime}}</small>
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

export default {
  name: 'PopUpActivityTimelineFile',
  props: {
    file: {
      type: [Object]
    }
  },
  data() {
    return {
      sortByUsers: true,
    };
  },
  computed: {
    ...mapGetters('Dnts', [
      'activitiesHistory',
      'activitiesHistoryDates'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'activitiesTimelineFile';
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
.order {
  display: flex;
  justify-content: flex-end;
}
</style>
