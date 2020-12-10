export default {
  dntFiles: (state) => {
    const files = state.dnts || {};
    return Object.values(files);
  },
  loading: (state) => state.cargando,
};
