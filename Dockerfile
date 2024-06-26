FROM node:18.10.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG PORT=3000

COPY . .

RUN npm install
RUN npm run build

EXPOSE $PORT

CMD [ "npm","run", "start:prod" ]
