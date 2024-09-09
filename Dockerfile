# Stage 1: PostgreSQL Image
FROM postgres:15.2 AS postgres
ENV SERVICE_NAME=postgres
COPY init_db.sql /docker-entrypoint-initdb.d
EXPOSE 5432

# Stage 2: Node.js App
FROM node:alpine AS node
WORKDIR /app

# Copy all project files to /app directory
COPY ./backend /app

# Install dependencies
RUN npm install -g npm@latest
RUN npm install -g nodemon sequelize-cli && npm install

# Ensure the startup script is executable
RUN chmod +x /app/startup.sh

# Expose the port your application will run on
EXPOSE 3000

# Start the application
ENTRYPOINT ["/app/startup.sh"]
