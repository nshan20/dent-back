FROM node:18.10.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG PORT=3000

COPY . .

RUN yarn install

EXPOSE $PORT

CMD [ "yarn", "start:prod" ]
