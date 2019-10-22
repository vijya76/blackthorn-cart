FROM node:10.15-alpine

RUN apk update
RUN apk add --no-cache make bash postgresql-client

# set our node environment, either development or production
# defaults to development, compose overrides this on build and run
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# set DEBIAN_FRONTEND to noninteractive.
ENV DEBIAN_FRONTEND noninteractive
ARG NODE_PACKAGE_REGISTRY
ARG NODE_TLS_REJECT_UNAUTHORIZED
ENV NODE_TLS_REJECT_UNAUTHORIZED=${NODE_TLS_REJECT_UNAUTHORIZED}

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt

COPY package.json Makefile ./
RUN npm install --unsafe-perm --no-package-lock

# copy in our source code last, as it changes the most
COPY . /opt

RUN make build
EXPOSE 8080 9229

CMD make dev_server
