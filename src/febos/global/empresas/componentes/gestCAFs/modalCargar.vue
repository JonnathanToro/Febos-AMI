<template>

  <vs-modal size="s" ref="modalEdicion" title="Usuario" @close="cerrarModal">
    <div class="vx-row" v-if="show">

      <div class="vx-col w-full">
        <div class="dropbox">
          <!--<input type="file" :name="fileCAF"
                 @change="filesChange($event.target.name, $event.target.files)"
                 accept="text/xml" class="input-file">-->
          <input type="file" :name="fileCAF"
                 @change="caf_onChange"
                 accept="text/xml" class="input-file">
          <p v-if="precarga">
            Arrastre su CAF hasta aquí
          </p>
        </div>

      </div>
    </div>
    <div class="vx-row" v-if="show">
      <div class="vx-col md:w-1/2 mt-3">
        <vs-input
          label="Folio inicial"
          maxlength="10"
          v-model="caf.inicial"
          name="inicial"
          class="w-full"
          type="number"
        />
      </div>
      <div class="vx-col md:w-1/2 mt-3">
        <vs-input
          label="Folio final"
          maxlength="10"
          v-model="caf.final"
          name="final"
          class="w-full"
          type="number"
        />
      </div>
    </div>
    <div class="vs-row mt-5" v-if="show" style="text-align: right">
      <vs-button color="primary" type="filled" @click="enviarCAF" :disabled="disabledCargar">Cargar</vs-button>
    </div>
  </vs-modal>


</template>

<script>
import VsModal from "vs-modal";
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";

export default {
  name: "modalCargar",
  props: ["editar"],
  components: {
    VsModal
  },
  data()  {
    return {
      url_base: "/empresas/{rut}/caf",
      show: false,
      fileCAF: "caf",
      precarga: true,
      caf: {
        selectedFile: null,
        dataCaf: null,
        inicial: null,
        final: null
      },
      sending: false

    }
  },
  computed: {
    disabledCargar: {
      get() {
        if (this.caf.selectedFile == null || !this.caf.inicial == null || !this.caf.final == null)  return true;
        if (this.caf.inicial == "" || this.caf.final == "") return true;
      }
    },
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
  watch:  {
    editar: function(val) {
      this.show = false;
      if (val) {
        this.show = true;
        this.$refs["modalEdicion"].open();
      } else {
        this.$refs["modalEdicion"].close();
      }
    },
  },
  methods: {
    cerrarModal() {
      this.show = false;
      this.$emit("cerrarModalCargarCAF", false);
    },

    procesarCAF(event)  {
      this.caf.dataCaf = btoa(event.currentTarget.result);
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" });
      clienteFebosAPI.put("/empresas/" + this.stored.Empresas.empresa.iut + "/caf?folioInicio=" + this.caf.inicial + "&folioFin=" + this.caf.final + "&tipoCAF=1",
                        { dataCaf: this.caf.dataCaf }).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10)  {
          this.$vs.notify({
            color: 'success', title: 'CAF', text: 'Documentos cargados'
          });
          this.cerrarModal();
        } else {
          this.$vs.notify({
            color: "danger",
            title: "Usuario",
            text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId,
            fixed: true
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    enviarCAF()  {
      console.log(this.caf.selectedFile);
      const reader = new FileReader();
      reader.onload = e => this.procesarCAF(e);
      reader.readAsText(this.caf.selectedFile);
    },
    caf_onChange(event) {
      this.caf.selectedFile = event.target.files[0];
    },
  }
}


</script>

<style lang="scss">
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: #eeeeee;
  color: dimgray;
  padding: 10px 10px;
  min-height: 50px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 50px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #dfdfdf; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 30px 0;
}

</style>
