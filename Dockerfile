# Use an official node runtime as a parent image
FROM node:latest

# Make a folder in our image where source code will live
# RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt
RUN mkdir -p /src/app

# Set the working directory to /app
WORKDIR /src/app

# Copy the current directory contents into the container at /app
COPY . /src/app

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait
# Install any needed packages specified in package.json
RUN npm install
RUN npm run react-dev
# RUN npm run seed

# Make port 3004 available to the world outside this container
EXPOSE 3004
EXPOSE 5432

# Run npm start when the container launches
CMD psql -h 172.17.0.2 -uroot -ppassword < ./server/db/schema.sql && \
npm run seed && \
npm run server_postgrse
