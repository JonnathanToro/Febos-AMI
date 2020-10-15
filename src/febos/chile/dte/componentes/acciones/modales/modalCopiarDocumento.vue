<template>
  <form>
    <div class="vx-row w-1/2">
    <h4>Información del emisor</h4>
      <div class="vx-col w-full">
        <vs-input size="large" v-validate="'required|alpha'" placeholder="Your Name" name="name" v-model="name" class="mt-5 w-full" />
        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>
      </div>
      <h4>Infomación del documento</h4>
      <div class="vx-col w-1/2">
        <vs-input size="large" v-validate="'required|alpha_dash'" placeholder="Your Username" name="username" v-model="username" class="mt-5 w-full" />
        <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
      </div>

      <div class="vx-col w-1/2">
        <vs-input size="large" v-validate="'required|email'" placeholder="Your Email" name="email" v-model="email" class="mt-5 w-full" />
        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </div>

      <div class="vx-col w-1/2">
        <vs-input type="password" size="large" v-validate="'required|min:6|max:10'" ref="password" placeholder="Your Password" name="password" v-model="password" class="mt-5 w-full" />
        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
      </div>

      <div class="vx-col w-1/2">
        <vs-input type="password" size="large" v-validate="'required|min:6|max:10|confirmed:password'" data-vv-as="password" placeholder="Confirm Password" name="confirm_password" v-model="confirm_password" class="mt-5 w-full" />
        <span class="text-danger text-sm" v-show="errors.has('confirm_password')">{{ errors.first('confirm_password') }}</span>
      </div>
    </div>

    <vs-button type="filled" @click.prevent="submitForm" class="mt-5 block">Submit</vs-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    }
  },
  methods: {
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // if form have no errors
          alert("form submitted!");
        } else {
          // form have errors
        }
      })
    }
  },
}
</script>
