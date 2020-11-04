<template>

  <div>
    <vx-card title="Gestión de CAFs" title-color="primary">

      <vs-button size="small" style="margin-bottom: 10px;" @click="agregarCAF">Cargar CAFs</vs-button>
      <vs-table :data="cafs" :pagination="true" :maxItems="6" noDataText="Sin registros encontrados">
        <template slot="thead">
          <vs-th>Tipo documento</vs-th>
          <vs-th>Folios</vs-th>
          <vs-th>Usados</vs-th>
          <vs-th>Libres</vs-th>
          <vs-th>Rechaz</vs-th>
          <vs-th>Anulad</vs-th>
          <vs-th>Uso diario</vs-th>
          <vs-th>Restantes</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td :data="traducitTipoDocumentoEnPalabras(data[indextr].tipoDTE)">
              {{ traducitTipoDocumentoEnPalabras(data[indextr].tipoDTE) }}
            </vs-td>
            <vs-td :data="data[indextr].foliosTotales">
              {{data[indextr].foliosTotales}}
            </vs-td>
            <vs-td :data="data[indextr].foliosUsados">
              {{data[indextr].foliosUsados}}
            </vs-td>
            <vs-td :data="data[indextr].foliosLibres">
              {{data[indextr].foliosLibres}}
            </vs-td>
            <vs-td :data="data[indextr].foliosRechazados">
              {{data[indextr].foliosRechazados}}
            </vs-td>
            <vs-td :data="data[indextr].foliosAnulados">
              {{data[indextr].foliosAnulados}}
            </vs-td>
            <vs-td :data="data[indextr].foliosPorDia">
              {{data[indextr].foliosPorDia}}
            </vs-td>
            <vs-td :data="data[indextr].diasDisponibles">
              {{data[indextr].diasDisponibles}}
            </vs-td>
          </vs-tr>
        </template>

      </vs-table>

    </vx-card>

    <modal-cargar :editar="editar" @cerrarModalCargarCAF="cerrarModal"></modal-cargar>

  </div>

</template>

<script>
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";
import TiposDteMixin from "@/febos/chile/dte/mixins/TiposDteMixin";
import modalCargar from "@/febos/global/empresas/componentes/gestCAFs/modalCargar";


export default {
  name: "gestCAFs",
  components: {
    modalCargar
  },
  mixins: [
    TiposDteMixin
  ],
  data() {
    return {
      cafs: [],
      editar: false,
    }
  },
  computed: {
    stored: {
      get() {
        return JSON.parse(
          localStorage.getItem(
            `${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`
          )
        );
      }
    }
  },
  mounted() {
    this.cargarCafs();
  },
  methods: {
    cargarCafs()  {
      this.cafs = [];
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" });
      clienteFebosAPI.get("/empresas/" + this.stored.Empresas.empresa.iut + "/caf").then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.cafs = response.data.cafs;
        } else {
          this.$vs.notify({
            color: "danger", title: "CAFs", text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId, fixed: true
          });
        }
      }).catch((error) => {
        console.error(error);
        this.$vs.loading.close();
        this.$vs.notify({
          color: "danger", title: "CAFs", text: "No fue posible conectarse con Narvi", fixed: true
        });
      })

    },
    agregarCAF()  {
      this.editar = true;
    },
    cerrarModal() {
      this.editar = false;
    }
  }


}
</script>

<style lang="css">

table {
  border-spacing: 0;
  width: 100%;
  border-collapse: unset !important;
}

th.selector > div > span.checkbox_x.vs-checkbox {
  border: 2px solid #ffffff !important;
}

tr th {
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  font-size: 100%;
  background-color: rgba(var(--vs-primary), 1);
  color: white;
}

th, td {
  padding: 0.5em 1em;
  border-top: 1px solid rgba(var(--vs-primary), 1);;
}

tr:last-child td {
  border-bottom: 1px solid rgba(var(--vs-primary), 1);;
}

th:first-child, td:first-child {
  border-left: 1px solid rgba(var(--vs-primary), 1);;
}

th:last-child, td:last-child {
  border-right: 1px solid rgba(var(--vs-primary), 1);
}

thead tr:first-child th:first-child {
  border-radius: 0.6em 0 0 0;
}

thead tr:first-child th:last-child {
  border-radius: 0 0.6em 0 0;
}

tbody tr:last-child td:first-child {
  border-radius: 0 0 0 0.6em;
}

tbody tr:last-child td:last-child {
  border-radius: 0 0 0.6em 0;
}

.fila:hover {
  background-color: #efefef;
}
</style>
