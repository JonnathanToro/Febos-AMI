import apiClient from '../clienteFebosAPI';

const RESOURCE = '/empresas';

export const ioCompanyList = (pages, rows, simpleSearch, scope, domain) => (
  apiClient.get(RESOURCE, {
    operacionId: 'io.empresas.listar',
    _headers: {
      dominioPortal: domain
    }
  })
);

export const ioCompanyGroups = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.empresaId}/grupos?${params}`, {
    operacionId: 'io.empresas.grupos'
  });
};

export const getUsersByGroup = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/${payload.empresaId}/grupos/${payload.groupId}/usuarios?${params}`, {
    operacionId: 'io.empresas.usuariosBygroup'
  });
};

export const ioCompanyUpdateGroup = (empresaId, group) => {
  const params = apiClient.queryParams(group);
  console.log('API', empresaId, group);
  return apiClient.put(`${RESOURCE}/${empresaId}/grupos/${group.id}?${params}`,
    group, { operacionId: 'io.empresas.update.group' });
};

export const ioCompanyCreateGroup = (empresaId, group) => {
  const params = apiClient.queryParams(group);
  return apiClient.post(`${RESOURCE}/${empresaId}/grupos?${params}`,
    group, { operacionId: 'io.empresas.create.group' });
};
