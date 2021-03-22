<template>
  <vs-popup :title="`Anular Expediente ${canceledFile.numero}`" :active.sync="showModal">
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
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';

export default {
  mixins: [FiltersDntMixin],
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
      cancel: {
        typeCancel: 'internCode'
      }
    };
  },
  computed: {
    ...mapGetters('Usuario', [
      'verificationCode',
      'loading'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'cancelFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Approvals', [
      'attemptCancelFile'
    ]),
    ...mapActions('Usuario', [
      'getVerificationCode'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    async cancelFile() {
      const cancel = {
        ejecucionId: this.canceledFile.febosId,
        aprobacionId: this.canceledFile.febosId
      };

      if (this.cancel.typeCancel === 'internCode') {
        cancel.codigo = this.cancel.code;
        cancel.idExterno = this.verificationCode;
      } else {
        cancel.otp = this.cancel.code;
      }
      await this.attemptCancelFile(cancel);
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
