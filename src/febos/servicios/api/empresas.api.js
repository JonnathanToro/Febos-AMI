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

  return apiClient.get(`${RESOURCE}/${payload.empresaId}/grupos/${payload.groupId}?${params}`, {
    operacionId: 'io.empresas.usuariosBygroup'
  });
};
