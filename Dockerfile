FROM node:24-bookworm-slim AS builder

WORKDIR /app

# Copy package requirements
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install all dependencies (frontend + backend) using postinstall
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build --prefix frontend

# Build backend for node environment
RUN npm run build:docker --prefix backend

FROM node:24-bookworm-slim AS runner

WORKDIR /app

# We only need backend/node_modules since we're running the backend server which serves static frontend files.
COPY --from=builder --chown=node:node /app/backend/node_modules ./backend/node_modules

# Copy dist files
COPY --from=builder --chown=node:node /app/frontend/dist ./frontend/dist
COPY --from=builder --chown=node:node /app/backend/dist ./backend/dist
COPY --from=builder --chown=node:node /app/backend/schema.sql ./

ENV NODE_ENV=production
ENV PORT=3000

# Use non-root user
USER node

# Expose the default port
EXPOSE 3000

# Start the server
CMD ["node", "backend/dist/server.js"]