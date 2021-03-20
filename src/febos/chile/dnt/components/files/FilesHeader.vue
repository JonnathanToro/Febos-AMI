<template>
  <vs-row class="bg-white shadow py-5 px-3 mb-4">
    <vs-col vs-lg="11">
      <vs-row>
        <vs-col vs-lg="1" class="text-center">
          <b>#</b>
        </vs-col>
        <vs-col vs-lg="2">
          <b>Estado</b>
        </vs-col>
        <vs-col vs-lg="9">
          <vs-row>
            <vs-col vs-lg="3">
              <b>Enviado por</b>
            </vs-col>
            <vs-col vs-lg="3">
              <b>Remitente</b>
            </vs-col>
            <vs-col vs-lg="3">
              <b>Creado por</b>
            </vs-col>
            <vs-col vs-lg="3" v-if="onPendingFiles">
              <b>Derivado por</b>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-col vs-lg="1" vs-sm="4" vs-xs="12" class="text-center">
      <b>...</b>
    </vs-col>
  </vs-row>
</template>

<script>

export default {
  props: [
    'onPendingFiles'
  ]

};

</script>
