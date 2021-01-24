<template>
  <CheckPermission
    :container-class="containerClass"
    :permission="permission"
  >
    <input
      ref="file"
      type="file"
      class="d-none"
      @change="uploadFile($event)"
    />
    <vs-button
      :color="color"
      :class="buttonClass"
      @click="$refs.file.click()"
      :disabled="progress.enabled"
    >
      {{ text }}
    </vs-button>
    <vs-progress
      v-if="progress.enabled"
      :percent="progress.percent"
      :indeterminate="progress.indeterminate"
      :color="color"
    />
  </CheckPermission>
</template>
<script>

import { uuid } from 'vue-uuid';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';
import { ioGetPrivateUploadUrl, ioUploadFileToPrivateUrl } from '@/febos/servicios/api/herramientas.api';

const paths = {
  ed: `febos-io/chile/escritorio-digital/${process.env.VUE_APP_AMBIENTE}/archivos/expedientes/`
};

export default {
  data: () => ({
    progress: {
      enabled: false,
      percent: 0,
      indeterminate: true
    }
  }),
  methods: {
    async uploadFile(event) {
      const file = event.target.files[0];

      if (file.size > this.maxSizeInMb * 1048576) {
        this.$emit('input', {
          failed: true,
          failedMessage: `El archivo ${file.name} supera el máximo de tamaño permitido por archivo (${this.maxSizeInMb} MB)`
        });

        return false;
      }

      const fileId = uuid.v1();
      const baseUrl = paths[this.uploadTo];
      const identifier = this.identifier ? `-${this.identifier}` : '';
      const url = `${baseUrl}${Date.now()}${fileId}${identifier}.${file.name.split('.').pop()}`;

      try {
        this.progress.enabled = true;
        this.progress.indeterminate = true;

        const response = await ioGetPrivateUploadUrl(url, file.type);

        this.progress.indeterminate = false;
        await ioUploadFileToPrivateUrl(
          response.data?.url,
          file,
          (percent) => {
            this.progress.percent = percent;
          }
        );

        this.$emit('input', {
          id: fileId,
          name: file.name,
          mime: file.type,
          date: this.$moment().format('YYYY-MM-DD HH:MM:SS'),
          path: url,
          failed: false
        });
      } catch (e) {
        console.error(e);
        this.$emit('input', {
          failed: true,
          failedMessage: e.message
        });
      } finally {
        this.progress.enabled = false;
        this.progress.percent = 0;
        this.progress.indeterminate = false;
      }
      return true;
    }
  },
  props: {
    permission: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    uploadTo: {
      type: String,
      required: true,
      validator(value) {
        return Object.keys(paths).includes(value);
      }
    },
    maxSizeInMb: {
      type: Number,
      default: 20
    },
    identifier: {
      type: String
    },
    color: {
      type: String,
      default: 'primary'
    },
    buttonClass: {
      type: [String, Object]
    },
    containerClass: {
      type: [String, Object]
    }
  },
  components: {
    CheckPermission
  }
};

</script>
