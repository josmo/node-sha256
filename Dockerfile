FROM node:10.2.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
EXPOSE 3000
CMD [ "npm", "start" ]