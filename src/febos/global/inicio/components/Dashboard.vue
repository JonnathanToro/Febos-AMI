<template>
  <vx-card title="Documentos" class="ml-2 mt-5">
    <div class="container">
      <div class="centrador">
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{globalIndicators.finalizados}} Finalizados
          </div>
          <vs-icon icon="folder_open" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{globalIndicators.pendientes}} Pendientes
          </div>
          <vs-icon icon="folder_open" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{globalIndicators.enCopia}} en copia
          </div>
          <vs-icon icon="folder_open" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{globalIndicators.anulado}} anulados
          </div>
          <vs-icon icon="folder_open" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
      </div>
    </div>
  </vx-card>
</template>
<script>

export default {
  mixins: [],
  props: {
    globalIndicators: {
      type: Object,
      required: false
    },
    personalIndicators: {
      type: Object,
      required: false
    },
  },
  computed: {},
  methods: {},
  created() {}
};

</script>
<style lang="css" scoped>
.modulo {
  width: 165px;
  height: 130px;
  border: 1px solid #ccc;
  display: inline-block;
  vertical-align: bottom;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #ccc;
  color: white;
  font-size: 90%;
  background-color: rgb(var(--vs-primary));

}

.modulo:hover {
  box-shadow: 3px 3px 10px #aaa;
  cursor: pointer;
  text-shadow: 3px 3px 10px #fff;
}

.container {
  text-align: center;
}

.centrador {
  margin: auto;
}

.nombre-modulo {
  font-weight: bold;
}

.modulo-deshabilitado {
  background-color: #ccc !important;
}

.modulo-deshabilitado:hover {
  background-color: #ccc !important;
  box-shadow: 3px 3px 10px #ccc;
  cursor: default;
  text-shadow: none !important;
}

.modulo-actual {
  position: relative;
  right: -20px;
  bottom: -5px;
}
</style>
