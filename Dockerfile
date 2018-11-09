FROM bscc/docker-alpine-node:latest
MAINTAINER BSCC AppDev <appdev@bluesprucecapital.com>

# *** Import NPM Credentials ***
ARG NPM_TOKEN
COPY .npmrc         /svc/app

# *** COPY the Configuration Files ***
COPY Dockerfile     /svc/app
COPY package.json   /svc/app
COPY yarn.lock      /svc/app

# *** COPY TRANSPILED JAVASCRIPT FILES ***
COPY ./dist/src     /svc/app

# *** COPY Dummy Files needed for SAML - See code for more details ***
COPY config /svc/configs

# *** INSTALL Dependencies ***
RUN yarn install --production --frozen-lockfile

# *** REMOVE NPM Credentials ***
RUN rm -f /svc/app/.npmrc

# *** Get the Party Started ***
CMD ["npm", "start"]
