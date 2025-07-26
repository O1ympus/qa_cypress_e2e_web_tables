/// <reference types='cypress' />
import { faker } from '@faker-js/faker';

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const email = faker.internet.email();
  const age = faker.number.int({ min: 18, max: 100 });
  const salary = faker.number.int({ min: 500, max: 10000 });
  const department = faker.commerce.department();

  const anotherFirstName = faker.person.firstName();

  const currentCountOfWorkers = 3;

  it('should display three workers in a selection', () => {
    cy.checkSelectionOfWorkers(currentCountOfWorkers);
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

    cy.addWorker(
      firstname,
      lastname,
      email,
      age,
      salary,
      department
    );

    cy.checkSelectionOfWorkers(currentCountOfWorkers + 1);
  });

  it('should delete a worker', () => {
    cy.get('[role="rowgroup"]')
      .should('be.visible')
      .find('#delete-record-1')
      .click();

    cy.checkSelectionOfWorkers(currentCountOfWorkers - 1);
  });

  it('should delete all workers', () => {
    cy.deleteAllWorkers();
  });

  it('should find a worker in the search field and edit it.', () => {
    cy.get('#addNewRecordButton').click();

    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

    cy.addWorker(
      firstname,
      lastname,
      email,
      age,
      salary,
      department
    );

    cy.get('#searchBox').type(email);

    cy.checkSelectionOfWorkers(1);

    cy.get('[title="Edit"]').click();

    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

    cy.get('#firstName').clear();

    cy.get('#firstName').type(anotherFirstName);

    cy.get('#submit').click();

    cy.get('[role="rowgroup"]')
      .should('contain.text', anotherFirstName);
  });

  it('search should work with all column values.', () => {
    cy.get('#addNewRecordButton').click();

    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

    cy.addWorker(
      firstname,
      lastname,
      email,
      age,
      salary,
      department
    );

    cy.get('#searchBox').type(firstname);
    cy.checkSelectionOfWorkers(1);

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(lastname);
    cy.checkSelectionOfWorkers(1);

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(email);
    cy.checkSelectionOfWorkers(1);

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(age);
    cy.checkSelectionOfWorkers(1);

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(salary);
    cy.checkSelectionOfWorkers(1);

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(department);
    cy.checkSelectionOfWorkers(1);
  });
});
