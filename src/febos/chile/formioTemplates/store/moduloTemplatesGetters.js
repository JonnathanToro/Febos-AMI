export default {
  templatesList: (state) => {
    const templates = state.templates || {};
    return Object.values(templates);
  },
  loading: (state) => state.loading
};
