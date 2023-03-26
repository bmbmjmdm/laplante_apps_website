# syntax=docker/dockerfile:1
   
FROM nginx:alpine
WORKDIR /
COPY . .
RUN apk add npm
RUN npm i
RUN npm run build
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html
EXPOSE 80
