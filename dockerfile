# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Install Git
RUN apt-get update && apt-get install -y git
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./ yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . .

EXPOSE 3000

# Specify the command to run on container startup
CMD ["npm", "run", "start"]