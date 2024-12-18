import './commands';

beforeEach(() => {
  cy.intercept('POST', '/api/auth/login').as('login');
  cy.intercept('GET', '/api/patients*').as('getPatients');
  cy.intercept('GET', '/api/prescriptions*').as('getPrescriptions');
});

Cypress.on('uncaught:exception', (err) => {
  // Prevent Cypress from failing tests on uncaught exceptions
  if (err.message.includes('ResizeObserver loop')) {
    return false;
  }
});