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
  .sort(({ nombre: a }, { nombre: b }) => a.localeCompare(b))
  .map((group) => ({
    ...group,
    isDivision: group.esDivision === 'Y',
    isOffice: group.esOficina === 'Y',
    isOpen: true
  }));

export const firstGroupsCompany = (state) => (state.groupsCompany || [])
  .filter((group) => !group.padreId)
  .map((group) => ({
    ...group,
    isDivision: group.esDivision === 'Y',
    isOffice: group.esOficina === 'Y',
    isOpen: true
  }));
export const pagination = (state) => state.pagination;
export const usersByGroup = (state) => state.usersGroup;
export const loading = (state) => state.loading;
