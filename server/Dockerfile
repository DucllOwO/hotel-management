FROM node:16.17.1-alpine

WORKDIR /appBE

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1205
CMD ["node", "index.js"]
