# Client/Dockerfile & Admin/Dockerfile
FROM node:20-alpine  
# Switch to alpine for smaller size

# Install system dependencies if absolutely needed (most Node packages don't need build-essential)
# If you really need build tools, uncomment this:
# RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files first - this layer caches perfectly
COPY package*.json ./
COPY vite.config.* ./

# Install dependencies with clean cache
RUN npm ci --include=dev && \
    # Pre-install rollup binding to avoid runtime install
    npm install @rollup/rollup-linux-x64-gnu --no-save --force && \
    # Clean npm cache to reduce image size
    npm cache clean --force

# Copy source code last (changes most frequently)
COPY . .

# Expose port
EXPOSE 5173

# Use development mode
CMD ["npm", "run", "dev"]