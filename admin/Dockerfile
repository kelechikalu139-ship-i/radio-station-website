# Admin/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./
COPY vite.config.* ./

# Install dependencies
RUN npm ci --include=dev && \
    npm install @rollup/rollup-linux-x64-gnu --no-save --force && \
    npm cache clean --force

# Copy source code
COPY . .

# Expose port 5174 (changed from 5173)
EXPOSE 5174

# Use development mode - BUT need to specify port
CMD ["npm", "run", "dev", "--", "--port", "5174", "--host"]