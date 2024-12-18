describe('Patient Details', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'Password123!');
    cy.visit('/patients/allison');
  });

  it('displays patient dashboard with correct information', () => {
    cy.get('[data-cy="patient-header"]').within(() => {
      cy.contains('Allison').should('be.visible');
      cy.get('[data-cy="patient-status"]').should('contain', 'Active');
    });

    cy.get('[data-cy="patient-stats"]').within(() => {
      cy.contains('Semaglutide').should('be.visible');
      cy.contains('0.25mg').should('be.visible');
      cy.contains('$200.00').should('be.visible');
    });
  });

  it('edits prescription details', () => {
    cy.get('[data-cy="edit-prescription"]').click();
    cy.get('[data-cy="prescription-form"]').within(() => {
      cy.get('select[name="tier"]').select('2');
      cy.get('input[name="price"]').clear().type('250.00');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Prescription updated successfully').should('be.visible');
    cy.get('[data-cy="patient-stats"]').should('contain', '$250.00');
  });

  it('updates patient contact information', () => {
    cy.get('[data-cy="edit-patient"]').click();
    cy.get('[data-cy="patient-form"]').within(() => {
      cy.get('input[name="phoneNumber"]').clear().type('555-123-4567');
      cy.get('input[name="email"]').clear().type('allison.new@example.com');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Patient information updated').should('be.visible');
    cy.contains('555-123-4567').should('be.visible');
  });

  it('displays prescription history', () => {
    cy.get('[data-cy="prescription-history"]').within(() => {
      cy.get('[data-cy="history-entry"]').should('have.length.at.least', 1);
      cy.contains('Last Fill Date').should('be.visible');
      cy.contains('Days Until Fill').should('be.visible');
    });
  });
});