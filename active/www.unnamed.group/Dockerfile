FROM node:15
WORKDIR /build
COPY package.* ./
RUN npm install
COPY pages/ pages/
COPY public/ public/
RUN ls ./
RUN npm run build
EXPOSE 3000
CMD npm run start