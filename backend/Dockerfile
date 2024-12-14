FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
# Install dependencies
RUN yarn install

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]
