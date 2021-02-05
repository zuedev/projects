FROM debian:bullseye as BUILD
WORKDIR /jekyll/
RUN apt-get update && \
    apt-get -y install ruby-full build-essential && \
    gem install jekyll bundler
COPY . .
RUN jekyll build

FROM httpd:2.4
WORKDIR /usr/local/apache2/htdocs/
COPY --from=BUILD /jekyll/_site/ .