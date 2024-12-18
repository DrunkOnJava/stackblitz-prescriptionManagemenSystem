describe('Dashboard Statistics', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'Password123!');
    cy.visit('/');
  });

  it('displays all required statistics', () => {
    cy.get('[data-cy="stats-panel"]').within(() => {
      // Check total patients
      cy.get('[data-cy="stat-total-patients"]')
        .should('exist')
        .and('not.be.empty');

      // Check active prescriptions
      cy.get('[data-cy="stat-active-prescriptions"]')
        .should('exist')
        .and('not.be.empty');

      // Check pending refills
      cy.get('[data-cy="stat-pending-refills"]')
        .should('exist')
        .and('not.be.empty');

      // Check monthly revenue
      cy.get('[data-cy="stat-monthly-revenue"]')
        .should('exist')
        .and('not.be.empty');
    });
  });

  it('updates statistics in real-time', () => {
    // Get initial values
    let initialPatients: string;
    cy.get('[data-cy="stat-total-patients"]')
      .invoke('text')
      .then((text) => {
        initialPatients = text;
      });

    // Create new patient
    cy.visit('/patients');
    cy.get('[data-cy="add-patient-button"]').click();
    cy.get('[data-cy="patient-form"]').within(() => {
      cy.get('input[name="name"]').type('New Test Patient');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('button[type="submit"]').click();
    });

    // Verify stats updated
    cy.visit('/');
    cy.get('[data-cy="stat-total-patients"]')
      .invoke('text')
      .should('not.eq', initialPatients);
  });

  it('displays correct status colors', () => {
    cy.get('[data-cy="stats-panel"]').within(() => {
      // Check warning status for pending refills
      cy.get('[data-cy="stat-pending-refills"]')
        .should('have.class', 'text-yellow-600');

      // Check success status for active prescriptions
      cy.get('[data-cy="stat-active-prescriptions"]')
        .should('have.class', 'text-green-600');
    });
  });

  it('navigates to relevant sections when clicking stats', () => {
    // Click patients stat
    cy.get('[data-cy="stat-total-patients"]').click();
    cy.url().should('include', '/patients');

    // Go back and click prescriptions stat
    cy.go('back');
    cy.get('[data-cy="stat-active-prescriptions"]').click();
    cy.url().should('include', '/prescriptions');
  });
});