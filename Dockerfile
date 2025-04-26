# Use Node.js 18 Alpine as base
FROM node:18-alpine

# Install system dependencies for canvas and node-gyp
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev

# Set Python path for node-gyp
ENV PYTHON=/usr/bin/python3

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/dist ./dist/

# Verify the files were copied correctly
RUN ls -la dist/

# Expose the app port
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/server.js"]
