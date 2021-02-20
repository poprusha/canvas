FROM node:14-alpine as build

WORKDIR /var/www/

COPY package.json yarn.lock ./

RUN yarn

COPY .babelrc webpack.prod.config.ts *.json ./
COPY src src/
COPY public public/
COPY styles styles/

RUN yarn build-prod

FROM nginx:1.19-alpine

COPY docker/web/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/app

COPY --from=build /var/www/dist/ ./
