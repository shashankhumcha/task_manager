# Use the official Node.js image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the port that your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
