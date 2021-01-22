<template>
  <form data-vv-scope="step-2">
    <div class="row mb-3">
      <div class="col-12">
        <h4>Origen / Datos Remitente</h4>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <list-institution-types
          class="w-100"
          autocomplete
          label="Tipo Institución"
          name="tipoInstitucion"
          v-model="step.tipoInstitucion"
          :danger="errors.has('step-2.tipoInstitucion')"
          :danger-text="errors.first('step-2.tipoInstitucion')"
          v-validate="'required'"
        />
      </div>
      <div class="col-md-6">
        <list-institutions
          class="w-100"
          autocomplete
          label="Institución"
          name="institucion"
          v-model="step.institucion"
          :parent-value="step.tipoInstitucion"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Nombre Persona"
          name="nombrePersona"
          v-model="step.nombrePersona"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Cargo Persona"
          name="cargoPersona"
          v-model="step.cargoPersona"
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
        <list-subject-types
          class="w-100"
          autocomplete
          label="Destinos"
          name="tipoDestino"
          v-model="step.tipoDestino"
          v-validate="'required'"
          :danger="errors.has('step-2.tipoDestino')"
          :danger-text="errors.first('step-2.tipoDestino')"
        />
      </div>
      <div class="col-md-6">
        <list-subjects
          v-if="!isInput.includes(step.tipoDestino)"
          class="w-100"
          autocomplete
          label="Lista de Destino"
          name="listaDestino"
          v-model="step.listaDestino"
          :parent-value="step.tipoDestino"
        />
        <vs-input
          v-if="isInput.includes(step.tipoDestino)"
          class="w-100"
          label="Ingrese un rut"
          name="rutDestino"
          v-model="step.rutDestino"
        />
      </div>
    </div>
    <div class="row mb-3" v-if="step.tipoDestino === 'docDigital'">
      <div class="col-12">
        <list-institutions-doc-digital
          class="w-100"
          autocomplete
          label="Lista de Instituciones DocDigital"
          name="listaDestinoDocDigital"
          v-model="step.listaDestinoDocDigital"
          :parent-value="step.listaDestino"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Correo Electrónico Persona Destinatario"
          name="correoDestinatario"
          v-model="step.correoDestinatario"
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
                {{data[indextr].tipoDestino}}
              </vs-td>
              <vs-td :data="data[indextr].lista_destino">
                {{data[indextr].listaDestino}}
              </vs-td>
              <vs-td :data="data[indextr].institucion">
                {{data[indextr].listaDestinoDocDigital}}
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
        <list-subject-types
          class="w-100"
          autocomplete
          label="Distribución"
          name="tipoDistribucion"
          v-model="step.tipoDistribucion"
          v-validate="'required'"
          :danger="errors.has('step-2.tipoDistribucion')"
          :danger-text="errors.first('step-2.tipoDistribucion')"
        />
      </div>
      <div class="col-md-6">
        <list-subjects
          v-if="!isInput.includes(step.tipoDistribucion)"
          class="w-100"
          autocomplete
          label="Lista de Distribución"
          name="listaDistribucion"
          v-model="step.listaDistribucion"
          :parent-value="step.tipoDistribucion"
        />
        <vs-input
          v-if="isInput.includes(step.tipoDistribucion)"
          class="w-100"
          label="Ingrese un rut"
          name="rutDestino"
          v-model="step.rutDestino"
        />
      </div>
    </div>
    <div class="row mb-3" v-if="step.tipoDistribucion === 'docDigital'">
      <div class="col-12">
        <list-institutions-doc-digital
          class="w-100"
          autocomplete
          label="Lista de Instituciones DocDigital"
          name="listaDistribucionDocDigital"
          v-model="step.listaDistribucionDocDigital"
          :parent-value="step.listaDistribucion"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <vs-input
          class="w-100"
          label="Correo Electrónico Persona Destinatario"
          name="correoDistribucion"
          v-model="step.correoDistribucion"
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
                {{data[indextr].tipoDistribucion}}
              </vs-td>
              <vs-td :data="data[indextr].lista_destino">
                {{data[indextr].listaDistribucion}}
              </vs-td>
              <vs-td :data="data[indextr].institucion">
                {{data[indextr].listaDistribucionDocDigital}}
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
          label="Acompaña Físico"
          name="esFisico"
          v-model="step.esFisico"
        >
          <vs-select-item
            value="no"
            text="No"
          />
          <vs-select-item
            value="si"
            text="Si"
          />
        </vs-select>
      </div>
      <div class="col-md-6">
        <vs-input
          class="w-100"
          label="Detalle"
          name="detalleDocumento"
          v-model="step.detalleDocumento"
          v-validate="{ required: this.step.esFisico === 'si' }"
          :danger="errors.has('step-2.detalleDocumento')"
          :danger-text="errors.first('step-2.detalleDocumento')"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <vs-textarea
          label="Observacion (5000 caracteres)"
          name="observacion"
          v-model="step.observacion"
          width="100%"
          height="100px"
        />
      </div>
    </div>
  </form>
</template>

<script>

import WizardStep from '@/febos/chile/dnt/mixins/WizardStep';
import ListInstitutions from '@/febos/chile/lists/components/ListInstitutions';
import ListInstitutionTypes from '@/febos/chile/lists/components/ListInstitutionTypes';
import ListSubjects from '@/febos/chile/lists/components/ListSubjects';
import ListInstitutionsDocDigital from '@/febos/chile/lists/components/ListInstitutionsDocDigital';
import ListSubjectTypes from '@/febos/chile/lists/components/ListSubjectTypes';

export default {
  mixins: [WizardStep],
  components: {
    ListInstitutionTypes,
    ListInstitutions,
    ListSubjects,
    ListSubjectTypes,
    ListInstitutionsDocDigital
  },
  data() {
    return {
      isInput: ['personas', 'empresas'],
      subjects: [],
      subjectsSelected: [],
      step: {
        tipoInstitucion: '',
        institucion: '',
        nombrePersona: '',
        cargoPersona: '',
        tipoDestino: '',
        listaDestino: '',
        listaDestinoDocDigital: '',
        correoDestinatario: '',
        tipoDistribucion: '',
        listaDistribucion: '',
        listaDistribucionDocDigital: '',
        correoDistribucion: '',
        esFisico: 'no',
        detalleDocumento: '',
        observacion: ''
      }
    };
  },
  methods: {
    async isValid() {
      try {
        await this.validateForm('step-2');
        // TODO: send to store.
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};

</script>
