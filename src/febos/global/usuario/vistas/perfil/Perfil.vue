<template>
  <div id="perfil">
    <div class="vx-row">
      <!-- Display Usuario -->
      <div class="vx-col w-full lg:w-1/4">
        <div class="vx-card p-2 card-top">
          <div class="vx-card__collapsible-content vs-con-loading__container" id="card-info">
            <div class="vx-card__body">
              <div class="text-center">
                <vs-avatar
                  class="border-2 border-solid border-white"
                  id="avatar"
                  :src=currentUser.avatar
                  size="100px"
                  @click="abrirPrompAvatar"
                ></vs-avatar>
              </div>
              <div class="text-center">
                <h4 id="alias-usuario-actual">{{ currentUser.alias }}</h4>
                <p id="nombre-usuario-actual" class="text-grey">({{ currentUser.nombre }})</p>
                <p id="correo-usuario-actual" class="text-grey">{{ currentUser.correo }}</p>
                <p id="iut-usuario-actual" class="text-grey">{{ currentUser.iut }}</p>
              </div>
            </div>
            <div class="vx-card__footer">
              <div class="vs-component vs-divider">
                <span
                  class="vs-divider-border after"
                  style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"
                />
              </div>
              <!--<div>
                <vx-tooltip text="Aqui puede cambiar su imagen" position="top">
                  <vs-button
                   type="border"
                   class="w-full mb-3 btn-cambiar-avatar"
                   @click="abrirPrompAvatar"
                   >
                     Cambiar Avatar
                   </vs-button>
                </vx-tooltip>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <!-- END Display Usuario-->

      <!-- Formulario de edicion usuario -->
      <div class="vx-col w-full lg:w-1/2">
        <vx-card title="Editar perfil" class="card-top">
          <form id="editar-perfil">
            <div class="vx-row mb-1">
              <div class="vx-col lg:w-1/4 md:w-1/2 sm:w-auto">
                <label for="iut" class="lbl">Rut</label>
                <vs-input
                  v-validate="'required'"
                  class="w-full"
                  id="iut"
                  name="iut"
                  icon-pack="material-icons"
                  icon="fingerprint"
                  icon-no-border
                  :value="currentUser.iut"
                  :disabled="true"
                ></vs-input>
                <span class="text-danger text-sm">{{ errors.first('iut') }}</span>
              </div>
              <div class="vx-col sm:w-auto md:w-full lg:w-3/4">
                <vs-input
                  v-validate="'required|min:5|max:50'"
                  class="w-full"
                  name="nombre"
                  icon-pack="material-icons"
                  icon="account_circle"
                  icon-no-border
                  label="Nombre"
                  :value="currentUser.nombre"
                  @input="actualiza('nombre', $event)"
                ></vs-input>
                <span class="text-danger text-sm">{{ errors.first('nombre') }}</span>
              </div>
            </div>
            <div class="vx-row mt-5 mb-5">
              <div class="vx-col lg:w-1/4 md:w-1/2 sm:w-auto">
                <vs-input
                  v-validate="'required|min:3|max:50'"
                  class="w-full"
                  name="alias"
                  icon-pack="material-icons"
                  icon="favorite"
                  icon-no-border
                  label="Alias"
                  :value="currentUser.alias"
                  @input="actualiza('alias', $event)"
                ></vs-input>
                <span class="text-danger text-sm">{{ errors.first('alias') }}</span>
              </div>
              <div class="vx-col lg:w-3/4 md:w-1/2 sm:w-auto">
                <vs-input
                  v-validate="'required|email|min:10|max:150'"
                  type="email"
                  name="correo"
                  class="w-full"
                  icon-pack="material-icons"
                  icon="email"
                  icon-no-border
                  label="Correo"
                  :value="currentUser.correo"
                  @input="actualiza('correo', $event)"
                ></vs-input>
                <span class="text-danger text-sm">{{ errors.first('correo') }}</span>
              </div>
            </div>
           <!-- <div class="vs-row mt-6">
              <vs-col vs-offset="2" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
                <vx-tooltip text="Al hacer click modificara sus datos" position="top">
                  <vs-button
                    type="border"
                    class="mb-2"
                    :disabled="!validarFormularioPerfil"
                    @click="modificarPerfil"
                  >Modificar</vs-button>
                </vx-tooltip>
              </vs-col>
            </div>-->
          </form>

        </vx-card>
      </div>
      <!-- END Formulario de edicion usuario -->

      <!-- Formulario de edicion clave -->
      <div class="vx-col w-full lg:w-1/4">
        <vx-card title="Modificar clave" class="card-top">

          <form id="editar-clave">
            <div class="vx-row mb-1">
              <div class="vx-col w-full">
                <vs-input
                  v-validate="'required|min:4|max:20'"
                  autocomplete
                  class="w-full"
                  icon-pack="material-icons"
                  icon="vpn_key"
                  icon-no-border
                  type="password"
                  placeholder="************"
                  readonly
                  label="Clave actual"
                  name="actualPassword"
                  :danger="errors.has('actualPassword')"
                  :danger-text="errors.first('actualPassword')"
                  v-model="claveActual" />
              </div>
            </div>
            <div class="vx-row mb-1">
              <div class="vx-col w-full">
                <vs-input
                  v-validate="'required|min:4|max:20'"
                  ref="password"
                  autocomplete
                  class="w-full"
                  icon-pack="material-icons"
                  icon="vpn_key"
                  icon-no-border
                  type="password"
                  label="Clave nueva"
                  placeholder="************"
                  readonly
                  name="password"
                  v-model="nuevaClave"
                  :danger="errors.has('password')"
                  :danger-text="errors.first('password')"
                />
              </div>
            </div>
            <div class="vx-row mb-1">
              <div class="vx-col w-full">
                <vs-input
                  v-validate="'required|min:4|max:20|confirmed:password'"
                  autocomplete
                  class="w-full"
                  icon-pack="material-icons"
                  icon="vpn_key"
                  readonly
                  icon-no-border
                  type="password"
                  label="Repita clave nueva"
                  placeholder="************"
                  name="confirmPassword"
                  v-model="reNuevaClave"
                  :danger="errors.has('confirmPassword')"
                  :danger-text="errors.first('confirmPassword')"
                />
              </div>
            </div>
            <div class="vs-row">
              <vs-col vs-offset="2" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
                <vx-tooltip text="Al hacer click se modificara su clave" position="top">
                  <vs-button
                    disabled
                    class="mt-5"
                    type="border"
                    @click="modificarClave"
                  >Cambiar</vs-button>
                </vx-tooltip>
              </vs-col>
            </div>
          </form>

        </vx-card>
      </div>
      <!-- END Formulario de edicion clave -->

    </div>
    <div class="vx-row mt-5">

      <!--listado empresas-->
      <!--<div class="vx-col w-full lg:w-1/2">
        <vx-card title="Empresas a las que pertenezco" class="card-mid">
          <form id="form-empresas">
            <vs-input
              autofocus="true"
              icon="icon icon-search"
              icon-pack="feather"
              label-placeholder="Buscar"
              v-model="textoFiltroEmpresa"
              v-bind:class="{ 'mb-6': !mensajeAyudaEmpresas }"
              class="w-full no-icon-border mt-none"
              name="filtro-empresas"
            />
            <vs-alert :active="mensajeAyudaEmpresas" color="dark" icon="new_releases" class="mb-2" >
              <span>
                Aqui se muestran
                <b>"las primeras 4 empresas de {{ empresasFiltradas.length }}".</b>
                Si desea ver mas, utilice el buscador para filtrarlas.
              </span>
            </vs-alert>
            <div class="listado-mid" style="max-height: 300px;overflow-y: scroll">
              <VuePerfectScrollbar class="" :settings="settings">
                <transition-group name="febos" tag="ul" appear>
                  <li
                    class="cursor-pointer item-animado"
                    v-for="(empresa, index) in empresasFiltradas"
                    :key="empresa.id"
                    :style="{transitionDelay: (index * 0.1) + 's'}"
                    v-if="index < mostrarMaximo"
                    v-on:click="seleccionarEmpresa(empresa)">
                    <empresa-item :empresa="empresa"/>
                  </li>
                </transition-group>
              </VuePerfectScrollbar>
              <div class="noEmpresas" v-if="noHayEmpresas">
                <vs-row vs-w="12" style="margin-top:30px">
                  <vs-col
                    vs-offset="3"
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    vs-w="6"
                  >
                    <div class="icono">
                      <feather-icon
                        icon="FrownIcon"
                        class="text-white text-primary"
                        svgClasses="h-12 w-12" />
                    </div>
                    <div class="texto">Ups! No hay empresas que mostrar</div>
                  </vs-col>
                </vs-row>
              </div>
            </div>
          </form>
        </vx-card>
      </div>-->
      <!-- END listado empresas-->
    </div>
    <!-- Ventana para modificar avatar -->
    <vs-prompt
      accept-text="Cambiar Avatar"
      cancel-text="Me arrepentí"
      title="Nueva imagen"
      :is-valid="validarImagenVacia"
      @accept="subirImagen"
      @close="cerrarPromptAvatar"
      :active.sync="promtpAvatar"
      id="prompt-avatar"
    >
      <div class="con-exemple-prompt">
        <cropper
          classname="cropper"
          :src="imagenPreviaCropper"
          :stencilProps="{previewClassname: 'preview'}"
          :stencilComponent="$options.components.CircleStencil"
          ref="cropper"
        />
        <div class="button-wrapper">
          <span
            class="button-imagen vs-button-primary vs-button-border"
            @click="$refs.imagen.click()"
          >
            <input type="file" ref="imagen" @change="seleccionarImagen($event)" accept="image/*">
            Seleccionar imagen
          </span>
        </div>
      </div>
    </vs-prompt>
    <!-- END Ventana para modificar avatar -->

  </div>
</template>

<script>
// import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { mapActions, mapGetters } from 'vuex';

// import FiltroPerfil from './FiltroPerfil';
// import EmpresaItem from './EmpresaItem';
import { Cropper, CircleStencil } from 'vue-advanced-cropper';

export default {
  components: {
    // FiltroPerfil,
    // EmpresaItem,
    // VuePerfectScrollbar
    Cropper,
    CircleStencil,
  },
  data() {
    return {
      noAvatar: require('../../../../../assets/images/no-avatar.svg'),
      payload: {
        cerrarAnimacion: this.$vs.loading.close,
        notify: this.$vs.notify
      },
      claveActual: '',
      nuevaClave: '',
      reNuevaClave: '',

      /* listado empresas */
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30,
      },
      mostrarMaximo: 4,
      buscando: false,
      buscandoPermiso: false,
      textoFiltroEmpresa: '',
      textoFiltroPermisos: '',
      /* END listado empresas */

      imagenPreviaCropper: '',
      imagenASubir: '',
      promtpAvatar: false,
      coordenadasImagen: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },

      /* Listado de actividades */
      paginaActual: 1,
      actividadesArray: [],
      /* END Listado de actividades */

    };
  },
  watch: {
    successAction() {
      this.$vs.notify({
        title: 'Genial!',
        text: 'Acción realizada exitosamente',
        color: 'success',
        time: 3000,
        position: 'top-center'
      });
    },
    loading(value) {
      if (!value) {
        this.$vs.loading.close('#perfil > .con-vs-loading');
        return;
      }

      this.$vs.loading({
        container: '#perfil',
        scale: 0.6
      });
    }
  },
  computed: {
    ...mapGetters('Usuario', [
      'currentUser',
      'loading',
      'successAction'
    ]),
    totalPaginas() {
      return this.$store.getters['usuarios/totalPaginas'];
    },
    mensajeAyudaEmpresas() {
      return this.textoFiltroEmpresa.length < 4;
    },
    mensajeAyudaPermiso() {
      return this.textoFiltroPermisos.length < 4;
    },
    consultarAvatar() {
      if (this.currentUser.avatar) {
        return this.currentUser.avatar;
      }
      // return `https://api.adorable.io/avatars/285/${this.correo}`;
      return this.noAvatar;
    },

    /* listado empresas */
    misEmpresas() {
      return this.$store.getters['empresas/listado'];
    },
    permisosFiltrados() {
      // let nuevoListado = this.listadoPermisos.filter(permiso => {
      //   let filtro = this.textoFiltroPermisos.toLocaleLowerCase();
      //   let incluyeCodigo = permiso.codigo.toLocaleLowerCase().includes(filtro);
      //   let incluyeDescripcion = permiso.descripcion.toLocaleLowerCase().includes(filtro);
      //   let incluyeNombre = permiso.nombre.toLocaleLowerCase().includes(filtro);
      //   return incluyeNombre || incluyeDescripcion || incluyeCodigo;
      // });
      return [];
    },
    empresasFiltradas() {
      // let nuevoListado = this.misEmpresas.filter(empresa => {
      //   let filtro = this.textoFiltroEmpresa.toLocaleLowerCase();
      //   let incluyeRut = empresa.iut.toLocaleLowerCase().includes(filtro);
      //   let incluyeFantasia = empresa.fantasia.toLocaleLowerCase().includes(filtro);
      //   let incluyeRazonSocial = empresa.razonSocial.toLocaleLowerCase().includes(filtro);
      //   return incluyeFantasia || incluyeRazonSocial || incluyeRut;
      // });
      return [];
    },
    noHayEmpresas() {
      return !this.buscando && this.empresasFiltradas.length === 0;
    },
    noHayPermisos() {
      return !this.buscandoPermiso && this.permisosFiltrados.length === 0;
    },
    /* END listado empresas */
    listadoPermisos() {
      return this.$store.getters['configuraciones/listadoPermisos'];
    },
    validarFormularioPerfil() {
      return !this.errors.any() && this.correo !== '' && this.alias !== '' && this.iut !== '' && this.nombre !== '';
    },
    validarImagenVacia() {
      return this.imagenPreviaCropper !== '';
    }
  },

  methods: {
    ...mapActions('Usuario', [
      'actualizarMiPerfil',
      'changePassword'
    ]),
    /* Metodos para el tratado del avatar */
    transformaImagenFile(url, filename, mimeTypeParam) {
      const mimeType = mimeTypeParam || (url.match(/^data:([^;]+);/) || '')[1];
      return (fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], filename, { type: mimeType }))
      );
    },
    seleccionarImagen(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagenPreviaCropper = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    subirImagen() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordenadasImagen = coordinates;
      this.imagenPreviaCropper = canvas.toDataURL();
      this.transformaImagenFile(this.imagenPreviaCropper, 'perfil.jpg')
        .then((imagen) => {
          this.imagenASubir = imagen;
          console.log('Imagen a subir', imagen);
        });
    },
    cerrarPromptAvatar() {
      this.promtpAvatar = false;
    },
    abrirPrompAvatar() {
      this.promtpAvatar = true;
      this.imagenPreviaCropper = this.currentUser.avatar;
    },
    /* END Metodos para el tratado del avatar */

    /* Metodos para modificar los usuarios */
    actualiza(key, value) {
      this.currentUser[key] = value;
    },
    modificarPerfil() {
      this.$vs.loading();
      const payload = {
        ...this.payload,
        currentUser: this.currentUser
      };
      this.actualizarMiPerfil(payload).then((modificado) => {
        console.log('modificado', modificado);
        payload.cerrarAnimacion();
      }).catch((error) => {
        console.log('error', error);
        payload.cerrarAnimacion();
      });
    },
    modificarClave() {
      if (this.claveActual !== '' && (this.nuevaClave === this.reNuevaClave)) {
        this.changePassword({
          claveActual: this.claveActual,
          claveNueva: this.nuevaClave
        });
      }
    },
    /* END Metodos para modificar los usuarios */

    /* listado empresas */
    seleccionarEmpresa() {},
    /* END listado empresas */
  },
  created() {
  },
  beforeCreate() {
  },
  beforeDestroy() {
    if (this.promtpAvatar) document.getElementById('prompt-avatar').remove();
  }
};
</script>

<style lang="scss">
  /*@import "@/assets/scss/vuesax/pages/profile.scss";*/

  .modal-container {
    .vs-input {
      label {
        font-size: 1.2rem;
      }
      input {
        text-align: center;
      }
    }
  }

  .card-top {
    min-height: 358.5px;
  }

  .item-animado {
    transition: all .3s;
    box-shadow: 0px 3px 10px 0px #ccc;
  }

  .item-animado:hover {
    margin-top: 4px;
    margin-bottom: 4px;
    font-size: 110%;
  }

  .listado-mid {
    overflow-y: scroll;
    border: solid 1px #ccc;
    background-color: #eff2f7;
    height: auto;
    max-height: 276px;
    li {
      list-style: none;
    }
  }

  .listado-mid li:last-child .card {
    border-bottom: solid 1px #ccc;
  }

  .listado-mid ul {
    box-shadow: 0px 1px 3px 1px #ccc !important;
    margin-bottom: 10px;
  }

  .listado-mid li:first-child .card {
    border-top: none;
  }

  .listado-mid ul {
    border-top: none;
  }

  .lbl {
    padding-left: 5px;
    font-size: .85rem;
    color: rgba(0,0,0,.7);
  }

  .cropper {
    height: 400px;
    background: #DDD;
  }

  .vs-dialog {
    max-width: 600px;
  }

  /*Subir imagen*/
  .upload-example-cropper {
    border: solid 1px #EEE;
    height: 300px;
    width: 100%;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 17px;
  }

  .button-imagen {
    border-radius: 6px;
    font-size: 14px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.5s;
  }

  .button-imagen input {
    display: none;
  }
  /*END subir imagen*/

  .card-mid {
    max-height: 482px;
  }

  /* Tabla de actividades */

  /* END Tabla de actividades */
</style>
