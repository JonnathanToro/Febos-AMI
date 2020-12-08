<!-- =========================================================================================
  File Name: FullPage.vue
  Description: Full page layout
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="layout--full-page" >
    <router-view></router-view>
  </div>
</template>
<script>
import IdleMixin from '../../febos/global/_vue/mixins/IdleMixin';

export default {
  mixins: [IdleMixin]
};
</script>
