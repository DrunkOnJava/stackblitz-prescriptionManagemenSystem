describe('Prescription Details', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'Password123!');
    cy.visit('/prescriptions');
  });

  it('displays medication comparison details', () => {
    cy.get('[data-cy="compare-medications"]').click();
    
    cy.get('[data-cy="comparison-table"]').within(() => {
      // Check Semaglutide details
      cy.contains('Semaglutide').should('be.visible');
      cy.contains('0.25mg').should('be.visible');
      cy.contains('$14.80').should('be.visible');

      // Check Tirzepatide details
      cy.contains('Tirzepatide').should('be.visible');
      cy.contains('2.5mg').should('be.visible');
      cy.contains('$78.00').should('be.visible');

      // Check Retatrutide details
      cy.contains('Retatrutide').should('be.visible');
      cy.contains('2mg').should('be.visible');
      cy.contains('$68.00').should('be.visible');
    });
  });

  it('creates prescription with calculated values', () => {
    cy.get('[data-cy="new-prescription"]').click();
    cy.get('[data-cy="prescription-form"]').within(() => {
      // Select medication and tier
      cy.get('select[name="medication"]').select('Semaglutide');
      cy.get('select[name="tier"]').select('1');

      // Verify auto-calculated values
      cy.get('[data-cy="weekly-dosage"]').should('contain', '0.25mg');
      cy.get('[data-cy="weekly-volume"]').should('contain', '0.1ml');
      cy.get('[data-cy="monthly-cost"]').should('contain', '$14.80');

      // Complete form
      cy.get('input[name="startDate"]').type('2024-03-01');
      cy.get('button[type="submit"]').click();
    });

    cy.contains('Prescription created successfully').should('be.visible');
  });

  it('handles prescription status changes', () => {
    cy.get('[data-cy="prescription-row"]').first().within(() => {
      cy.get('[data-cy="status-dropdown"]').click();
      cy.get('[data-cy="status-option-completed"]').click();
    });

    cy.contains('Status updated successfully').should('be.visible');
    cy.get('[data-cy="prescription-row"]').first()
      .should('contain', 'Completed');
  });

  it('validates refill dates', () => {
    cy.get('[data-cy="prescription-row"]').first()
      .find('[data-cy="edit-button"]').click();

    cy.get('[data-cy="prescription-form"]').within(() => {
      // Try to set invalid refill date
      cy.get('input[name="refillDate"]').type('2024-01-01');
      cy.get('button[type="submit"]').click();
      cy.contains('Refill date cannot be in the past').should('be.visible');

      // Set valid refill date
      cy.get('input[name="refillDate"]').clear().type('2024-12-31');
      cy.get('button[type="submit"]').click();
    });

    cy.contains('Prescription updated successfully').should('be.visible');
  });
});