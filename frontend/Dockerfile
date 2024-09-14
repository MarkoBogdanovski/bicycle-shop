# Use an official Node.js runtime as the base image
FROM node:alpine AS build

# Set the working directory
WORKDIR /app

# Install Vite and create-react-app globally
RUN npm install -g create-react-app vite

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the application
FROM nginx:alpine

# Copy the build files from the build stage to the Nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
