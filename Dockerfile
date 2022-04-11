# Make the production build for the React client (part2/phonebook), and
# compile the Express server from TypeScript to JavaScript (part3/phonebook).
#
FROM node:17-alpine as build
COPY . /temp
WORKDIR /temp
RUN npm install --workspace part2/phonebook --workspace part3/phonebook
RUN npm run build --workspace part2/phonebook --workspace part3/phonebook

# Copy the products from the previous stage and run the server. The client
# is served as a static resource.
#
FROM node:17-alpine as serve
ENV NODE_ENV=production
WORKDIR /phonebook
COPY /part3/phonebook/package.json .
COPY --from=build /temp/part3/phonebook/dist ./lib
COPY --from=build /temp/part2/phonebook/dist ./static
RUN npm install --production
EXPOSE 3001
CMD [ "node", "lib/index.js" ]
