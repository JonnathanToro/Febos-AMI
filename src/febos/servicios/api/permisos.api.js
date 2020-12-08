import apiClient from '../clienteFebosAPI';

const RESOURCE = '/permisos';

export const ioUserPermissions = (iut) => (
  apiClient.get(`${RESOURCE}/${iut}`, { operacionId: 'io.usuario.permisos' })
);
