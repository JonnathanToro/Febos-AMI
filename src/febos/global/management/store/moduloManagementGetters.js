export default {
  element: (state) => state.selectedElement,
  configSheetByDoc: (state) => state.configSheet,
  allDocuments: (state) => Object.values(state.allDocuments || {}),
};
