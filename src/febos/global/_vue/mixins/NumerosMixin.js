export default {
  methods: {
    formatearMonto(monto){
      return monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  }
}
