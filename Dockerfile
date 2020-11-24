# Use node v12.19.1 as base image
FROM node:12.19.1

# Set the current working directory to "/app"
WORKDIR /app

# Copy the base npm files to the container
COPY package.json .
COPY package-lock.json .

# Install all dependencies
RUN npm install

# Copy the rest of the directory
COPY . .

# Build all assets
RUN npm run build

# Set the entrypoint
ENTRYPOINT ["node", "server/index.js"]

# Document that port 3000 will be opened
EXPOSE 3000
