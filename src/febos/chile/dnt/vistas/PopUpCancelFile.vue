<template>
  <div>
    <div class="">
      Para anular el expediente debes realizarlo
       bajo la seguridad del 2FA o Cód. de verificación
    </div>
    <div class="wrap-option">
      <vs-radio v-model="cancel.typeCancel" vs-value="twoFa">2FA (OTP)</vs-radio>
      <vs-radio
        v-model="cancel.typeCancel"
        vs-value="internCode"
      >
        Código de Verificación
      </vs-radio>
    </div>
    <div v-if="cancel.typeCancel === 'internCode'" class="wrap-form">
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <vs-button
            size="small"
            color="primary"
            type="border"
            v-on:click="getCode()"
          >
            Solicitar código
          </vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <vs-input
            oninput="javascript: if (this.value.length > this.maxLength)
              this.value = this.value.slice(0, this.maxLength);"
            maxlength = "8"
            label="Código de Verificación"
            v-model="cancel.code"
          />
        </vs-col>
      </vs-row>
    </div>
    <div v-if="cancel.typeCancel === 'twoFa'" class="wrap-form">
      <vs-input
        oninput="javascript: if (this.value.length > this.maxLength)
          this.value = this.value.slice(0, this.maxLength);"
        maxlength = "8"
        label="Código de Verificación"
        v-model="cancel.code"
      />
    </div>
    <div style="margin-top: 20px;text-align: center">
      <vs-button
        color="primary"
        type="border"
        v-on:click="cancelFile()"
      >
        Anular Expediente
      </vs-button>
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpCancelFile',
  props: {
    canceledFile: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      cancelModal: false,
      detailsFile: false,
      cancel: {
        typeCancel: 'internCode'
      }
    };
  },
  computed: {
    ...mapGetters('Usuario', [
      'verificationCode',
      'loading'
    ])
  },
  methods: {
    ...mapActions('Dnts', [
      'attemptCancelFile'
    ]),
    ...mapActions('Usuario', [
      'getVerificationCode'
    ]),
    cancelFile() {
      const cancel = {
        aprobacionId: this.canceledFile.solicitanteDocumentoId,
        ejecucionId: this.canceledFile.febosId
      };

      if (this.cancel.typeCancel === 'internCode') {
        cancel.codigo = this.cancel.code;
        cancel.idExterno = this.verificationCode;
      } else {
        cancel.otp = this.cancel.code;
      }
      this.attemptCancelFile(cancel);
      this.cancelModal = false;
    },
    getCode() {
      this.getVerificationCode(
        { motivo: `Verificación para anular expediente Nº: ${this.canceledFile.numero}` }
      );
    },
  }
};
</script>
<style scoped>

.wrap-option {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.wrap-form {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
