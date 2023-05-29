FROM node:18-alpine as builder

RUN apk update && apk add git openssh
RUN mkdir /root/.ssh/
RUN ssh-keyscan -t rsa github.com > ~/.ssh/known_hosts

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-concurrency 1 --ignore-scripts
COPY . ./
RUN yarn build 

EXPOSE 5000
CMD ["yarn", "start:prod"]

