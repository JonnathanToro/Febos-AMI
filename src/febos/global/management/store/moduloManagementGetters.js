export default {
  element: (state) => state.selectedElement,
  successAction: (state) => state.successAction,
  configSheet: (state) => state.configSheet,
  allDocuments: (state) => Object.values(state.allDocuments || {})
};
