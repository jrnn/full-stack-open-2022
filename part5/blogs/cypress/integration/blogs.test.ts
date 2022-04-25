const cnorris = {
  username: "cnorris",
  name: "Chuck Norris",
  password: "trustno1"
}
const spongebob = {
  username: "spongebob",
  name: "Spengeblerb Squrupunts",
  password: "qwerty123"
}
const boatBlog = {
  title: "All About Boats",
  author: "Boaty McBoatface",
  url: "http://all.about.beaowts"
}
const coffeeBlog = {
  title: "All About Coffee",
  author: "Beany McBeanface",
  url: "http://all.about.kovfefe",
  likes: 1
}

describe("Blogs app", function() {
  beforeEach(function() {
    cy.request({
      url: "http://localhost:3003/api/testing/reset",
      method: "POST"
    })
    cy.createUser(spongebob)
    cy.visit("http://localhost:8080")
  })

  it("login form is displayed", function() {
    cy.get("#username-input").should("be.visible")
    cy.get("#password-input").should("be.visible")
    cy.get("#login-button").should("be.visible")
  })

  describe("logging in", function() {

    const { name, username, password } = spongebob

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
        .should("not.contain", `Logged in as ${name}`)
        .and("not.contain", "Please peruse blogs")

      cy.get("#username-input").should("be.visible")
      cy.get("#password-input").should("be.visible")
      cy.get("#login-button").should("be.visible")
    })
  })

  describe("when logged in", function() {
    beforeEach(function () {
      cy.login(spongebob).createBlog(coffeeBlog)
    })

    it("a blog can be created", function() {
      cy.contains("Click here to add new blog").click()
      cy.get("#title-input").type(boatBlog.title)
      cy.get("#author-input").type(boatBlog.author)
      cy.get("#url-input").type(boatBlog.url)
      cy.get("#createBlog-button").click()

      cy.get("#notification-info").should("contain", `Hooray! You just added a new blog "${boatBlog.title}"`)
      cy.get(".blog-entry").contains(boatBlog.title).click()
      cy.get("html")
        .should("contain", boatBlog.title)
        .should("contain", `Written by ${boatBlog.author}`)
        .should("contain", `Added by: ${spongebob.name}`)
    })

    it("a blog can be liked", function() {
      cy.get(".blog-entry").contains(coffeeBlog.title).click()
      cy.get("html").should("contain", "Likes: 1")
      cy.get("html").contains("Like!").click()
      cy.get("html").should("contain", "Likes: 2")
    })

    describe("deleting a blog", function() {
      it("succeeds when logged in as the blog's owner", function() {
        cy.get(".blog-entry").contains(coffeeBlog.title).click()
        cy.get("html").contains("Remove").click()
        cy.get("#notification-info").should("contain", "You just removed a blog. Uhh... Hooray...?")
        cy.get("html")
          .should("not.contain", coffeeBlog.title)
          .should("not.contain", coffeeBlog.author)
      })

      it("is not possible when logged in as someone else", function() {
        cy.createUser(cnorris).login(cnorris)
        cy.get(".blog-entry").contains(coffeeBlog.title).click()
        cy.get("html").should("not.contain", "Remove")
      })
    })

    it("blogs are sorted (desc) by number of likes", function() {
      cy.createBlog(boatBlog).visit("http://localhost:8080")
      cy.get(".blog-entry").then(entries => expect(entries).to.have.lengthOf(2))
      cy.get(".blog-entry:first").should("contain", coffeeBlog.title)
      cy.get(".blog-entry:last").should("contain", boatBlog.title)

      cy.get(".blog-entry").contains(boatBlog.title).click()
      cy.get("html").contains("Like!").click()
      cy.get("html").contains("Like!").click()

      cy.go("back")
      cy.get(".blog-entry:first").should("contain", boatBlog.title)
      cy.get(".blog-entry:last").should("contain", coffeeBlog.title)
    })
  })
})
