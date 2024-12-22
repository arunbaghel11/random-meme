# Stage 1: Build the React app
FROM node:16-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the entire source code and build the app
COPY . .
RUN npm run build

# Stage 2: Production image with the built app
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only the build output from the builder stage
COPY --from=builder /app/build ./build

# Install a lightweight server to serve the build (serve)
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app with `serve` on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
