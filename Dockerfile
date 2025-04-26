# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built files (from `npm run build`)
COPY dist/ ./dist/

# Expose the app port (e.g., 3000)
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/server.js"]  # Adjust based on your entry file
