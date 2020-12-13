export default {
  dntByFiles: (state) => (
    Object.values(state.dnts || {}).filter((dnt) => dnt.tipo === 'APR')
  ),
  loading: (state) => state.loading
};
