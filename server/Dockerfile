# Base image: lightweight Alpine variant for smaller size
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first → excellent caching for npm install
COPY package*.json ./

# Install dependencies (including devDependencies like nodemon)
RUN npm ci

# Copy the rest of your backend code
COPY . .

# Expose the port your Express server uses
# → Change this to match what server.js listens on (e.g. 3000, 4000, 5000)
EXPOSE 4000

# For development: use your exact "dev" script → nodemon will watch & restart
CMD ["npm", "run", "dev"]

# For production later (after testing dev mode):
# CMD ["npm", "start"]