## Blogs server

### Good to know

- Can be used together with the client in part5/blogs
- In development and production modes, requires an external MongoDB instance identified with an environment variable (see `.env.example`)
- In test mode, uses in-memory MongoDB instances spun up on demand with `mongodb-memory-server`

### Scripts

When developing locally, prefer using

    $ npm run dev

Run unit and integration tests with

    $ npm test

Compile and start a production build (includes linting and type checking) with

    $ npm start

Start the server in test mode e.g. for E2E purposes with

    $ npm start:test
