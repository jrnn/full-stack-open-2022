# Make the production build for the React client (part5/blogs), and compile the
# Express server from TypeScript to JavaScript (part4/blogs).
#
FROM node:18-alpine as build
COPY . /build
WORKDIR /build
RUN npm ci -w part4/blogs -w part5/blogs
RUN npm run build -w part4/blogs -w part5/blogs

# Cherry-pick the build products from the previous stage and install only the
# production dependencies required by the Express server. At the end of this
# stage, everything needed for deployment is found in /app.
#
FROM node:18-alpine as cherry-pick
WORKDIR /app
COPY /part4/blogs/package.json .
COPY --from=build /build/part4/blogs/dist/src ./server
COPY --from=build /build/part5/blogs/dist ./static
RUN npm install --production
RUN rm -f package*.json

# Run the server in a super-slim Alpine container. Of course, Node.js needs to
# be installed, but what can you do. The resulting image should be close to
# ~70MB in size. Not bad, huh?!
#
FROM alpine:latest as serve
ENV NODE_ENV=production
RUN apk add --update nodejs
COPY --from=cherry-pick /app /app
EXPOSE 3003
CMD [ "node", "app/server/index.js" ]
