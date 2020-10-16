<template>

  <vs-row>

      <vs-col vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="8">
        <div v-if="getData.imagenLink != null" style="width:100%; height:1000px;">
          <iframe height="1000" width="100%" style="width:100%; height:100%;" :src="getData.imagenLink" frameborder="0"></iframe>
        </div>
      </vs-col>

      <vs-col vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="4">
      <div v-if="getData != null" vs-w="12">
    <div class="vx-card">
      <div class="vx-card__header">
        <div class="vx-card__title">
          <h4 class>Resumen Actividad</h4>
          <label for="">Todos / Importantes</label>
          <vs-switch v-model="switch1" @click="metodoSwitch()"/>
          <!---->
        </div>
        <!---->
      </div>
      <div v-if="switch1" class="vx-card__collapsible-content vs-con-loading__container" style="width:100%; height:100%;">
        <div class="vx-card__body" style="width:100%; height:100%;">

          <ul class="vx-timeline" style="width:100%; height:100%;">
            <li v-for="elemento in getData.bitacora" :key="elemento.bitacoraId">
                <div v-if="elemento.tipoVista !== 6">
                  <div class="timeline-icon bg-primary">
                  <span class="feather-icon select-none relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus text-white stroke-current w-5 h-5"
                      data-darkreader-inline-fill
                      data-darkreader-inline-stroke
                      style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
                <div class="timeline-info">
                  <p class="font-semibold">{{elemento.usuarioNombre}}</p>
                  <span class="activity-desc">{{elemento.mensaje}}</span>
                </div>
                <small class="text-grey activity-e-time">{{elemento.fecha | moment("DD-MM-YYYY, hh:mm")}}</small>
                </div>
                <div v-else>

                </div>
            </li>
          </ul>
          <span>No existen registros</span>
        </div>
        <!---->
      </div>

      <div v-else class="vx-card__collapsible-content vs-con-loading__container">
        <div class="vx-card__body">

          <ul class="vx-timeline">
            <li v-for="elemento in getData.bitacora" :key="elemento.bitacoraId">
                <div class="timeline-icon bg-primary">
                  <span class="feather-icon select-none relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus text-white stroke-current w-5 h-5"
                      data-darkreader-inline-fill
                      data-darkreader-inline-stroke
                      style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
                <div class="timeline-info">
                  <p class="font-semibold">{{elemento.usuarioNombre}}</p>
                  <span class="activity-desc">{{elemento.mensaje}}</span>
                </div>
                <small class="text-grey activity-e-time">{{elemento.fecha | moment("DD-MM-YYYY, hh:mm")}}</small>
            </li>
          </ul>
        </div>
        <!---->
      </div>
      <div class="vx-card__code-container collapsed" style="max-height: 0px; display: none;">
        <div class="code-content">
          <pre class="language-markup"><code class="language-markup"></code></pre>
        </div>
      </div>
    </div>
  <!--
    <div
      style="width: 100%"
      v-for="elemento in getData.bitacora"
      :key="elemento.bitacoraId"
    >
    </div>
    -->
  </div>
    </vs-col>
  </vs-row>

</template>

<script>
import modalStore from "@/store/modals/acciones";

export default {
  name: "modalBitacora",
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  mounted() {
    console.log("GetData: ",this.getData);

  },
  data() {
    return {
      switch1: false
    };
  },
  methods: {
    metodoSwitch() {
      console.log(this.switch1);
    }
  },
};
</script>

<style>
[dir="ltr"] .vx-timeline li .timeline-icon {
  left: -4.3rem;
}
[dir] .vx-timeline li .timeline-icon {
  border-radius: 50%;
  padding: 0.75rem;
  padding-bottom: 0.4rem;
}
.vx-timeline li .timeline-icon {
  position: absolute;
  top: 0;
}
.vx-timeline {
  margin-left: 1.5rem;
  padding-left: 40px;
  border-left: 2px solid #e5e8eb;
  border-left-color: rgb(54, 59, 61);
}
ol,
[dir] ul {
  margin: 0;
  padding: 0;
}
[dir] .vx-timeline li {
  margin-bottom: 20px;
}
[dir] .vx-card .vx-card__collapsible-content .vx-card__body {
  padding: 1.5rem;
}
.vx-timeline li {
  position: relative;
}
[dir="ltr"] .vx-timeline {
  border-left-color: rgb(121, 112, 99);
}
[dir] .bg-primary {
  background-color: rgb(24, 14, 138) !important;
}
</style>
