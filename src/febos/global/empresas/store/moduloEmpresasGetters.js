export const company = (state) => state.empresa;

// TODO: remove alias.
export const empresa = company;
// TODO: remove alias.
export const empresaActual = company;
// TODO: remove alias.
export const defaultEmpresa = company;

export const iut = (state) => state.empresa.iut;

export const companies = (state) => state.empresas;

export const usersCompany = (state) => (state.usersCompany || [])
  .sort(({ nombre: a }, { nombre: b }) => a.localeCompare(b));
export const groupsCompany = (state) => (state.groupsCompany || [])
  .sort(({ nombre: a }, { nombre: b }) => a.localeCompare(b));

export const configurations = (state) => state.configuratios;
export const isLoadingConfigurations = (state) => state.isLoadingConfigurations;
export const isSavingConfigurations = (state) => state.isSavingConfigurations;
