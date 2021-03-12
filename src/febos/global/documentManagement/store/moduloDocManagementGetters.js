export const personalRepository = (state) => state.myRepository;
export const loading = (state) => state.loading;
export const personalRepositoryParent = (state) => (state.myRepository || [])
  .filter((repo) => !repo.padreId);
export const element = (state) => state.element;
