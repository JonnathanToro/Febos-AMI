export default {
  templatesList: (state) => {
    const templates = state.templates || {};
    return Object.values(templates);
  },
  loading: (state) => state.loading,
  template: (state) => state.template,
  schema: (state) => state.schema,
  schemaChanges: (state) => state.schemaChanges
};
