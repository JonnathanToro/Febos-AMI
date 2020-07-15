<template>
  <div id="actividades-item">
    <td class="td vs-table--td" align="center">
      <span class="fecha-lbl">
        <i class="material-icons">calendar_today</i>
        {{ item.fecha }}
        <i class="material-icons ml-2">timer</i>
        {{ item.hora }}
      </span>
    </td>
    <td class="td vs-table--td">
      <div class="actividad-lbl">
        <vs-chip color="rgb(55, 129, 255)"> {{ labelAzul(item.accion) }}</vs-chip> <span class="bold ml-1"> {{ actividad(item.accion) }}</span>
      </div>
    </td>
    <td class="td vs-table--td" align="center">
      <span v-if="item.ip">
        {{ item.ip }}
      </span>
      <span v-else class="chip-ejecucion">
        <vs-chip color="#5B5754">Ejecución interna</vs-chip>
      </span>
    </td>
    <td class="td vs-table--td" align="center">
      <span>
        <div v-if="item.completado !== 'Si'" class="resultado">
          <vs-chip color="danger">error</vs-chip>
        </div>
        <div v-else class="resultado">
          <vs-chip color="success">ok</vs-chip>
        </div>
      </span>
    </td>
    <td class="td vs-table--td b-acciones" align="center">
      <span>
        <vx-tooltip text="Ver ID de seguimiento" position="top">
          <vs-button
            radius
            color="primary"
            type="border"
            icon="remove_red_eye"
            @click.stop="$emit('abrirPrompIdActividad', item.actividadId)"
          ></vs-button>
        </vx-tooltip>
        <vx-tooltip text="Ver logs" position="top">
          <vs-button
            radius color="primary"
            type="border"
            icon="search"
            @click="$router.push({name:'logs', params: { id: item.actividadId }})"
          ></vs-button>
        </vx-tooltip>
      </span>
    </td>
  </div>
</template>
<script>

  export default {
    name: 'actividades-item',
    props: ['item'],
    methods: {
      labelAzul(texto) {
        return texto.substr(1,5);
      },
      actividad(texto){
        return texto.substr(8, texto.length);
      },
    },
  }
</script>
<style lang="scss">

  #actividades-item {
    display: contents;
    .chip-ejecucion {
      display: inherit;
    }
  }

  .fecha-lbl {
    display: inline-flex;
    i {
      font-size: 16px;
    }
  }

  .actividad-lbl {
    display: inline-flex;
  }

  .bold {
    font-weight: 600;
  }
</style>
