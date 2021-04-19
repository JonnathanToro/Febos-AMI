export const personalRepository = (state) => state.myRepository;
export const loading = (state) => state.loading;
export const personalRepositoryParent = (state) => (state.myRepository || [])
  .filter((repo) => !repo.padreId);
export const element = (state) => state.myRepository
  .find((elem) => elem.febosId === state.element);
export const elementChildren = (state) => state.myRepository
  .filter((node) => node.padreId === state.element);
