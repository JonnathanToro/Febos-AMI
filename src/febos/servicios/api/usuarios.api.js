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

export const ioUpdateUser = (params, user) => {
  const paramsRequest = apiClient.queryParams(params);
  return apiClient.put(`${RESOURCE}/${user.id}?${paramsRequest}`,
    user, { operacionId: 'io.update.user' });
};

export const ioCreateUser = (params, user) => {
  const paramsRequest = apiClient.queryParams(params);
  return apiClient.put(`${RESOURCE}?${paramsRequest}`,
    user, { operacionId: 'io.create.user' });
};

export const getUsers = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}?${params}`, {
    operacionId: 'io.usuarios.listar'
  });
};

export const ioGetAuthCode = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/autenticadoble?${params}`, {
    operacionId: 'io.user.authCode'
  });
};

export const ioGetFileCode = (identification) => apiClient.post(`${RESOURCE}/autenticadoble`,
  identification, {
    operacionId: 'io.user.FileCode'
  });

export const getSharedFile = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.get(`${RESOURCE}/autenticadoble/${payload.id}?${params}`, {
    operacionId: 'io.user.sharedFile'
  });
};

export const updatePassword = (passwords) => {
  const params = apiClient.queryParams({
    simular: 'no'
  });
  apiClient.put(`${RESOURCE}/login/recuperar?${params}`, passwords,
    { operacionId: 'io.usuario.update.password' });
};
