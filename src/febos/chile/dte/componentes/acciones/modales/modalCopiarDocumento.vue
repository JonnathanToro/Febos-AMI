<template>
  <form>
    <div class="vx-row">
    <h4></h4>
    </div>

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
