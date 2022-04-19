/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      createBlog(blog: { title: string, author: string, url: string}): Chainable<Element>
      login(credentials: { username: string, password: string }): Chainable<Element>
    }
  }
}

const userAuthKey = "FSO22_PART5_BLOGS_WEB_CLIENT_USER_AUTH"

Cypress.Commands.add("createBlog", blog => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: blog,
    headers: {
      authorization: `bearer ${JSON.parse(localStorage.getItem(userAuthKey)).token}`
    }
  })
})

Cypress.Commands.add("login", credentials => {
  cy.request({
    url: "http://localhost:3003/api/login",
    method: "POST",
    body: credentials
  })
    .then(({ body }) => localStorage.setItem(userAuthKey, JSON.stringify(body)))
    .then(() => cy.visit("http://localhost:8080"))
})

export {}
