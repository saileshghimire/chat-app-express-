FROM node:18

WORKDIR /app

COPY package.json ./
# COPY yarn.lock ./
# Install dependencies
RUN yarn install
COPY . .
EXPOSE 3000
RUN yarn prisma generate
CMD ["yarn", "dev"]
