# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json
COPY package.json ./
# COPY .npmrc ./

# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .

RUN rm -rf storybook-static


# Build the application
RUN npm run build-storybook

# Expose the port the app runs on
ENV PORT=8080
EXPOSE 8080

# Command to start the application
CMD ["npm", "run", "start"]
