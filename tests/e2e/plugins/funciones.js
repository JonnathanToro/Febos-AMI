function baserequest(metodo, url, logueado = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (logueado) {
    headers.token = Cypress.env('token');
    headers.empresa = Cypress.env('empresa');
  }
  return {
    method: metodo,
    url: `${Cypress.env('api_server')}${url}`,
    headers
  };
}

export default {
  baserequest
};
