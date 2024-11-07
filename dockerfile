# Use an official Node.js image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Specify the port the app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
