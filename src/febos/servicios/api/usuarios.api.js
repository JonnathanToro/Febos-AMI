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

export const getUsers = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE }?${ params}`, {
    operacionId: 'io.usuarios.listar'
  });
};

export const ioGetAuthCode = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/autenticadoble?${params}`, {
    operacionId: 'io.user.authCode'
  });
};

export const updatePassword = (passwords) => {
  const params = apiClient.queryParams({
    simular: 'no'
  });
  apiClient.put(`${RESOURCE}/login/recuperar?${params}`, passwords,
    { operacionId: 'io.usuario.update.password' });
};
