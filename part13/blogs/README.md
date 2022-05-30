## Part 13

This could just as well have been an independent repository, but I stubbornly stick to my monorepo
fetish. Heroku is a headache because it's not built for situations such as this, and the project
root is already occupied by another Heroku deployment. As a workaround, this subdirectory can be
split off and deployed in isolation:

    $ git subtree push --prefix part13/blogs heroku master

Or, after diverging from the remote (e.g. due to an interactive rebase):

    $ git push --force heroku `git subtree split --prefix part13/blogs -b temp`:master
    $ git branch -D temp

Because Heroku will only be aware of this subdirectory, we can't leverage any shared resources from
elsewhere in the repo. Hence e.g. `tsconfig.json` has to contain all relevant options, instead of
extending the configuration from root.
