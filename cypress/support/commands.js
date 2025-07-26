/// <reference types='cypress' />

Cypress.Commands.add('addWorker', (
  firstname,
  lastname,
  email,
  age,
  salary,
  department
) => {
  cy.get('#firstName').type(firstname);

  cy.get('#lastName').type(lastname);

  cy.get('#userEmail').type(email);

  cy.get('#age').type(age);

  cy.get('#salary').type(salary);

  cy.get('#department').type(department);

  cy.get('#submit').click();
});

Cypress.Commands.add('checkSelectionOfWorkers', (currentCountOfWorkers) => {
  cy.get('[role="rowgroup"]')
    .filter((_, el) => Cypress.$(el).text().trim().length > 0)
    .should('have.length', currentCountOfWorkers);
});

Cypress.Commands.add('deleteAllWorkers', () => {
  function deleteNextWorker() {
    const deleteBtn = Cypress.$('[title="Delete"]').first();

    if (deleteBtn.length > 0) {
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.wrap(deleteBtn)
        .click()
        .then(() => {
          deleteNextWorker();
        });
    } else {
      cy.checkSelectionOfWorkers(0);
    }
  }

  deleteNextWorker();
});
