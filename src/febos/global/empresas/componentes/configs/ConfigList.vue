<template>
  <vx-card :title="config.name" title-color="primary">
    <!-- collapse -->
    <app-collapse
      id="faq-payment-qna"
      type="margin"
      class="mt-2"
      v-for="(parameter, index) in config.parameters"
      v-bind:key="index"
    >
      <ConfigListItem :key="index" :configurations="configurations" :param="parameter"/>
    </app-collapse>
  </vx-card>
</template>

<script>
import ConfigListItem from './ConfigListItem';

import AppCollapse from '@core/components/app-collapse/AppCollapse';

export default {
  name: 'ConfigList',
  components: {
    AppCollapse,
    ConfigListItem
  },
  data() {
    return { loading: false };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
    configurations: {
      type: Object,
      required: true
    }
  }
};
</script>
