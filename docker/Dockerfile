FROM node:23-slim
WORKDIR  /usr/src/survey-node-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD ["npm start"]