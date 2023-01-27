FROM node:14 as build

ENV PATH /node_modules/.bin:$PATH

WORKDIR /
COPY package.json /
COPY package-lock.json /
RUN npm i

COPY . /
RUN npm run build

FROM socialengine/nginx-spa:latest
EXPOSE 80
COPY --from=build ./dist /app

EXPOSE 80

RUN chmod -R 777 /app