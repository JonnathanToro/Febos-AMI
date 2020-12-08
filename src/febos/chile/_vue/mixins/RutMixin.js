export default {
  created() {

  },
  methods: {
    formatear(rut) {
      const base = rut.split('-')[0];
      const check = rut.split('-')[1];
      const formattedBase = base.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `${formattedBase}-${check}`;
    }
  }
};
