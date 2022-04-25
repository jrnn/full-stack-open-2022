/// <reference types="cypress" />

interface Blog {
  title: string
  author: string
  url: string
  likes?: number
}
interface User {
  name: string
  username: string
  password: string
}

declare global {
  namespace Cypress {
    interface Chainable {
      createBlog(blog: Blog): Chainable<Element>
      createUser(user: User): Chainable<Element>
      login(credentials: User): Chainable<Element>
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

Cypress.Commands.add("createUser", user => {
  cy.request({
    url: "http://localhost:3003/api/users",
    method: "POST",
    body: user
  })
})

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request({
    url: "http://localhost:3003/api/login",
    method: "POST",
    body: { username, password }
  })
    .then(({ body }) => localStorage.setItem(userAuthKey, JSON.stringify(body)))
    .then(() => cy.visit("http://localhost:8080"))
})

export {}
