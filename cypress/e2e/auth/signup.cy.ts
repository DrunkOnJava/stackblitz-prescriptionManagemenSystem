describe('Sign Up Flow', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('displays signup form with all required fields', () => {
    cy.get('input[name="fullName"]').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('input[name="confirmPassword"]').should('exist');
    cy.get('input[type="checkbox"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Sign Up');
  });

  it('shows validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('validates password requirements', () => {
    cy.get('input[type="password"]').type('weak');
    cy.get('button[type="submit"]').click();
    cy.contains('Password must be at least 8 characters').should('be.visible');
  });

  it('validates password confirmation match', () => {
    cy.get('input[type="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('DifferentPassword123!');
    cy.get('button[type="submit"]').click();
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('requires terms acceptance', () => {
    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.contains('You must accept the Terms of Service').should('be.visible');
  });

  it('successfully creates account with valid data', () => {
    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});