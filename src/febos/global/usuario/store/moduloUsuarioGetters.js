export const currentUser = (state) => state;
// TODO: remove alias.
export const usuarioActual = currentUser;

export const currentUserId = (state) => state.id;

export const currentUserAlias = (state) => state.alias;

export const isSessionAlive = (state) => {
  if (!state || !state.vencimiento || !state.token) {
    return false;
  }
  const now = new Date().getTime();
  return now < state.vencimiento;
};

export const isLogged = (state) => !!state.id;

export const hasPermission = (state) => (code) => code === '*' || state.permisos.includes(code);

export const userPermissions = (state) => state.permisos;

export const userToken = (state) => state.token;
export const verificationCode = (state) => state.verificationCode;
export const successAction = (state) => state.successAction;
export const loading = (state) => state.loading;
