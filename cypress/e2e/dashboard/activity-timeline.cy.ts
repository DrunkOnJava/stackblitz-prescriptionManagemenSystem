describe('Activity Timeline', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'Password123!');
    cy.visit('/');
  });

  it('displays recent activities', () => {
    cy.get('[data-cy="activity-timeline"]').within(() => {
      cy.get('[data-cy="activity-item"]').should('have.length.at.least', 1);
      cy.get('[data-cy="activity-timestamp"]').first().should('be.visible');
      cy.get('[data-cy="activity-description"]').first().should('be.visible');
    });
  });

  it('shows different activity types with correct icons', () => {
    cy.get('[data-cy="activity-timeline"]').within(() => {
      // Prescription activities
      cy.get('[data-cy="activity-icon-prescription"]').should('exist');
      
      // Patient activities
      cy.get('[data-cy="activity-icon-patient"]').should('exist');
      
      // Refill activities
      cy.get('[data-cy="activity-icon-refill"]').should('exist');
    });
  });

  it('navigates to related content when clicking activities', () => {
    // Click patient activity
    cy.get('[data-cy="activity-item"]')
      .contains('patient')
      .click();
    cy.url().should('include', '/patients/');

    // Go back and click prescription activity
    cy.go('back');
    cy.get('[data-cy="activity-item"]')
      .contains('prescription')
      .click();
    cy.url().should('include', '/prescriptions/');
  });

  it('loads more activities when scrolling', () => {
    const initialCount = Cypress.$('[data-cy="activity-item"]').length;
    
    cy.get('[data-cy="activity-timeline"]').scrollTo('bottom');
    cy.get('[data-cy="activity-item"]')
      .should('have.length.greaterThan', initialCount);
  });
});