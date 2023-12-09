FROM node:latest

WORKDIR /app

COPY package.json ./

RUN chown -R node:node /app

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 5000

CMD ["npm", "run", "server"]
