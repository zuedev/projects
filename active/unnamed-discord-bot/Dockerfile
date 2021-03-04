FROM node:15
WORKDIR /usr/app
COPY package* ./
RUN npm i
COPY main.mjs .
CMD [ "node", "main.mjs" ]