<template>
  <vx-card title="Documentos" class="ml-2 mt-5">
    <div class="container">
      <div class="centrador">
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{globalIndicators.finalizados}} Finalizados
          </div>
          <vs-icon icon="mark_as_unread" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{globalIndicators.pendientes}} Pendientes
          </div>
          <vs-icon icon="archive" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{globalIndicators.anulado}} anulados
          </div>
          <vs-icon icon="close" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h4>Mis documentos</h4>
    </div>
    <div class="container">
      <div class="centrador">
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{personalIndicators.finalizados || 0}} Finalizados
          </div>
          <vs-icon icon="mark_as_unread" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{personalIndicators.pendientes || 0}} Pendientes
          </div>
          <vs-icon icon="archive" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{personalIndicators.borradores || 0}} Borradores
          </div>
          <vs-icon icon="save" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{personalIndicators.enCopia || 0}} en copia
          </div>
          <vs-icon icon="group" size="75px" color="#ffffff" class="mt-2"></vs-icon>
        </div>
        <div class="modulo mr-5 mt-5 pt-5">
          <div class="nombre-modulo">
            {{personalIndicators.anulado || 0}} anulados
          </div>
          <vs-icon icon="close" size="75px" color="#ffffff" class="mt-2"></vs-icon>
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
</style>
