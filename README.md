# Revisiting Full Stack Open in 2022

I've completed an earlier iteration of Full Stack Open [back in 2018](https://github.com/jrnn/HY-TKT21009).
Since then, the course scope looks to have doubled(?), and there have been various updates to the
original parts as well. I'm sure there's a lot that I could benefit from, so I'm seeing if I can
wrestle through the whole thing again in 2022.

To augment my learning, or just out of curiosity, I'm doing a few things differently from the
material:
- I'm using TypeScript throughout. Most likely I'm not using it to even a fraction of its full
  potential, but whatever.
- I'm using `npm workspaces` to avoid having to install the same dependencies over and again.
- Instead of using `create-react-app`, I'm trying to configure React apps from scratch with webpack.
  - I also gave [parcel](https://parceljs.org/) a try but didn't like it as much. I hit a wall when
    trying to set up API proxying on a package-to-package basis, but found no acceptable workaround
    and just gave up.
- I'm using Docker to facilitate the Heroku deployment in part 3.
- In part 4, I chose to use `mongodb-memory-server` in tests.
- The "anecdotes" exercises in part 7 provided a nice opportunity to try and mimic a mini Redux
  setup using React's own `useContext` and `useReducer`.
- In part 8, tried using [zustand](https://github.com/pmndrs/zustand) for client-side state
  management (instead of Redux).
- In part 11, I again used Docker to help with the Heroku deployment. I didn't bother figuring out
  how to deploy several Heroku apps from one repo at once, so I just overwrote the previous stuff ;)

Not all parts could reasonably be shoehorned into one monorepo. In separate repositories:
- [Part 10](https://github.com/jrnn/fso22-repo-rater)
- [Part 11](https://github.com/jrnn/full-stack-open-pokedex)

The phonebook app built in parts 2-3 can be found [here](https://fso-2022-phonebook.herokuapp.com/)

The blog app built in parts 4-5, and deployed later in part 11, can be found [here](https://fso-2022-blogs-galore.herokuapp.com/)
