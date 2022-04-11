# Make the production build for the React client (part2/phonebook), and compile
# the Express server from TypeScript to JavaScript (part3/phonebook).
#
FROM node:17-alpine as build
COPY . /temp
WORKDIR /temp
RUN npm install --workspace part2/phonebook --workspace part3/phonebook
RUN npm run build --workspace part2/phonebook --workspace part3/phonebook

# Cherry-pick the build products from the previous stage and install only the
# production dependencies required by the Express server. At the end of this
# stage, everything needed for deployment is found in /phonebook.
#
FROM node:17-alpine as cherry-pick
WORKDIR /phonebook
COPY /part3/phonebook/package.json .
COPY --from=build /temp/part3/phonebook/dist ./lib
COPY --from=build /temp/part2/phonebook/dist ./static
RUN npm install --production
RUN rm -f package*.json

# Run the server in a super-slim Alpine container. Of course, Node.js needs to
# be installed, but what can you do. The resulting image should be close to
# ~70MB in size. Not bad, huh?!
#
FROM alpine:latest as serve
ENV NODE_ENV=production
RUN apk add --update nodejs
COPY --from=cherry-pick /phonebook /phonebook
EXPOSE 3001
CMD [ "node", "phonebook/lib/index.js" ]
