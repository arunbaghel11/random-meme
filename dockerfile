# Use an official Node.js image as the base for React
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files first for dependency caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Set environment variables if needed
ENV NODE_ENV=production

# Expose the port that the React app will run on
EXPOSE 3000

# Command to start the app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
