<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="left" vs-align="left" vs-w="6">
        <vx-card title="Mi empresa" :subtitle="empresa.fantasia" class="mr-2" v-if="empresa">
          <vs-row>
            <vs-col vs-w="3">Razón Social</vs-col>
            <vs-col vs-w="9" style="font-weight: bolder;">{{ empresa.razonSocial }}</vs-col>
            <vs-col vs-w="3">Nombre de fantasía</vs-col>
            <vs-col vs-w="9" style="font-weight: bolder;">{{ empresa.fantasia }}</vs-col>
            <vs-col vs-w="3">RUT</vs-col>
            <vs-col vs-w="9" style="font-weight: bolder;">{{ empresa.iut }}</vs-col>
            <vs-col vs-w="3" class="mt-3">Usuario</vs-col>
            <vs-col vs-w="9" class="mt-3">{{ usuario.alias }}</vs-col>
          </vs-row>
        </vx-card>
      </vs-col>
      <!--
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vx-card title="Novedades" subtitle="Que hay de nuevo en Febos?" class="ml-2">
          <vs-list>
            <vs-list-item
              icon="check"
              title="Snickerdoodle"
              subtitle="An excellent companion"
            ></vs-list-item>
            <vs-list-item
              icon="check"
              title="Sapporo Haru"
              subtitle="An excellent polish restaurant, quick delivery and hearty, filling meals"
            ></vs-list-item>
            <vs-list-item
              icon="verified_user"
                title="Enid's" subtitle="At night a bar, during the day a delicious brunch spot."
            ></vs-list-item>
            <vs-list-item
              icon="verified_user"
              title="Veronika Ossi" subtitle="Has not watched anything recently"
            ></vs-list-item>
          </vs-list>
        </vx-card>
      </vs-col>
      -->
      <!--</vs-row>
      <vs-row>-->
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vx-card title="Mis módulos" class="ml-2">
          <div class="container">
            <div class="centrador">
              <div
                class="modulo mr-5 mt-5 pt-5"
                v-for="module in enabledModules"
                :key="module.nombre"
                v-on:click="seleccionarModulo(module.nombre)"
              >
                <div class="nombre-modulo">{{ module.descripcion }}</div>
                <vs-icon :icon="module.icono" size="75px" color="#ffffff" class="mt-2"></vs-icon>
                <vs-icon
                  icon="star"
                  size="20px"
                  color="#ffffff"
                  class="modulo-actual"
                  v-if="module.nombre === moduloActual"
                />
              </div>
              <div
                class="modulo modulo-deshabilitado mr-5 mt-5 pt-5"
                v-for="module in disabledModules"
                :key="module.nombre"
              >
                <div class="nombre-modulo">{{ module.descripcion }}</div>
                <vs-icon :icon="module.icono" size="75px" color="#ffffff" class="mt-2"></vs-icon>
              </div>
            </div>
          </div>
        </vx-card>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vx-card title="Documentos" class="ml-2 mt-5">
          <div class="container">
            <div class="centrador">
              <div class="modulo mr-5 mt-5 pt-5">
                <div class="nombre-modulo">
                  14 Pendientes {{indicators}}
                </div>
                <vs-icon icon="folder_open" size="75px" color="#ffffff" class="mt-2"></vs-icon>
              </div>
              <div class="modulo mr-5 mt-5 pt-5">
                <div class="nombre-modulo">
                  3 Finalizados
                </div>
                <vs-icon icon="folder_open" size="75px" color="#ffffff" class="mt-2"></vs-icon>
              </div>
              <div class="modulo mr-5 mt-5 pt-5">
                <div class="nombre-modulo">
                  3 en copia
                </div>
                <vs-icon icon="folder_open" size="75px" color="#ffffff" class="mt-2"></vs-icon>
              </div>
              <div class="modulo mr-5 mt-5 pt-5">
                <div class="nombre-modulo">
                  2 anulados
                </div>
                <vs-icon icon="folder_open" size="75px" color="#ffffff" class="mt-2"></vs-icon>
              </div>
            </div>
          </div>
        </vx-card>

      </vs-col>
    </vs-row>

  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import ModuleSettingsMixin from '@/febos/global/inicio/mixins/ModuleSettingsMixin';

export default {
  mixins: [ModuleSettingsMixin],
  computed: {
    ...mapGetters('Usuario', { usuario: 'currentUser' }),
    ...mapGetters({ moduloActual: 'currentModule' }),
    ...mapGetters('Empresas', { empresa: 'company' }),
    ...mapGetters('Inicio', ['indicators']),
    enabledModules() {
      return this.modules.filter((module) => module.visible && module.habilitado);
    },
    disabledModules() {
      return this.modules.filter((module) => module.visible && !module.habilitado);
    }
  },
  methods: {
    ...mapActions('Menus', { seleccionarModulo: 'seleccionarModulo' }),
    ...mapActions('Usuario', ['loadPermissions']),
    ...mapActions('Inicio', ['fetchIndicatorsTypes']),
  },
  created() {
    this.loadPermissions();
    this.fetchIndicatorsTypes();
  }
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
