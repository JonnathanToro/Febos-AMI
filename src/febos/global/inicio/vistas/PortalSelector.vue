<template>
  <div class="container min-vh-100 vertical-center">
    <div class="row justify-content-center">
      <div class="col-md-4"  v-for="portal in portals" :key="portal">
        <router-link
          class="card text-center cursor-pointer shadow"
          :to="portal"
        >
          <img
            :src="portalsConfig[portal].image"
            :alt="portalsConfig[portal].title"
            class="card-img-top"
          />
          <div class="card-body">
            <h4>{{ portalsConfig[portal].title }}</h4>
            <p class="card-text mt-1">
              {{ portalsConfig[portal].description }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      portals: [],
      // TODO: move this to a config file for each country or product
      portalsConfig: {
        cloud: {
          image: require('@/assets/images/portal-cloud.svg'),
          title: 'Gestión interna',
          description: 'Gestión de documentos emitidos y recibidos para usuarios'
        },
        proveedores: {
          image: require('@/assets/images/portal-proveedores.svg'),
          title: 'Gestión interna',
          description: 'Gestión de documentos emitidos y recibidos para usuarios'
        }
      }
    };
  },
  created() {
    const availablePortals = (process.env.VUE_APP_AVAILABLE_PORTALS || '').split(',');

    if (availablePortals[0]) {
      this.portals = availablePortals;
    }
  }
};

</script>

<style lang="scss">
  .vertical-center {
    display: grid;
    align-content: center;
  }
</style>
