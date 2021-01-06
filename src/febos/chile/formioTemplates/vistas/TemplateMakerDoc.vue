<template>
  <vs-row>
    <vs-col>
      <h4>Configurador de plantillas para formularios de Documentos</h4>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
      <vs-input
        class="input-width"
        label="Nombre"
        placeholder="Nombre"
        :value="template.name"
        @input="changeTemplateProperty('name', $event)"
      />
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
      <vs-input
        class="input-width"
        label="Tipo"
        placeholder="Tipo"
        :value="template.type"
        @input="changeTemplateProperty('type', $event)"
      />
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
      <vs-input
        class="input-width"
        label="Descripción"
        placeholder="Descripción"
        :value="template.description"
        @input="changeTemplateProperty('description', $event)"
      />
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="3">
      <vs-button
        color="success"
        type="border"
        icon="save"
        v-on:click="saveTemplate()"
      >
        Guardar
      </vs-button>
    </vs-col>
    <vs-col>
      <div id="formio" ref="formio" class="m-top-20">
        <FormBuilder
          :form="schema"
          v-bind:options="{
             noDefaultSubmitButton: true
          }"
          v-on:change="(schema) => changeSchema(schema)"
        >
        </FormBuilder>
      </div>
    </vs-col>
    <vs-popup title="Oops! Por favor verifica la información" :active.sync="validation">
      <vs-list>
        <vs-list-item
          v-for="(text, index) in textValidation" :key="index"
          icon="warning"
          :title="text"
        >
        </vs-list-item>
      </vs-list>
    </vs-popup>
  </vs-row>
</template>
<script>

import { FormBuilder } from 'vue-formio';
import Vue from 'vue';
import { uuid } from 'vue-uuid';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { FormBuilder },
  data() {
    return {
      validation: false,
      textValidation: ''
    };
  },
  watch: {},
  computed: {
    ...mapGetters('Usuario', [
      'usuarioActual'
    ]),
    ...mapGetters('Templates', [
      'template',
      'schema',
      'schemaChanges'
    ]),
    ...mapGetters('Empresas', [
      'empresa'
    ])
  },
  methods: {
    ...mapActions('Templates', [
      'changeTemplate',
      'changeSchema',
      'clearTemplate',
      'saveTemplateFormio',
      'getTemplateById'
    ]),
    changeTemplateProperty(key, value) {
      this.changeTemplate({
        ...this.template,
        [key]: value
      });
    },
    validateTemplate(template) {
      const json = JSON.stringify(template.extra.schema);
      const validations = [];

      if (!template.valor) {
        validations.push('Debes agregar un tipo para la plantilla.');
      }
      if (!template.descripcion) {
        validations.push('Debes agregar un nombre para la plantilla.');
      }

      const opcionesRutEmisor = ['iut_emisor'];
      const opcionesRutReceptor = ['iut_receptor'];
      const opcionesRazonEmisor = ['razon_social_emisor'];
      const opcionesRazonReceptor = ['razon_social_receptor'];

      if (!opcionesRutEmisor.some((el) => json.includes(el))) {
        validations.push(
          `Debes agregar un campo para el rut del emisor,
          te recomendamos que sea "Emisor Rut".`
        );
      }

      if (!opcionesRazonEmisor.some((el) => json.includes(el))) {
        validations.push(
          `Debes agregar un campo para la razón social del emisor,
          te recomendamos que sea "Emisor razón social".`
        );
      }

      if (!opcionesRutReceptor.some((el) => json.includes(el))) {
        validations.push(`
          Debes agregar un campo para el rut del receptor,
          te recomendamos que sea "Receptor Rut".`);
      }

      if (!opcionesRazonReceptor.some((el) => json.includes(el))) {
        validations.push(
          `Debes agregar un campo para la razón social del receptor,
          te recomendamos que sea "Receptor razón social".`
        );
      }

      if (validations.length) {
        this.textValidation = validations;
        this.validation = true;
        return false;
      }
      return true;
    },
    saveTemplate() {
      const templateRequest = {
        configuradoPor: this.usuarioActual.id,
        descripcion: this.template.name,
        valor: this.template.type,
        referenciaId: this.empresa.id,
        parametroId: uuid.v1(),
        orden: '',
        nivel: 0,
        grupoId: 'ed.personalizados.plantillas.doc',
        deshabilitado: 0,
        extra: {
          adjuntos: [],
          usuarioCreadorNombre: this.usuarioActual.nombre,
          fechaCreacion: Vue.moment().format('YYYY-MM-DD'),
          schema: this.schemaChanges,
          descripcion: this.template.description
        }
      };

      if (!this.validateTemplate(templateRequest)) {
        return;
      }

      if (this.$route.params.opcionId) {
        templateRequest.opcionId = this.$route.params.opcionId;
        templateRequest.parametroId = this.template.parametroId;
      }

      console.log('TEMPLATE REQUEST', templateRequest);
      templateRequest.extra = JSON.stringify(templateRequest.extra);

      this.saveTemplateFormio(templateRequest);
    }
  },
  mounted() {
    this.validation = false;
    if (this.$route.params.opcionId) {
      console.log('estoy aca');
      this.getTemplateById(this.$route.params.opcionId);
    } else {
      console.log('CLEAR');
      this.clearTemplate();
    }
    console.log('aca', this);
  }
};
</script>
<style>
.m-top-20 {
  margin-top: 20px;
}
.input-width {
  width: 100%;
  margin-right: 10px;
}
</style>
