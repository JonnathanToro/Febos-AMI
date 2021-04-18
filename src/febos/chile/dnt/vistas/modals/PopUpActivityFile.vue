<template>
  <vs-popup
    :title="`Actualizar Actividad para expediente ${file.numero}`" :active.sync="showModal"
    @close="onModalClose()"
  >
    <div>
      <h5>
        Por favor selecciona la actividad para
         la cual deseas actualizar el estado en el expediente
      </h5>
      <div class="row mb-3">
        <div class="col-md-12">
          <div class="py-2 box-activities">
            <vs-table
              class="wrap-table"
              stripe
              :data="(activities || [])"
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
                <vs-th>
                  ...
                </vs-th>
              </template>
              <template>
                <tbody>
                <vs-tr
                  v-for="(activity, index) in activities"
                  :key="index"
                >
                  <vs-td>
                    {{ activity.actividadDescripcion }}
                  </vs-td>
                  <vs-td>
                    {{activity.actividadEstadoDescripcion}}
                  </vs-td>
                  <vs-td>
                    {{activity.fechaCreacion | dateFormatTime}}
                  </vs-td>
                  <vs-td>
                    <vs-button
                      color="primary"
                      type="border"
                      icon="edit"
                      @click="editActivity(activity)"
                    />
                  </vs-td>
                </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
        </div>
        <div class="col-md-6">
          <List-activities
            class="w-100"
            autocomplete
            label="Actividad"
            name="activity"
            v-model="activity"
            ref="activity"
          />
        </div>
        <div class="col-md-6">
          <List-activity-state
            class="w-100"
            autocomplete
            label="Estados para la actividad"
            name="stateActivity"
            v-model="stateActivity"
            :parent-value="activity"
            ref="stateActivity"
          />
        </div>
      </div>
    </div>
    <div class="m-top-20 text-center">
      <vs-button
        v-if="!updateMood"
        v-on:click="addFileActivity()"
        color="primary"
        type="border"
      >
        Registrar Actividad
      </vs-button>
      <vs-button
        v-if="updateMood"
        v-on:click="updateFileActivity()"
        color="primary"
        type="border"
      >
        Actualizar actividad
      </vs-button>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import ListActivities from '@/febos/chile/lists/components/ListActivities';
import ListActivityState from '@/febos/chile/lists/components/ListActivityState';

export default {
  name: 'PopUpActivityFile',
  components: {
    ListActivityState,
    ListActivities
  },
  props: {
    file: {
      type: [Object]
    }
  },
  data() {
    return {
      activity: '',
      stateActivity: '',
      activityId: '',
      updateMood: false
    };
  },
  computed: {
    ...mapGetters('Dnts', [
      'activities'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'activitiesFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Modals', [
      'closeModal'
    ]),
    ...mapActions('Dnts', [
      'addActivityFile',
      'updateActivityFile'
    ]),
    editActivity(activity) {
      this.activity = activity.actividadId;
      this.stateActivity = activity.actividadEstado;
      this.activityId = activity.dntActividadId;
      this.updateMood = true;
    },
    clearData() {
      this.activity = '';
      this.stateActivity = '';
      this.activityId = '';
      this.updateMood = false;
    },
    addFileActivity() {
      const activityName = this.activity
        ? this.$refs.activity.getOption().label : '';
      const stateActivityName = this.stateActivity
        ? this.$refs.stateActivity.getOption().label : '';

      const activityFile = {
        actividadId: this.activity,
        actividadDescripcion: activityName,
        actividadEstado: this.stateActivity,
        actividadEstadoDescripcion: stateActivityName
      };

      this.addActivityFile({
        febosId: this.file.febosId,
        activity: activityFile
      });
      this.clearData();
    },
    updateFileActivity() {
      const activityName = this.activity
        ? this.$refs.activity.getOption().label : '';
      const stateActivityName = this.stateActivity
        ? this.$refs.stateActivity.getOption().label : '';

      const activityFile = {
        actividadId: this.activity,
        actividadDescripcion: activityName,
        actividadEstado: this.stateActivity,
        actividadEstadoDescripcion: stateActivityName,
        dntActividadId: this.activityId
      };

      this.updateActivityFile({
        febosId: this.file.febosId,
        activity: activityFile
      });
      this.clearData();
    },
    onModalClose() {
      this.clearData();
    }
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

.wrap-option {
  display: flex;
  justify-content: space-around;
}

.wrap-form {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.pill-comment-user {
  width: 90%;
  border: 1px solid #c2f785;
  border-radius: 25px;
  margin-bottom: 10px;
  float: left;
}

.pill-comment-me {
  width: 90%;
  border: 1px solid #3a9eef6b;
  border-radius: 25px;
  margin-bottom: 10px;
  float: right;
}
</style>
