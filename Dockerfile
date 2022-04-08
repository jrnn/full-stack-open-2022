# Make the production build for the React client (part2/phonebook).
# It will be copied to the server's static resources in a later stage.
#
FROM node:17-alpine as build-client
COPY tsconfig.json .
COPY /part2/phonebook /part2/phonebook
WORKDIR /part2/phonebook
RUN npm install
RUN npm run build

# Compile the server from TypeScript to JavaScript.
#
FROM node:17-alpine as compile-server
COPY tsconfig.json .
COPY /part3/phonebook /part3/phonebook
WORKDIR /part3/phonebook
RUN npm install
RUN npm run build

# Copy the products from the previous stages and run the server.
#
FROM node:17-alpine as run-server
ENV NODE_ENV=production
COPY /part3/phonebook/package.json /phonebook/
COPY --from=compile-server /part3/phonebook/dist /phonebook/lib
COPY --from=build-client /part2/phonebook/dist /phonebook/static
WORKDIR /phonebook
RUN npm install --production
EXPOSE 3001
CMD [ "node", "lib/index.js" ]
