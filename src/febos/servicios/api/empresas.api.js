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
