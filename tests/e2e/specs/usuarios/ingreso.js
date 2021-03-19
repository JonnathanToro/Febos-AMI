// https://docs.cypress.io/api/introduction/api.html

describe('Ingreso', () => {
  it('Credenciales incorrectas', () => {
    cy.visit('/ingreso');
    cy.get('input[name=correo]').type('prueba');
    cy.get('input[name=clave]').type('prueba');
    cy.get('.btn-ingresar').click();
    // cy.contains('.vs-dialog-text', ' Usuario y/o contraseña incorrectos',{timeout:10000})
    // cy.contains('div.vs-dialog > footer > button > span.vs-button-text.vs-button--text','Ok')
    cy.get('.vs-dialog-text').should('contain', 'Usuario y/o contraseña incorrectos');
    cy.get('div.vs-dialog > footer > button > span.vs-button-text.vs-button--text').should('contain', 'Ok');
  });

  it('Credenciales correctas', () => {
    cy.visit('/ingreso');
    cy.get('input[name=correo]').type('sysadmin@febos.io');
    cy.get('input[name=clave]').type('ia$olution$**');
    cy.get('.btn-ingresar').click();
    // cy.contains('.vs-dialog-text', ' Usuario y/o contraseña incorrectos',{timeout:10000})
    // cy.contains('div.vs-dialog > footer > button > span.vs-button-text.vs-button--text','Ok')
    // cy.get('.vs-dialog-text').should('contain','Usuario y/o contraseña incorrectos')
    // cy.get('div.vs-dialog > footer > button > span.vs-button-text.vs-button--text').should('contain','Ok')
  });
});
