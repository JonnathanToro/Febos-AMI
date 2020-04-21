const RutMixin = {
  created: function () {

  },
  methods: {
    formatear: function (rut) {
      var numero=rut.split('-')[0];
      var dv=rut.split('-')[1];
      var numeroFormateado=numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `${numeroFormateado}-${dv}`;
    }
  }
}

export default RutMixin
