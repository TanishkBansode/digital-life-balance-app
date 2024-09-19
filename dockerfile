# Use the official Node.js 22.6.0 image as the base image
# FROM node:22.6.0
FROM node:22.6.0-alpine

# Set the working directory in the container
# WORKDIR /app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Step 3: Copy the source code
COPY ./src ./src

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
# CMD ["node", "server.js"]
CMD ["node", "src/server.js"]
