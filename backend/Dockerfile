# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy project files
COPY . .

# Expose backend port 2000
EXPOSE 2000

# Run the backend server
CMD ["node", "server.js"]
