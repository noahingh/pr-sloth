FROM node:12.16.1-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install --silent

COPY . ./

ENTRYPOINT [ "yarn", "run" ] 
