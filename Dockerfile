# Multi-stage Dockerfile for NestJS app

# 1) Builder stage: install deps and build TS
FROM node:20-alpine AS builder
WORKDIR /app

# Install build tools (if needed for native deps)
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
# Use npm install to avoid failing when no lockfile exists
RUN npm install

COPY tsconfig*.json nest-cli.json ./
COPY src ./src
COPY eslint.config.mjs ./

RUN npm run build

# 2) Runtime stage: only production deps and built dist
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy build output from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Default envs (can be overridden)
ENV PORT=3000 \
    MONGODB_URI=mongodb://localhost:27017/universite \
    JWT_SECRET=dev_secret_key

CMD ["node", "dist/main.js"]
