<template>
  <vs-popup :title="`Actualizar Actividad para expediente ${file.numero}`" :active.sync="showModal">
    <div>
      <h5>
        Por favor selecciona la actividad para
         la cual deseas actualizar el estado en el expediente
      </h5>
      <div class="row mb-3">
        <div class="col-md-6">
          <List-activities
            class="w-100"
            autocomplete
            label="Actividad"
            name="activity"
            v-model="activity"
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
          />
        </div>
      </div>
    </div>
    <div class="m-top-20 text-center">
      <vs-button
        v-on:click="updateFileActivity()"
        color="primary"
        type="border"
      >
        Actualizar expediente
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
      stateActivity: ''
    };
  },
  computed: {
    ...mapGetters('Dnts', [
      'commentsEd'
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
      'sendDntFile'
    ]),
    updateFileActivity() {
      console.log('this', this);
    }
  }
};
</script>
<style>

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
