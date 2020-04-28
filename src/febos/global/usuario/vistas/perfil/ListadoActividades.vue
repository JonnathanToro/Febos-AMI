<template>
  <div id="listado-actividades">

    <!-- Tabla de actividades -->
    <div class="vs-component vs-con-table vs-table-primary">
      <div class="con-tablex vs-table--content">
        <div class="vs-con-tbody vs-table--tbody">
          <table class="vs-table vs-table--tbody-table">
            <thead class="vs-table--thead">
            <tr>
              <th colspan="1" rowspan="1" class="col-0 col">
                <div class="vs-table-text">
                  Fecha/Hora
                </div>
              </th>
              <th colspan="1" rowspan="1" class="col-0 col">
                <div class="vs-table-text">
                  Actividad
                </div>
              </th>
              <th colspan="1" rowspan="1" class="col-0 col">
                <div class="vs-table-text">
                  IP
                </div>
              </th>
              <th colspan="1" rowspan="1" class="col-0 col">
                <div class="vs-table-text">
                  Resultado
                </div>
              </th>
              <th colspan="1" rowspan="1" class="col-0 col">
                <div class="vs-table-text">
                  Acciones
                </div>
              </th>
            </tr>
            </thead>
            <tr class="tr-values vs-table--tr tr-table-state-null selected" v-bind:key="indextd" v-for="(item, indextd) in data">

              <actividades-item
                :item="item"
                @abrirPrompIdActividad="abrirPrompIdActividad"
              ></actividades-item>

            </tr>
          </table>
        </div>
      </div>
    </div>
    <!--END Tabla de actividades -->

    <!-- Ventana ver ID Actividad -->
    <vs-prompt
      accept-text="Aceptar"
      cancel-text="Cancelar"
      title="Aqui puede copiar el ID de la Actividad"
      :buttons-hidden="true"
      :active.sync="promptIdActividad"
      id="prompt-id-actividad"
    >
      <div class="contenido">
        <vs-input
          class="w-full"
          name="id"
          disabled="true"
          icon-pack="material-icons"
          icon="remove_red_eye"
          icon-no-border
          label="Id Actividad"
          v-model="idActividad"></vs-input>
        <vs-button
          class="mt-5"
          type="border"
          @click="cerrarPromptIdActividad"
          v-clipboard="idActividad"
        >Copiar</vs-button>
      </div>
    </vs-prompt>
    <!-- END Ventana ver ID Actividad-->
  </div>
</template>

<script>

  import ActividadesItem from './ActividadesItem';
  export default {
    name: 'ListadoActividades',
    components: {
      ActividadesItem
    },
    props: {
      data: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        promptIdActividad: false,
        idActividad: '',
      }
    },
    computed: {},
    created() {},
    methods: {
      cerrarPromptIdActividad() {
        setTimeout(()=> {
          this.promptIdActividad = false;
        }, 500);

      },
      abrirPrompIdActividad(id) {
        this.idActividad = id;
        this.promptIdActividad = true;
      }
    },
    beforeDestroy() {
      if(this.promptIdActividad) document.getElementById("prompt-id-actividad").remove();
    }
  }

</script>

<style lang="scss">
  th {
    .vs-table-text {
      justify-content: center;
    }
  }

  .resultado {
    display: inline-block;
  }

  .b-acciones {
    span {
      display: inline-flex;
    }
    .vs-button {
      margin-right: 2px;
    }
    .vs-icon {
      font-size: 1.2rem;
    }
  }

  .contenido {
    display: flex;
    flex-direction: column;
    input {
      text-align: center;
    }
  }
</style>
