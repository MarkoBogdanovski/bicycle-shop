
# Use an official PostgreSQL image as the base image
FROM postgres:15.2 as postgres
ENV SERVICE_NAME=postgres
COPY init_db.sql /docker-entrypoint-initdb.d
EXPOSE 5432

# Use an official Node.js runtime as the base image
FROM node:alpine as node
COPY ./backend ./backend
WORKDIR /backend
COPY package*.json ./app
RUN npm install -g nodemon
# Copy the rest of the application code to the container
RUN npm install
# Expose the port your application will run on
EXPOSE 3000

RUN chmod +x startup.sh
# Start the application
ENTRYPOINT ["./startup.sh"]
