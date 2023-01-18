FROM node:16.13.0-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install
# RUN npm run build
# RUN npm run migration:run

# FROM node:16.13.0-alpine
# COPY --from=builder /app ./
COPY . .

RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "start:migrate:prod"]