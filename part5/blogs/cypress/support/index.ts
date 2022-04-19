/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(credentials: { username: string, password: string }): Chainable<Element>
    }
  }
}

Cypress.Commands.add("login", credentials => {
  cy.request("POST", "http://localhost:3003/api/login", credentials)
    .then(({ body }) => localStorage.setItem("FSO22_PART5_BLOGS_WEB_CLIENT_USER_AUTH", JSON.stringify(body)))
    .then(() => cy.visit("http://localhost:8080"))
})

export {}
