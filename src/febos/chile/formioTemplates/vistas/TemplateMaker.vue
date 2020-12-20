<template>
  <vs-row>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
      <vs-input class="input-width" label="Nombre" placeholder="Nombre" v-model="template.name"/>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
      <vs-input class="input-width" label="Tipo" placeholder="Tipo" v-model="template.type"/>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
      <vs-input
        class="input-width"
        label="Descripción"
        placeholder="Descripción"
        v-model="template.description"
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
          :form="myForm"
          v-bind:options="{
             noDefaultSubmitButton: true
          }"
          v-on:change="(schema) => changeBuilder(schema)"
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
      textValidation: '',
      myForm: {
        display: 'form'
      },
      template: {
        name: '',
        type: '',
        description: ''
      }
    };
  },
  watch: {},
  computed: {
    ...mapGetters('Usuario', [
      'usuarioActual'
    ]),
    ...mapGetters('Empresas', [
      'empresa'
    ])
  },
  methods: {
    ...mapActions('Templates', [
      'saveTemplateFormio'
    ]),
    changeBuilder(schema) {
      this.myForm.components = schema;
    },
    validateTemplate(template) {
      const json = template.extra.jsonPlantilla || '';
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
        grupoId: 'ed.personalizados.plantillas',
        deshabilitado: 0,
        extra: {
          adjuntos: [],
          usuarioCreadorNombre: this.usuarioActual.nombre,
          fechaCreacion: Vue.moment().format('YYYY-MM-DD'),
          jsonPlantilla: JSON.stringify(this.myForm),
          schema: this.myForm,
          descripcion: this.template.description
        }
      };
      if (!this.validateTemplate(templateRequest)) {
        return;
      }

      templateRequest.extra = JSON.stringify(templateRequest.extra);

      console.log('template request', templateRequest);
      this.saveTemplateFormio(templateRequest);
    }
  },
  mounted() {
    this.validation = false;
    console.log('AACA', this);
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
