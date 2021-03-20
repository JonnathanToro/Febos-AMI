<template>

  <vs-row>

      <vs-col vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="8">
        <div v-if="getData.imagenLink != null" style="width:100%; height:1000px;">
          <iframe height="1000" width="100%" style="width:100%; height:100%;" :src="getData.imagenLink" frameborder="0"></iframe>
        </div>
      </vs-col>

      <vs-col vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="4">
      <div v-if="getData != null" vs-w="12" style="width: 100%; margin-left: 15px;">
    <div class="vx-card margen-inferior" style="width: 100%;">
      <div class="vx-card__header">
        <div class="vx-card__title">
          <h4 class>Resumen Actividad</h4>
          <label for="">Todos / Importantes</label>
          <vs-switch v-model="switchImportantes"/>
          <!---->
        </div>
        <!---->
      </div>
      <div class="vx-card__collapsible-content vs-con-loading__container" style="width:100%; height:100%;">
        <div class="vx-card__body" style="width:100%; height:100%;" v-if="switchImportantes">

          <ul class="vx-timeline" style="width:100%; height:100%;">
            <div v-if="importantes.length > 0">
              <li v-for="elemento in importantes" :key="elemento.bitacoraId">
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
            </div>
            <div v-else>
              <li>
                <span>
                  Sin registros importantes para mostrar
                </span>
              </li>
            </div>

          </ul>
        </div>
        <!---->
      <!--</div>

      <div class="vx-card__collapsible-content vs-con-loading__container" style="width:100%; height:100%;">-->
        <div class="vx-card__body" style="width:100%; height:100%;" v-if="!switchImportantes">

          <ul class="vx-timeline" style="width:100%; height:100%;">
            <div v-if="todos.length > 0">
              <li v-for="elemento in todos" :key="elemento.bitacoraId">
                  <div class="timeline-icon bg-primary">
                  <span class="feather-icon select-none relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="red"
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
            </div>
            <div v-else>
              <li>
                <span>
                  Sin registros para mostrar
                </span>
              </li>
            </div>

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
import modalStore from '@/store/modals/acciones';

export default {
  name: 'modalBitacora',
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  mounted() {
    this.getData.bitacora.forEach((element) => {
      if (element.tipo == 29 || element.tipo == 30) {
        // this.importantes.push(element);
        this.todos.push(element);
      } else {
        this.importantes.push(element);
        // this.todos.push(element);
      }
    });
  },
  data() {
    return {
      todos: [],
      importantes: [],
      switchImportantes: true
    };
  },
  methods: {
    metodoSwitch() {
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
.margen-inferior {
  margin-bottom: 15px;;
}
</style>
