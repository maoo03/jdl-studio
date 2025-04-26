FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy ALL files (except those in .dockerignore)
COPY . .

# Build the project
RUN npm run build

# Verify the build output
RUN ls -la dist/

EXPOSE 3000

# Update this to match your actual entry file
CMD ["node", "dist/server.js"]
