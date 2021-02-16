FROM node:15
WORKDIR /build
COPY package.* ./
RUN npm install
COPY pages/ public/ ./
RUN npm run build+export

FROM lkwg82/h2o-http2-server:latest
WORKDIR /var/www/html
COPY --from=0 /build/out .
EXPOSE 8080