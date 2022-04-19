const user = {
  username: "spongebob",
  name: "Spengeblerb Squrupunts",
  password: "qwerty123"
}

describe("Blogs app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:8080")
  })

  it("login form is displayed", function() {
    cy.get("#username-input").should("be.visible")
    cy.get("#password-input").should("be.visible")
    cy.get("#login-button").should("be.visible")
  })

  describe("logging in", function() {
    it ("succeeds with correct credentials", function() {
      cy.get("#username-input").type("spongebob")
      cy.get("#password-input").type("qwerty123")
      cy.get("#login-button").click()

      cy.get("#notification-info").should("contain", "You are now logged in, welcome!")
      cy.get("html")
        .should("contain", "Logged in as Spengeblerb Squrupunts")
        .and("contain", "Please peruse blogs")

      cy.get("#username-input").should("not.exist")
      cy.get("#password-input").should("not.exist")
      cy.get("#login-button").should("not.exist")
    })

    it ("fails with wrong credentials", function() {
      cy.get("#username-input").type("spongebob")
      cy.get("#password-input").type("qwerty124")
      cy.get("#login-button").click()

      cy.get("#notification-error").should("contain", "Invalid username or password")
      cy.get("html")
        .should("not.contain", "Logged in as Spengeblerb Squrupunts")
        .and("not.contain", "Please peruse blogs")

      cy.get("#username-input").should("be.visible")
      cy.get("#password-input").should("be.visible")
      cy.get("#login-button").should("be.visible")
    })
  })
})
