export default {
  element: (state) => state.selectedElement,
  configSheet: (state) => state.configSheet,
  allDocuments: (state) => Object.values(state.allDocuments || {})
};
