# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Install Git
RUN apk --no-cache add git
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./ yarn.lock ./

# Install project dependencies
RUN yarn install
RUN npm i react-dev-utils

# Copy the entire project to the working directory
COPY . .

EXPOSE 3000

# Specify the command to run on container startup
CMD ["npm", "run", "start"]