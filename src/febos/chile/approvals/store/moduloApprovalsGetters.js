export default {
  // TODO: test return the same reference and not a copy.
  files: (state) => Object.values(state.list || {}),
  loading: (state) => state.loading,
  error: (state) => state.error,
  successAction: (state) => state.successAction,
  pagination: (state) => state.pagination,
  trays: (state) => Object.values(state.list || {})
};
