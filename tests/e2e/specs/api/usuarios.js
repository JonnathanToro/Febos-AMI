// /* eslint-disable import/no-extraneous-dependencies, global-require */
import funciones from '../../plugins/funciones';

describe('Login', () => {
  it('Credenciales incorrectas', () => {
    const requestL = funciones.baserequest('POST', '/usuarios/login?dominioPortal=portal.febos.cl');
    requestL.body = { correo: '', clave: '' };
    cy.log(`Solicitando ${requestL.url}`);
    cy.request(requestL).as('login');

    cy.get('@login').should((response) => {
      expect(response.body).to.have.property('codigo');
      expect(response.body.codigo).to.eq(1);
    });
  });

  it('Credenciales correctas', () => {

  });
});

describe('Permisos', () => {
  it('Listado Correcto', () => {
    const requestL = funciones.baserequest('GET', '/permisos/18331089-5?dominioPortal=portal.febos.cl', true);
    cy.log(`Solicitando ${requestL.url}`);
    cy.request(requestL).as('permisos');
    cy.get('@permisos').should((response) => {
      expect(response.body).to.have.property('codigo');
      expect(response.body.codigo).to.eq(10);
      expect(response.body).to.have.property('permisos');
      assert.isOk(!!response.body.permisos);
    });
  });
  it('Listado Error', () => {
    const requestL = funciones.baserequest('GET', '/permisos/18331089-5?dominioPortal=portal.febos.cl', false);
    cy.log(`Solicitando ${requestL.url}`);
    cy.request(requestL).as('permisos');
    cy.get('@permisos').should((response) => {
      expect(response.body).to.have.property('codigo');
      expect(response.body.codigo).to.not.eq(10);
    });
  });
});
