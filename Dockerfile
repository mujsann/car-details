FROM node:14-alpine as base 

WORKDIR /usr/app
COPY package*.json ./

RUN npm i
COPY . .

# FROM base as production
# ENV NODE_PATH=./dist
RUN npm run build 
# WORKDIR /dist


EXPOSE 5000
CMD node ./dist/app.js
# Copy all other source code to work directory
