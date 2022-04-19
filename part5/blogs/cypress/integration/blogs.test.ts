const user = {
  username: "spongebob",
  name: "Spengeblerb Squrupunts",
  password: "qwerty123"
}
const coffeeBlog = {
  title: "All About Coffee",
  author: "Beany McBeanface",
  url: "http://all.about.kovfefe"
}

describe("Blogs app", function() {

  const { name, username, password } = user

  beforeEach(function() {
    cy.request({
      url: "http://localhost:3003/api/testing/reset",
      method: "POST"
    })
    cy.request({
      url: "http://localhost:3003/api/users",
      method: "POST",
      body: user
    })
    cy.visit("http://localhost:8080")
  })

  it("login form is displayed", function() {
    cy.get("#username-input").should("be.visible")
    cy.get("#password-input").should("be.visible")
    cy.get("#login-button").should("be.visible")
  })

  describe("logging in", function() {
    it ("succeeds with correct credentials", function() {
      cy.get("#username-input").type(username)
      cy.get("#password-input").type(password)
      cy.get("#login-button").click()

      cy.get("#notification-info").should("contain", "You are now logged in, welcome!")
      cy.get("html")
        .should("contain", `Logged in as ${name}`)
        .and("contain", "Please peruse blogs")

      cy.get("#username-input").should("not.exist")
      cy.get("#password-input").should("not.exist")
      cy.get("#login-button").should("not.exist")
    })

    it ("fails with wrong credentials", function() {
      cy.get("#username-input").type(username)
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

  describe("when logged in", function() {
    beforeEach(function () {
      cy.login({ username, password })
      cy.createBlog(coffeeBlog)
    })

    it("a blog can be created", function() {
      cy.contains("Click here to add new blog").click()
      cy.get("#title-input").type("All About Boats")
      cy.get("#author-input").type("Boaty McBoatface")
      cy.get("#url-input").type("http://all.about.beaowts")
      cy.get("#createBlog-button").click()

      cy.get("#notification-info").should("contain", "You just added a new blog 'All About Boats', hooray!")
      cy.contains("Boaty McBoatface: \"All About Boats\"")
        .parent()
        .as("newBlog")
        .find("button")
        .should("contain", "Show details")
        .click()

      cy.get("@newBlog").should("contain", `Added by: ${name}`)

      cy.get("#title-input").should("not.be.visible")
      cy.get("#author-input").should("not.be.visible")
      cy.get("#url-input").should("not.be.visible")
      cy.get("#createBlog-button").should("not.be.visible")
    })

    it("a blog can be liked", function() {
      cy.contains(`${coffeeBlog.author}: "${coffeeBlog.title}"`)
        .parent()
        .as("existingBlog")
        .contains("Show details")
        .click()

      cy.get("@existingBlog").should("contain", "Likes: 0")
      cy.get("@existingBlog")
        .contains("Like!")
        .click()

      cy.get("@existingBlog").should("contain", "Likes: 1")
    })
  })
})