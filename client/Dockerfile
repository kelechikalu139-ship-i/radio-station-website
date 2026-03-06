# # Use node:20-alpine – compatible with Vite / rolldown-vite
# # (node:22-alpine sometimes has issues in certain Docker/virtualized envs)
# FROM node:20-alpine

# # Set working directory inside the container
# WORKDIR /app

# # Copy package files first for better caching
# COPY package*.json ./
# COPY vite.config.* ./

# # Install dependencies (npm is used in your project)
# # We use npm ci for clean install in Docker (faster & more reproducible)
# RUN npm ci

# # Copy the rest of your source code
# COPY . .

# # Expose the Vite dev server port
# EXPOSE 5173

# # Start the dev server
# # Uses your exact script: "dev": "vite"
# CMD ["npm", "run", "dev"]

# # Optional: if you ever want production build instead:
# # RUN npm run build
# # CMD ["npm", "run", "preview"]



# FROM node:20

# WORKDIR /app

# COPY package*.json ./
# COPY vite.config.* ./

# RUN npm ci --include=dev

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"]


FROM node:20

WORKDIR /app

# Install dependencies needed for native bindings (less common on slim/alpine)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY vite.config.* ./

# Install project deps
RUN npm ci --include=dev

# Force install the Rollup native binding that keeps failing
RUN npm install @rollup/rollup-linux-x64-gnu --no-save

COPY . .

EXPOSE 5174   
# change to 3000 for admin if needed

CMD ["npm", "run", "dev"]