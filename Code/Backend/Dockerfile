FROM node:16.13.0-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "start:migrate:prod"]