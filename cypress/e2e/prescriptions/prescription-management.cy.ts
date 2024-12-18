describe('Prescription Management', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'Password123!');
    cy.visit('/prescriptions');
  });

  it('displays prescription list', () => {
    cy.get('[data-cy="prescription-list"]').should('exist');
    cy.get('[data-cy="prescription-row"]').should('have.length.at.least', 1);
  });

  it('creates a new prescription', () => {
    cy.get('[data-cy="new-prescription-button"]').click();
    cy.get('[data-cy="prescription-form"]').within(() => {
      cy.get('select[name="medication"]').select('Semaglutide');
      cy.get('select[name="tier"]').select('1');
      cy.get('input[name="price"]').type('200.00');
      cy.get('input[name="startDate"]').type('2024-03-01');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Prescription created successfully').should('be.visible');
  });

  it('edits prescription details', () => {
    cy.get('[data-cy="prescription-row"]').first().within(() => {
      cy.get('[data-cy="edit-button"]').click();
    });
    cy.get('[data-cy="prescription-form"]').within(() => {
      cy.get('select[name="tier"]').select('2');
      cy.get('input[name="price"]').clear().type('250.00');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Prescription updated successfully').should('be.visible');
  });

  it('compares medications', () => {
    cy.get('[data-cy="compare-medications-button"]').click();
    cy.get('[data-cy="medication-comparison"]').should('be.visible');
    cy.contains('Tirzepatide').should('be.visible');
    cy.contains('Retatrutide').should('be.visible');
    cy.contains('Semaglutide').should('be.visible');
  });

  it('filters prescriptions by status', () => {
    cy.get('[data-cy="status-filter"]').select('active');
    cy.get('[data-cy="prescription-row"]').should('have.length.at.least', 1);
    cy.get('[data-cy="status-badge"]').each(($badge) => {
      cy.wrap($badge).should('contain', 'Active');
    });
  });
});