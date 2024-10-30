# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN npm run build

# Serve the app on a lightweight server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port the app will run on
EXPOSE 3000

