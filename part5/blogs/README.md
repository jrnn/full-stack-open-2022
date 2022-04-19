## Blogs client

### Good to know

- In development mode, the client expects to find the server in http://localhost:3003
- The server app can be found in part4/blogs

### E2E testing with Cypress

First, have the client running in port 8080 ...

    $ npm start

... and the server __IN TEST MODE(!)__ in 3003:

    # part4/blogs
    $ npm run start:test

Then, run Cypress either in browser for the full visual experience ...

    $ npm run cypress

... or in terminal with less bells and whistles

    $ npm run test:e2e
