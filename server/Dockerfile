# Server/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies (cached unless package.json changes)
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]