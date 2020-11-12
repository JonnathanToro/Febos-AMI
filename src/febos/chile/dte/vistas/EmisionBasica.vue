<template>
  <form-wizard
    color="rgba(var(--vs-primary), 1)"
    errorColor="rgba(var(--vs-danger), 1)"
    :title="null"
    :subtitle="null"
    nextButtonText="Siguiente"
    backButtonText="Anterior"
    finishButtonText="Emitir"
    @on-complete="enviarDocumento"
  >
    <tab-content
      title="Receptor"
      class="mb-5"
      icon="feather icon-user"
      :before-change="validarEncabezado"
    >
      <form data-vv-scope="formularioEncabezado">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full">
            <vs-select
              v-model="encabezado.tipoDocumento"
              name="tipoDocumento"
              class="w-full select-large"
              label="Tipo Documento"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in tiposDocumento"
                class="w-full"
              />
            </vs-select>
          </div>
          <div class="vx-col md:w-1/2 w-full pt-4">
            <vs-switch color="success" v-model="encabezado.nominativa" style="width: 100px;"
                       v-if="encabezado.tipoDocumento == 39 || encabezado.tipoDocumento == 41">
              <span slot="on">Nominativa</span>
              <span slot="off">Portador</span>
            </vs-switch>
            <vs-switch color="primary" v-model="encabezado.detalle" style="margin-top: 2px; width: 100px;"
                       v-if="encabezado.tipoDocumento == 39 || encabezado.tipoDocumento == 41">
              <span slot="on">Detalle</span>
              <span slot="off">Sin detalle</span>
            </vs-switch>
          </div>
        </div>
        <div class="vx-row" v-if="esNominativo">
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="RUT Receptor (sin puntos, con guión)"
              maxlength="10"
              v-model="encabezado.rutReceptor"
              class="w-full"
              name="rutReceptor"
              v-validate="'required|validaRut'"
            />
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('rutReceptor') == 'required'"
            >RUT es obligatorio</span
            >
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('rutReceptor') == 'rut'"
            >Formato de RUT incorrecto</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="Razón Social"
              maxlength="100"
              v-model="encabezado.razonSocial"
              class="w-full"
              name="razon_social"
              v-validate="'required|alpha_spaces'"
            />
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('razon_social')"
            >Razón Social es obligatoria</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="Giro"
              maxlength="50"
              v-model="encabezado.giro"
              class="w-full"
              name="giro"
              v-validate="'required|alpha_spaces'"
            />
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('giro')"
            >Giro es obligatorio</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="Dirección"
              maxlength="150"
              v-model="encabezado.direccion"
              class="w-full"
              name="direccion"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('direccion')"
            >Dirección es obligatoria</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="Comuna"
              maxlength="40"
              v-model="encabezado.comuna"
              class="w-full"
              name="comuna"
              v-validate="'required|alpha_spaces'"
            />
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('comuna')"
            >Comuna es obligatoria</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="Ciudad"
              maxlength="40"
              v-model="encabezado.ciudad"
              class="w-full"
              name="ciudad"
              v-validate="'required|alpha_spaces'"
            />
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('ciudad')"
            >Ciudad es obligatoria</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              type="email"
              label="Email"
              maxlength="90"
              v-model="encabezado.email"
              class="w-full"
              name="email"
              v-validate="'required|email'"
            />
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('email') == 'required'">Correo electrónico es obligatorio</span>
            <span
              class="text-danger text-sm form-error-message"
              v-if="getError('email') == 'email'">Correo electrónico es incorrecto</span>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              type="number"
              label="Valor bruto"
              v-model="total"
              class="w-full"
              name="valor"
              maxlength="10"
              v-validate="'required|min:0'"
              v-if="!tieneDetalle"
              :min="0"
            />
          </div>
        </div>
      </form>
    </tab-content>

    <tab-content
      v-if="encabezado.detalle"
      title="Detalle"
      class="mb-5"
      icon="feather icon-list"
      :before-change="validarDetalle"
    >
      <vs-button
        size="small"
        color="primary"
        type="filled"
        v-on:click="agregarArticulo()"
      >Agregar artículos</vs-button
      >
      <div class="prueba">
        <vs-table stripe pagination :max-items="5" :data="detalle">
          <template slot="thead">
            <vs-th>Descripción</vs-th>
            <vs-th>UM</vs-th>
            <vs-th style="text-align: center">Cantidad</vs-th>
            <vs-th style="text-align: right">Unitario</vs-th>
            <vs-th style="text-align: right">Total</vs-th>
            <vs-th>Acción</vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].descripcion">
                <span v-if="edicionDetalle != indextr">{{
                    data[indextr].descripcion
                  }}</span>
                <vs-input
                  v-model="data[indextr].descripcion"
                  class="w-full"
                  name="descripcion"
                  maxlength="100"
                  required
                  v-validate="'required|alpha'"
                  v-if="edicionDetalle == indextr"
                />
              </vs-td>
              <vs-td :data="data[indextr].unidadMedida">
                <span v-if="edicionDetalle != indextr">{{
                    data[indextr].unidadMedida
                  }}</span>
                <vs-input
                  v-model="data[indextr].unidadMedida"
                  class="w-full"
                  name="unidadMedida"
                  maxlength="20"
                  required
                  v-validate="'required|alpha'"
                  v-if="edicionDetalle == indextr"
                />
                <span class="text-danger"></span>
              </vs-td>
              <vs-td :data="data[indextr].cantidad" style="text-align: center">
                <span v-if="edicionDetalle != indextr">{{
                    data[indextr].cantidad
                  }}</span>
                <vs-input
                  type="number"
                  v-model="data[indextr].cantidad"
                  class="w-full"
                  name="cantidad"
                  maxlength="5"
                  required
                  v-validate="'required|min:1'"
                  v-if="edicionDetalle == indextr"
                  :min="1"
                />
              </vs-td>
              <vs-td :data="data[indextr].precio" style="text-align: right">
                <span v-if="edicionDetalle != indextr"
                >${{
                    new Intl.NumberFormat()
                      .format(data[indextr].precio)
                      .replace(/,/g, ".")
                  }}</span
                >
                <vs-input
                  type="number"
                  v-model="data[indextr].precio"
                  class="w-full"
                  name="precio"
                  maxlength="10"
                  required
                  v-validate="'required|min:0'"
                  v-if="edicionDetalle == indextr"
                  :min="0"
                />
              </vs-td>
              <vs-td :data="data[indextr].precio" style="text-align: right">
                ${{
                  new Intl.NumberFormat()
                    .format(data[indextr].cantidad * data[indextr].precio)
                    .replace(/,/g, ".")
                }}
              </vs-td>
              <vs-td :data="data[indextr].descripcion">
                <div
                  class="btn-group"
                  role="group"
                  v-if="edicionDetalle != indextr"
                >
                  <vs-button
                    size="small"
                    color="success"
                    @click="editarDetalle(indextr)"
                  >
                    <vs-icon icon="edit"></vs-icon>
                  </vs-button>
                  <vs-button
                    size="small"
                    color="danger"
                    @click="eliminarDetalle(tr, indextr)"
                  >
                    <vs-icon icon="delete"></vs-icon>
                  </vs-button>
                </div>
                <div
                  class="btn-group"
                  role="group"
                  v-if="edicionDetalle == indextr"
                >
                  <vs-button
                    size="small"
                    color="primary"
                    @click="detalleAceptar(tr, indextr)"
                  >
                    Guardar
                  </vs-button>
                  <vs-button
                    size="small"
                    color="dark"
                    @click="detalleCencelar(indextr)"
                    v-if="esNuevo"
                  >
                    Cancelar
                  </vs-button>
                </div>
                <!--<vs-icon icon="delete" v-on:click="borrarArticulo(indextr)"></vs-icon>
                <vs-icon icon="edit" v-on:click="borrarArticulo(indextr)"></vs-icon>-->
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <br />
      <h4 align="right">
        Total: $ {{ new Intl.NumberFormat().format(total).replace(/,/g, ".") }}
      </h4>
    </tab-content>

    <tab-content
      title="Confirmación"
      class="mb-5"
      icon="feather icon-download"
      :before-change="validarEmision"
    >
      <vs-row vs-justify="center">
        <vs-col type="flex" vs-justify="center" vs-w="4" class="p-1">
          <vx-card title="Datos Receptor" title-color="primary">
            <vs-row v-if="encabezado.nominativa">
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder"
              >RUT</vs-col
              >
              <vs-col vs-w="9" class="p-1">{{ encabezado.rutReceptor }}</vs-col>
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder"
              >Razón Social</vs-col
              >
              <vs-col vs-w="9" class="p-1">{{ encabezado.razonSocial }}</vs-col>
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder"
              >Giro</vs-col
              >
              <vs-col vs-w="9" class="p-1">{{ encabezado.giro }}</vs-col>
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder"
              >Dirección</vs-col
              >
              <vs-col vs-w="9" class="p-1">{{ encabezado.direccion }}</vs-col>
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder"
              >Comuna</vs-col
              >
              <vs-col vs-w="9" class="p-1">{{ encabezado.comuna }}</vs-col>
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder"
              >Ciudad</vs-col
              >
              <vs-col vs-w="9" class="p-1">{{ encabezado.ciudad }}</vs-col>
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder"
              >Email</vs-col
              >
              <vs-col vs-w="9" class="p-1">{{ encabezado.email }}</vs-col>
            </vs-row>
            <vs-row v-if="!encabezado.nominativa">
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder"
              >Email</vs-col
              >
              <vs-col vs-w="9" class="p-1">{{ encabezado.email }}</vs-col>
            </vs-row>
          </vx-card>
        </vs-col>

        <vs-col type="flex" vs-justify="center" vs-w="3" class="p-1">
          <vx-card :title="tipoDocumento" title-color="primary">
            <vs-row
              v-if="
                encabezado.tipoDocumento == 34 ||
                encabezado.tipoDocumento == 39 ||
                encabezado.tipoDocumento == 41
              ">
              <vs-col vs-w="3" class="p-1" style="font-weight: bolder">Total</vs-col>
              <vs-col vs-w="9" class="p-1" style="text-align: right">$
                {{
                  new Intl.NumberFormat().format(total).replace(/,/g, ".")
                }}</vs-col>
            </vs-row>
            <vs-row v-if="encabezado.tipoDocumento == 33">
              <vs-col vs-w="4" class="p-1" style="font-weight: bolder">Total Neto</vs-col>
              <vs-col vs-w="8" class="p-1" style="text-align: right">$
                {{
                  new Intl.NumberFormat().format(total).replace(/,/g, ".")
                }}</vs-col>
              <vs-col vs-w="4" class="p-1" style="font-weight: bolder">IVA</vs-col>
              <vs-col vs-w="8" class="p-1" style="text-align: right">$
                {{
                  new Intl.NumberFormat().format(iva).replace(/,/g, ".")
                }}</vs-col>
              <vs-col vs-w="4" class="p-1" style="font-weight: bolder">Total</vs-col>
              <vs-col vs-w="8" class="p-1" style="text-align: right">$
                {{
                  new Intl.NumberFormat().format(total + iva).replace(/,/g, ".")
                }}</vs-col>
            </vs-row>
          </vx-card>
        </vs-col>

        <vs-col type="flex" vs-justify="center" vs-w="5" class="p-1">
          <vx-card
            title="Referencias"
            title-color="primary"
            v-if="encabezado.tipoDocumento == 61"
          >
            <vs-row v-if="referencias.length == 0">
              <vs-col vs-w="8">Sin referencias</vs-col>
              <vs-col vs-w="4" style="text-align: right">
                <vs-button
                  size="small"
                  color="primary"
                  type="filled"
                  v-on:click="abrirReferencia()"
                >Agregar referencia</vs-button
                >
              </vs-col>
            </vs-row>
            <vs-row v-if="referencias.length > 0">
              <vs-col vs-w="8"></vs-col>
              <vs-col vs-w="4" style="text-align: right">
                <vs-button
                  size="small"
                  color="primary"
                  type="filled"
                  v-on:click="abrirReferencia()"
                >Agregar referencia</vs-button
                >
              </vs-col>
            </vs-row>

            <div style="margin-top: 10px; clear: both"></div>

            <div
              style="width: 100%"
              v-if="referencias.length > 0"
              v-for="(ref, ind) in referencias"
              :key="ind"
            >
              <vs-button
                color="danger"
                type="flat"
                @click="eliminarReferencia(ind)"
              >
                <vs-icon icon="delete" color="danger"></vs-icon>
              </vs-button>
              {{ getTipoDocumento(ref.tipoDocumento) }} Nª {{ ref.folio }} del
              {{ ref.formatFecha }}
            </div>
          </vx-card>
        </vs-col>
      </vs-row>

      <vs-modal ref="modalReferencias" title="Referenciar Documento">
        <vs-row>
          <vs-col vs-w="12">
            <datepicker
              placeholder="Fecha"
              required
              v-model="referencia.fecha"
            ></datepicker>
          </vs-col>
          <vs-col vs-w="12">
            <vs-select
              v-model="referencia.tipoDocumento"
              required
              class="w-full select-large mt-2"
              label="Tipo Documento"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in tiposDocumento"
              />
            </vs-select>
          </vs-col>
          <vs-col vs-w="12">
            <vs-input
              label="Motivo"
              maxlength="50"
              required
              class="w-full mt-2"
              v-model="referencia.motivo"
              v-validate="'required'"
            />
          </vs-col>
          <vs-col vs-w="12">
            <vs-input
              label="Folio"
              v-model="referencia.folio"
              maxlength="10"
              required
              class="w-full mt-2"
              v-validate="'required'"
            />
          </vs-col>
          <vs-col vs-w="12" style="text-align: right">
            <vs-button size="sm" @click="agregarReferencias()"
            >Agregar</vs-button
            >
          </vs-col>
        </vs-row>
      </vs-modal>
    </tab-content>
  </form-wizard>
</template>
<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import VsModal from "vs-modal";
import Datepicker from "vuejs-datepicker";
import { Validator } from "vee-validate";
import es from "vee-validate/dist/locale/es";
// import axios from 'axios';
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";

Validator.localize("es", es);
Validator.extend("validaRut", {
  getMessage: (field) => field + " incorrecto",
  validate: (value) => {
    var esCorrecto = validaRUT(value);
    return esCorrecto;
  },
});
export default {
  components: {
    FormWizard,
    TabContent,
    VsModal,
    Datepicker,
  },
  data() {
    return {
      encabezado: {
        rutReceptor: null, razonSocial: null, giro: null, direccion: null, comuna: null, ciudad: null, email: null, tipoDocumento: 33,
        nominativa: true, detalle: true, valor: null
      },
      okEncabezado: false,
      detalle: [],
      total: 0,
      edicionDetalle: null,
      esNuevo: false,
      articulo:   {
        descripcion: null, unidadMedida: null, precio: null, cantidad: null, total: null
      },
      referencia: { formatFecha: null, fecha: null, motivo: null, folio: null, tipoDocumento: null },
      referencias: [],
      tiposDocumento: [
        {value:'33',text:'Factura afecta'},
        {value:'34',text:'Factura exenta'},
        {value:'39',text:'Boleta afecta'},
        {value:'41',text:'Boleta exenta'},
        /*{value:'56',text:'Nota de Débito'},
        {value:'61',text:'Nota de Crédito'},*/
      ],
    }
  },
  computed: {
    tipoDocumento: {
      get()   { return this.tiposDocumento.find(element => element.value == this.encabezado.tipoDocumento ).text; }
    },
    iva:  {
      get()   { return Math.round(this.total * 0.19); }
    },
    esNominativo: {
      get()   {
        return (this.encabezado.tipoDocumento == 33 || this.encabezado.tipoDocumento == 34 ||
                (this.encabezado.nominativa && (this.encabezado.tipoDocumento == 39 || this.encabezado.tipoDocumento == 41)))
      }
    },
    tieneDetalle: {
      get() {
        console.log(this.encabezado);
        return (this.encabezado.tipoDocumento == 33 || this.encabezado.tipoDocumento == 34 ||
                (this.encabezado.detalle && (this.encabezado.tipoDocumento == 39 || this.encabezado.tipoDocumento==42)))
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
    },
    defaultEmpresa:  {
      get() {
        return JSON.parse(localStorage.getItem("defaultEmpresa"));
      }
    }
  },
  mounted() {
    this.cargarDefault();
  },
  methods: {
    cargarDefault() {
      const defaultEmision = JSON.parse(localStorage.getItem("emision"));
      if (defaultEmision) {
        this.encabezado.tipoDocumento = defaultEmision.tipoDocumento;
        this.encabezado.nominativa = defaultEmision.nominativa;
        this.encabezado.detalle = defaultEmision.detalle;
      }

      const defaultEmpresa = this.defaultEmpresa;
      if (defaultEmpresa) {
        if (defaultEmpresa.iut != this.stored.Empresas.empresa.iut) this.actualizarEmpresa();
      } else {
        this.actualizarEmpresa();
      }
    },
    actualizarEmpresa() {
      this.$vs.loading({ color: "#FF2961", text: "Actualizando configuración" });
      clienteFebosAPI.get("/empresas/" + this.stored.Empresas.empresa.iut).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10)  {
          localStorage.setItem("defaultEmpresa", JSON.stringify(response.data));
        }
      });
    },


    validarEncabezado() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("formularioEncabezado").then((result) => {
          if (result) {
            const emision = { tipoDocumento: this.encabezado.tipoDocumento, nominativa: this.encabezado.nominativa, detalle: this.encabezado.detalle };
            localStorage.setItem("emision", JSON.stringify(emision));
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    },

    validarDetalle()  {
      return new Promise((resolve, reject) => {
        console.log(this.detalle);
        console.log(this.detalle.length);
        if (this.detalle.length > 0) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    },
    validarEmision()  {
      return new Promise((resolve/*, reject*/) => {
        resolve(true);
      });
    },

    enviarDocumento() {
      this.$vs.loading({ color: "#FF2961", text: "Emitiendo documento" });
      /* GIORGIO */
      const defaultEmpresa = this.defaultEmpresa;
      const f2String = this._generarF2(defaultEmpresa);
      const bodyParams = {
        entrada: "F2",
        tipo: this.encabezado.tipoDocumento,
        foliar: "si",
        timbrar: "si",
        firmar: "si",
        enviar: "si",
        payload: btoa(f2String),
      };

      clienteFebosAPI.post("/documentos", bodyParams).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Emisión DTE', text: 'Documento emitido'
          });
        } else {
          this.$vs.notify({
            color: "danger",
            title: "Emisión DTE",
            text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId,
            fixed: true
          });
        }

      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.$vs.notify({
          color: "danger", title: "Emisión DTE", text: "No fue posible procesar la emisión del documento", time: 10000
        });

      });

/*
      var rutEmpresa = storage.Empresas.empresa.iut;
      var token = storage.Usuario.token;
      var url = "https://api.febos.cl/" + process.env.VUE_APP_AMBIENTE + "/empresas/" + rutEmpresa;
      var headersEmpresa = {
        token: token
      };

      //OBTENIENDO DATOS EMPRESA DESDE API (IDEAL LOCAL)
      axios.get(url, {headers:headersEmpresa}).then((response) => {
        var f2String = this._generarF2(response.data);
        let headersEmitir = {
          token: token,
          empresa: rutEmpresa
        };
        let bodyParams = {
          entrada: "F2",
          tipo: this.encabezado.tipoDocumento,
          foliar: "si",
          timbrar: "si",
          firmar: "si",
          enviar: "si",
          payload: btoa(f2String),
        };
        var url = "https://api.febos.cl/" + process.env.VUE_APP_AMBIENTE + "/documentos";
        axios
          .post(url, bodyParams, {
            headers: headersEmitir,
          })
          .then(() => {
            alert('Documento emitido!');
          });
      });

      */
    },
    _generarF2(data) {
      //DATOS EMISOR (FALTAN DATOS DE OBTENER SUCURSAL)
      var rutEmpresa = data.iut;
      var razonSocialEmpresa = data.razonSocial;
      var giroEmpresa = data.giro;
      var sucursalMatriz = data.sucursales.filter(sucursal => sucursal.casaMatriz)[0];
      var telefonoEmpresa = sucursalMatriz.telefono;
      var correoEmpresa = sucursalMatriz.correoElectronico;
      var acteco = data.acteco
      var direccionEmpresa = sucursalMatriz.direccion;
      var comunaEmpresa = sucursalMatriz.comuna;
      var ciudadEmpresa = sucursalMatriz.ciudad;

      //DATOS RECEPTOR
      var rutReceptor = "66666666-6";
      var razonSocialReceptor = "Cliente Genérico";
      var giroReceptor = "default";
      var direccionReceptor = "default";
      var comunaReceptor = sucursalMatriz.comuna;
      var ciudadReceptor = sucursalMatriz.ciudad;
      var emailReceptor = this.encabezado.email;
      if (this.encabezado.nominativa) {
        rutReceptor = this.encabezado.rutReceptor;
        razonSocialReceptor = this.encabezado.razonSocial;
        giroReceptor = this.encabezado.giro;
        direccionReceptor = this.encabezado.direccion;
        comunaReceptor = this.encabezado.comuna;
        ciudadReceptor = this.encabezado.ciudad;
      }

      var documentoString = "";
      //identificacion del documento
      documentoString += "XXX INICIO DOCUMENTO\n";
      documentoString += "========== AREA IDENTIFICACION DEL DOCUMENTO\n";
      //VERIFICAR TIPO DOCUMENTO
      documentoString += "Tipo Documento Tributario Electronico             :" + this.encabezado.tipoDocumento +"\n";
      //VERIFICAR TIPO DE DOCUMENTO
      documentoString += "Folio Documento                                   :0" + "\n";
      documentoString += "Fecha de Emision                                  :" + new Date().toISOString().slice(0, 10) + "\n";
      documentoString += "Indicador de No Rebaja                            :\nTipo de Despacho                                  :\nIndicador de Traslado                             :\nTipo Impresion                                    :\nIndicador de Servicio                             :\nIndicador de Montos Brutos                        :\nIndicador de Montos Netos                         :\nForma de Pago                                     :\nForma de Pago Exportacion                         :\nFecha de Cancelacion                              :\nMonto Cancelado                                   :\nSaldo Insoluto                                    :\nFecha de Pago                                     :\nFecha de Pago                                     :\nFecha de Pago                                     :\nFecha de Pago                                     :\nPeriodo Desde                                     :\nPeriodo Hasta                                     :\nMedio de Pago                                     :\nTipo de Cuenta de Pago                            :\nNnumero de Cuetna de Pago                         :\nBanco de Pago                                     :\nCodigo Terminos de Pago                           :\nGlosa del Termino de Pago                         :\nDias del Termino de Pago                          :\nFecha Vencimiento                                 :\n";
      //datos emisor
      documentoString += "========== AREA EMISOR\n";
      documentoString += "Rut Emisor                                        :" + rutEmpresa + "\n";
      documentoString += "Razon Social Emisor                               :" + razonSocialEmpresa + "\n";
      documentoString += "Giro del Emisor                                   :" + giroEmpresa + "\n";
      documentoString += "Telefono                                          :" + telefonoEmpresa + "\n";
      documentoString += "Correo Emisor                                     :" + correoEmpresa + "\n";
      documentoString += "ACTECO                                            :" + acteco + "\n";
      documentoString += "Codigo Emisor Traslado Excepcional                :\nFolio Autorizacion                                :\nFecha Autorizacion                                :\n";
      documentoString += "Direccion de Origen Emisor                        :" + direccionEmpresa + "\n";
      documentoString += "Comuna de Origen Emisor                           :" + comunaEmpresa + "\n";
      documentoString += "Ciudad de Origen Emisor                           :" + ciudadEmpresa + "\n";
      documentoString += "Nombre Sucursal                                   :\n";
      documentoString += "Codigo Sucursal                                   :\n";
      documentoString += "Codigo Adicional Sucursal                         :\nCodigo Vendedor                                   :\nIdentificacor Adicional del Emisor                :\nRut Mandante                                      :\n";
      documentoString += "========== AREA RECEPTOR\n";
      //datos receptor
      documentoString += "Rut Receptor                                      :" + rutReceptor + "\n";
      documentoString += "Codigo Interno Receptor                           :\n";
      documentoString += "Nombre o Razon Social Receptor                    :" + razonSocialReceptor + "\n";
      documentoString += "Numero Identificador Receptor Extranjero          :\nNacionalidad del Receptor Extranjero              :\nIdentificador Adicional Receptor Extranjero       :\n";
      documentoString += "Giro del Negocio del Receptor                     :" + giroReceptor + "\n";
      documentoString += "Contacto                                          :" + "" + "\n";
      documentoString += "Correo Receptor                                   :" + emailReceptor + "\n";
      documentoString += "Direccion Receptor                                :" + direccionReceptor + "\n";
      documentoString += "Comuna Receptor                                   :" + comunaReceptor + "\n";
      documentoString += "Ciudad Receptor                                   :" + ciudadReceptor + "\n";
      documentoString += "Direccion Postal Receptor                         :\nComuna Postal Receptor                            :\nCiudad Postal Receptor                            :\nRut Solicitante Factura                           :\n";
      //transporte (no aplica)
      documentoString += "========== AREA TRANSPORTES                        \nPatente                                           :\nRut Transportista                                 :\nRut Chofer                                        :\nNombre del Chofer                                 :\nDireccion Destino                                 :\nComuna Destino                                    :\nCiudad Destino                                    :\nModalidad de Ventas                               :\nClausula de Venta Exportacion                     :\nTotal Clausula de Venta Exportacion               :\nVia de Transporte                                 :\nNombre del Medio de Transporte                    :\nRut Compañia de Transporte                         \nNombre Compania de Transporte                     :\nIdentificacion Adicional Compañia de Transporte   :\nBooking                                           :\nOperador                                          :\nPuerto de Embarque                                :\nIdentificador Adicional Puerto de Embarque        :\nPuerto Desembarque                                :\nIdentificador Adicional Puerto de Desembarque     :\nTara                                              :\nUnidad de Medida Tara                             :\nTotal Peso Bruto                                  :\nUnidad de Peso Bruto                              :\nTotal Peso Neto                                   :\nUnidad de Peso Neto                               :\nTotal Items                                       :\nTotal Bultos                                      :\nCodigo Tipo de Bulto                              :\nCodigo Tipo de Bulto                              :\nCodigo Tipo de Bulto                              :\nCodigo Tipo de Bulto                              :\nFlete                                             :\nSeguro                                            :\nCodigo Pais Receptor                              :\nCodigo Pais Destino                               :\n";
      //totales
      documentoString += "========== AREA TOTALES" + "\n";
      documentoString += "Tipo Moneda Transaccion                           :\n";
      documentoString += "Monto Neto                                        :" + this.total + "\n";
      // añadiendo montos exentos
      documentoString += "Monto Exento                                      :" + ""+ "\n";
      documentoString += "Monto Base Faenamiento de Carne                   :\nMonto Base de Margen de Comenrcializacion         :\n";
      documentoString += "Tasa IVA                                          :" + "19" + "\n";
      documentoString += "IVA                                               :" + this.iva + "\n";
      documentoString += "IVA Propio                                        :\nIVA Terceros                                      :\nCodigo Impuesto Adicional                         :\nCodigo Impuesto Adicional                         :\nCodigo Impuesto Adicional                         :\nCodigo Impuesto Adicional                         :\nCodigo Impuesto Adicional                         :\nCodigo Impuesto Adicional                         :\nIVA No Retenido                                   :\nCredito Especial Emp. Constructoras               :\nGarantia por Deposito de Envases                  :\nValor Neto Comisiones                             :\nValor Exento Comisiones                           :\nIVA Comisiones                                    :\n";
      documentoString += "Monto Total                                       :" + this.total + "\n";
      documentoString += "Monto No Facturable                               :\nMonto Periodo                                     :\nSaldo Anterior                                    :\nValor a Pagar                                     :\n";
      //totales otra moneda(no aplica?)
      documentoString += "========== OTRA MONEDA                             \nTipo Moneda                                       :\nTipo Cambio                                       :\nMonto Neto Otra Moneda                            :\nMonto Exento Otra Moneda                          :\nMonto Base Faenamiento de Carne Otra Moneda       :\nMonto Margen Comerc. Otra Moneda                  :\nIVA Otra Moneda                                   :\nTipo Imp. Otra Moneda                             :\nTasa Imp. Otra Moneda                             :\nValor Imp. Otra Moneda                            :\nIVA No Retenido Otra Moneda                       :\nMonto Total Otra Moneda                           :\n";
      // area detalles
      documentoString += "========== DETALLE DE PRODUCTOS Y SERVICIOS        \n";
      this.detalle.forEach(item => {
        item.total = item.precio * item.cantidad;
        documentoString += " ";
        var nombreProducto = item.descripcion;
        var cantidad = item.cantidad;
        var precioUnitario = item.precio;
        var precioItem = item.total;
        var unidad = item.unidadMedida;
        documentoString = this._add_whitespace(documentoString, 438);
        documentoString += nombreProducto;
        documentoString = this._add_whitespace(documentoString, 80 - nombreProducto.length);
        documentoString = this._add_whitespace(documentoString, 1040);
        documentoString += cantidad;
        documentoString = this._add_whitespace(documentoString, 18 - cantidad.toString().length);
        documentoString = this._add_whitespace(documentoString, 315);
        documentoString += Math.round(precioUnitario);
        documentoString = this._add_whitespace(documentoString, 18 - precioUnitario.toString().length);
        documentoString = this._add_whitespace(documentoString, 20);
        documentoString += unidad;
        documentoString = this._add_whitespace(documentoString, 2);
        documentoString = this._add_whitespace(documentoString, 418);
        documentoString += Math.round(precioItem);
        documentoString = this._add_whitespace(documentoString, 18 - precioItem.toString().length);
        documentoString += "\n";
      });
      var size = this.detalle.length;
      documentoString = this._add_whitespace(documentoString, 30 - size, "\n");
      documentoString += "========== FIN DETALLE\n";
      documentoString += "========== SUB TOTALES INFORMATIVO\n";
      documentoString = this._add_whitespace(documentoString, 20, "\n");
      documentoString += "========== DESCUENTOS Y RECARGOS\n";
      documentoString = this._add_whitespace(documentoString, 20, "\n");
      documentoString += "========== INFORMACION DE REFERENCIA\n";
      if (documentoString.length == -1) {
        //verificar nota de credito
        /*
          $narvi_documentos = $wpdb->get_results("SELECT * FROM  " + $wpdb->prefix + "narvi_documentos WHERE order_id = " + "'$order_id'");

          documentoString += $narvi_documentos[0]->tipo_documento + "  ";
          $folio = $narvi_documentos[0]->folio;
          documentoString += $folio;
          documentoString = this._add_whitespace(documentoString, 18 - strlen(strval($folio)));
          $fecha = substr($order->get_date_created() + date(), 0, 10);
          documentoString += $fecha;
          documentoString = this._add_whitespace(documentoString, 10 - strlen(strval($fecha)));
          $codigo_referencia = "1";
          documentoString += $codigo_referencia;
          $razon_referencia = "DOCUMENTO ANULADO";
          documentoString += $razon_referencia + "\n";
          documentoString = this._add_whitespace(documentoString, 39, "\n");*/
      } else {
        documentoString = this._add_whitespace(documentoString, 40, "\n");
      }
      documentoString += "========== COMISIONES Y OTROS CARGOS\n";
      documentoString = this._add_whitespace(documentoString, 20, "\n");
      documentoString += "========== CAMPOS PERSONALIZADOS\n";
      documentoString += "MontoPalabras                                     :\nFolioSAP                                          :\nCondicionPago                                     :\nPedido                                            :\nTipoImpresion                                     :\nTIPODETALLE                                       :\nCodigoBarra                                       :\nDespacho                                          :\nCAMPO PERSONALIZADO GENERAL                       :\nCAMPO PERSONALIZADO GENERAL                       :\nCAMPO PERSONALIZADO GENERAL                       :\nCAMPO PERSONALIZADO GENERAL                       :\nCAMPO PERSONALIZADO GENERAL                       :\nCOLUMNAS_DETALLE                                  :\nCOLUMNA_DETALLE_1                                 :\nANCHO_COLUMNA_1                                   :\nDATO_COLUMNA_1                                    :\nALINEACION_COLUMNA_1                              :\nCOLUMNA_DETALLE_2                                 :\nANCHO_COLUMNA_2                                   :\nDATO_COLUMNA_2                                    :\nALINEACION_COLUMNA_2                              :\nCOLUMNA_DETALLE_3                                 :\nANCHO_COLUMNA_3                                   :\nDATO_COLUMNA_3                                    :\nALINEACION_COLUMNA_3                              :\nCOLUMNA_DETALLE_4                                 :\nANCHO_COLUMNA_4                                   :\nDATO_COLUMNA_4                                    :\nALINEACION_COLUMNA_4                              :\nCOLUMNA_DETALLE_5                                 :\nANCHO_COLUMNA_5                                   :\nDATO_COLUMNA_5                                    :\nALINEACION_COLUMNA_5                              :\nCOLUMNA_DETALLE_6                                 :\nANCHO_COLUMNA_6                                   :\nDATO_COLUMNA_6                                    :\nALINEACION_COLUMNA_6                              :\nCOLUMNA_DETALLE_7                                 :\nANCHO_COLUMNA_7                                   :\nDATO_COLUMNA_7                                    :\nALINEACION_COLUMNA_7                              :\nCOLUMNA_DETALLE_8                                 :\nANCHO_COLUMNA_8                                   :\nDATO_COLUMNA_8                                    :\nALINEACION_COLUMNA_8                              :\nCOLUMNA_DETALLE_9                                 :\nANCHO_COLUMNA_9                                   :\nDATO_COLUMNA_9                                    :\nALINEACION_COLUMNA_9                              :\nCOLUMNA_DETALLE_10                                :\nANCHO_COLUMNA_10                                  :\nDATO_COLUMNA_10                                   :\nALINEACION_COLUMNA_10                             :\nCOLUMNA_DETALLE_11                                :\nANCHO_COLUMNA_11                                  :\nDATO_COLUMNA_11                                   :\nALINEACION_COLUMNA_11                             :\nImagen                                            :\nImpresoraRemota                                   :\nCopiasNormal                                      :\nCopiasCedibles                                    :\nOficinaSII                                        :\nTipoDetalle                                       :\nPersonalizado General                             :\nNombre Compañia de Transporte                     :\nTotal Peso Bruto                                  :\nUnidad Peso Bruto                                 :\nCantidad de Bultos                                :\nTELEFONO RECEPTOR                                 :\nOBSERVACIONES                                     :\nFOB                                               :\nBLYCRT                                            :\nTOTAL                                             :\nSON                                               :\nOBSERVACION                                       :\nTIPO DE CAMBIO                                    :\nAGENTE ADUANA                                     :\nMOTONAVE                                          :\nNAVIERA                                           :\nTERMOGRAFO                                        :\nRAMPLA                                            :\nTipo de cambio informativo                        :\nCorreoXML                                         :\n";
      documentoString += "XXX FIN DOCUMENTO";

      return documentoString;
    },
    _add_whitespace(string, cantidad, caracter = " ") {
      var nuevoString = string;
      for (var i = 0; i < cantidad; i++) {
        nuevoString += caracter;
      }
      return nuevoString;
    }
    ,
    /* Detalle */
    agregarArticulo() {
      this.detalle.unshift({ descripcion: null, unidadMedida: null, precio: null, cantidad: null, total: null });
      this.edicionDetalle = 0;
      this.esNuevo = true;
    },
    editarDetalle(fila) {
      this.articulo = this.detalle[fila];
      this.edicionDetalle = fila;
      this.esNuevo = false;
    },
    eliminarDetalle(tr, fila) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Detalle",
        text: "Está seguro de eliminar el artículo '" + tr.descripcion + "' ?",
        accept: () => { this._eliminarDetalle(fila) },
        'accept-text': "Confirmar",
        'cancel-text': "Cancelar"
      })
    },
    _eliminarDetalle(fila)  {
      this.esNuevo = false;
      var dets = [];
      for (let i = 0; i < this.detalle.length; i++) {
        if (i != fila) {
          dets.push(this.detalle[i]);
        }
      }
      this.detalle = dets;
    },
    detalleAceptar(tr, fila) {
      if (fila <0)  return false;
      if (tr.descripcion == null || tr.unidadMedida == null || tr.cantidad == null || tr.precio == null ||
        tr.descripcion.trim() == "" || tr.unidadMedida.trim() == "" || tr.cantidad.trim() == "" || tr.precio.trim() == "")  {
        this.$vs.notify({
          color: 'danger', title: 'Detalle DTE', text: 'Debe ingresar todos los datos solicitados'
        });
        return false;
      }
      this.esNuevo = false; this.edicionDetalle = null;
      this._detalleCalcularTotal();
    },
    _detalleCalcularTotal() {
      this.total = 0;
      this.detalle.forEach(element => this.total += (element.cantidad * element.precio));
    },
    detalleCencelar(fila) {
      fila = (fila === undefined) ? null : fila;
      if (this.esNuevo && fila == 0) {
        this.eliminarDetalle(fila);
      }
    },

    /* Referencias */
    abrirReferencia()  {
      this.referencia = { fecha: null, motivo: null, folio: null, tipoDocumento: null };
      this.$refs['modalReferencias'].open();

    },
    agregarReferencias()  {
      this.referencia.formatFecha = this.getFecha(this.referencia.fecha);
      if (this.referencia.formatFecha == null || this.referencia.fecha == null || this.referencia.folio == null ||
        this.referencia.motivo == null ||this.referencia.tipoDocumento == null ||
        this.referencia.formatFecha.trim() == "" || this.referencia.folio.trim() == "" ||
        this.referencia.motivo.trim() == "" || this.referencia.tipoDocumento.trim() == "")  {
        this.$vs.notify({
          color: 'danger', title: 'Documento de referencia', text: 'Debe ingresar todos los datos solicitados'
        });
        return false;
      }
      this.referencias.push(this.referencia);
      console.log(this.referencias);
      this.referencia = { formatFecha: null, fecha: null, motivo: null, folio: null, tipoDocumento: null };
      this.$refs['modalReferencias'].close();
    },
    eliminarReferencia(ind)   {
      var dets = [];
      for (let i = 0; i < this.referencia.length; i++) {
        if (i != ind) {
          dets.push(this.referencia[i]);
        }
      }
      this.referencia = dets;
    },

    /* Validación Encabezado */
    getError(par) {
      let retorno = null;
      const ret = this.errors.items.find(elemento => elemento.field == par);
      if (ret !== undefined && retorno === null)  {
        if (par == "rutReceptor" && ret.rule == "validaRut")  {
          return "rut";
        }
        if (par == "email" && ret.rule == "email") {
          return "email";
        }
        if (ret.rule == "required") {
          return "required";
        }
        console.log(ret);
      }
      return null;
    },

    /* Herramientas */
    getFecha(fecha) {
      if (fecha == null)  return null;
      const d = fecha.getDate();
      const m = fecha.getMonth() + 1;
      const y = fecha.getFullYear();
      return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    },
    getTipoDocumento(td)  {
      const ret = this.tiposDocumento.find(element => element.value == td);
      return ret.text;
    },

  }
}

function validaRUT(rutCompleto) {
  rutCompleto = rutCompleto.replace("‐", "-");
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
  var tmp = rutCompleto.split("-");
  var digv = tmp[1];
  var rut = tmp[0];
  if (digv == "K") digv = "k";

  return dv(rut) == digv;
}

function dv(T) {
  var M = 0,
    S = 1;
  for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  return S ? S - 1 : "k";
}

</script>

<style>
.prueba {
  width: 100%;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
  padding: -0.25rem 2rem;
  margin: 10px;
}
[dir] .btn-group button {
  /*padding: 1rem 1.25rem !important;*/
  padding: 6px !important;
}
.form-error-message {
  font-size: 0.6vw !important;
  float: right;
}
</style>
