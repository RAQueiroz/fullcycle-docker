FROM node:lts-alpine

WORKDIR /usr/bin

RUN  wget https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && chmod +x wait-for

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

ENV PORT=3000

COPY src/ ./src

ENTRYPOINT ["node", "src/index.js"]

