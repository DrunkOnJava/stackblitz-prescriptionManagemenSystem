describe('Patient Management', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'Password123!');
    cy.visit('/patients');
  });

  it('displays patient list', () => {
    cy.get('[data-cy="patient-list"]').should('exist');
    cy.get('[data-cy="patient-card"]').should('have.length.at.least', 1);
  });

  it('searches for patients', () => {
    cy.get('[data-cy="patient-search"]').type('John');
    cy.get('[data-cy="patient-card"]').should('have.length', 1);
    cy.contains('John Doe').should('be.visible');
  });

  it('adds a new patient', () => {
    cy.get('[data-cy="add-patient-button"]').click();
    cy.get('[data-cy="patient-form"]').within(() => {
      cy.get('input[name="name"]').type('New Patient');
      cy.get('input[name="email"]').type('new@example.com');
      cy.get('input[name="phoneNumber"]').type('123-456-7890');
      cy.get('input[name="dateOfBirth"]').type('1990-01-01');
      cy.get('textarea[name="address"]').type('123 Test St');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('New Patient').should('be.visible');
  });

  it('edits patient information', () => {
    cy.get('[data-cy="patient-card"]').first().within(() => {
      cy.get('[data-cy="edit-button"]').click();
    });
    cy.get('[data-cy="patient-form"]').within(() => {
      cy.get('input[name="name"]').clear().type('Updated Name');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Updated Name').should('be.visible');
  });

  it('deletes a patient', () => {
    cy.get('[data-cy="patient-card"]').first().within(() => {
      cy.get('[data-cy="delete-button"]').click();
    });
    cy.get('[data-cy="confirm-delete"]').click();
    cy.contains('Patient deleted successfully').should('be.visible');
  });

  it('navigates to patient dashboard', () => {
    cy.get('[data-cy="patient-card"]').first().click();
    cy.url().should('include', '/patients/');
    cy.get('[data-cy="patient-dashboard"]').should('exist');
  });
});