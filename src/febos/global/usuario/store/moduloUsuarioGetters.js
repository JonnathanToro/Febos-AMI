export const currentUser = (state) => state;
// TODO: remove alias.
export const usuarioActual = currentUser;

export const currentUserId = (state) => state.id;

export const currentUserAlias = (state) => state.alias;

export const isSessionAlive = (state) => {
  const now = new Date().getTime();

  if (!state || !state.vencimiento) {
    return false;
  }

  return now < state.vencimiento;
};

export const hasPermission = (state) => (code) => (
  !!state.permisos.find((permission) => permission.codigo === code)
);

export const userToken = (state) => state.token;
