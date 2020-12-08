import apiClient from '../clienteFebosAPI';

const RESOURCE = '/usuarios';

export const ioUserLogin = (email, password) => (
  apiClient.post(
    `${RESOURCE}/login`,
    {
      correo: email,
      clave: password
    },
    { operacionId: 'io.usuario.login' }
  )
);

export const ioUserHeartbeat = (userId) => (
  apiClient.head(
    `${RESOURCE}/${userId}`,
    { operacionId: 'io.usuario.latido' }
  )
);

export const isUserUpdate = (id, iut, name, alias, email) => (
  apiClient.post(
    `${RESOURCE}/${id}`,
    {
      id,
      iut,
      alias,
      nombre: name,
      correo: email
    },
    { operacionId: 'io.usuario.actualizar' }
  )
);
