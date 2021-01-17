<template>
  <form>
    <div class="row mb-3">
      <div class="col-12">
        <h4>Origen / Datos Remitente</h4>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Tipo Institución"
          name="codigo_tipo_institucion"
        >

        </vs-select>
      </div>
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Institución"
          name="descripcion_tipo_institucion"
        >

        </vs-select>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Nombre Persona"
          name="nombre_persona"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Cargo Persona"
          name="nombre_cargo_persona"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-divider />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <h4>Destinatario</h4>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Destinos"
          name="codigo_tipo_destino"
        >

        </vs-select>
      </div>
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Lista de Destino"
          name="descripcion_tipo_destino"
        >

        </vs-select>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Lista de Instituciones DocDigital"
          name="descripcion_tipo_doc_digital_destino"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Correo Electrónico Persona Destinatario"
          name="correo_persona_destinatario"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 d-flex align-items-end justify-content-end">
        <vs-button color="primary" icon="add">
          Agregar Destinatario
        </vs-button>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-table
          multiple
          v-model="subjectsSelected"
          no-data-text="No tienes destinatarios"
          :data="subjects"
        >
          <template slot="thead">
            <vs-th>Destino</vs-th>
            <vs-th>Lista Destino</vs-th>
            <vs-th>Institución</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td :data="data[indextr].destino">
                {{data[indextr].codigo_tipo_destino}}
              </vs-td>
              <vs-td :data="data[indextr].lista_destino">
                {{data[indextr].descripcion_tipo_destino}}
              </vs-td>
              <vs-td :data="data[indextr].institucion">
                {{data[indextr].descripcion_tipo_doc_digital_destino}}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-divider />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <h4>Con copia a</h4>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Distribución"
          name="codigo_tipo_distribucion"
        >

        </vs-select>
      </div>
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Lista de Distribución"
          name="descripcion_tipo_distribucion"
        >

        </vs-select>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Lista de Instituciones DocDigital"
          name="descripcion_tipo_doc_digital_distribucion"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Correo Electrónico Persona Destinatario"
          name="correo_persona_distribucion"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 d-flex align-items-end justify-content-end">
        <vs-button color="primary" icon="add">
          Agregar copia a
        </vs-button>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-table
          multiple
          v-model="subjectsSelected"
          no-data-text="No tienes distribuciones con copia"
          :data="subjects"
        >
          <template slot="thead">
            <vs-th>Distribución</vs-th>
            <vs-th>Lista Distribución</vs-th>
            <vs-th>Institución</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td :data="data[indextr].destino">
                {{data[indextr].codigo_tipo_distribucion}}
              </vs-td>
              <vs-td :data="data[indextr].lista_destino">
                {{data[indextr].descripcion_tipo_distribucion}}
              </vs-td>
              <vs-td :data="data[indextr].institucion">
                {{data[indextr].descripcion_tipo_doc_digital_distribucion}}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-divider />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <vs-select
          class="w-100"
          autocomplete
          label="Acomapá Físico"
          name="con_fisico"
        >

        </vs-select>
      </div>
      <div class="col-md-6">
        <vs-input
          class="w-100"
          label="Detalle"
          name="texto_detalle"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <vs-textarea
          label="Observacion (5000 caracteres)"
          name="texto_observacion"
          width="100%"
          height="100px"
        />
      </div>
    </div>
  </form>
</template>

<script>

export default {
  data() {
    return {
      subjects: [],
      subjectsSelected: []
    };
  },
  methods: {
    isValid() {
      return true;
    }
  }
};

</script>
