FROM node:18.7.0-alpine AS development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 3000

CMD ["yarn", "start"]

