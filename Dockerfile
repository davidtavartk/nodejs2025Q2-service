# Development stage
FROM node:22.14.0-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]

# Build stage
FROM node:22.14.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage - using distroless would be smaller but alpine is good
FROM node:22.14.0-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

WORKDIR /usr/src/app

# Copy package.json for production install
COPY package*.json ./

# Install only production dependencies and clean up
RUN npm ci --only=production --no-optional && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/cache/apk/* ~/.npm

# Copy built application
COPY --from=builder /usr/src/app/dist ./dist

# Change ownership
RUN chown -R nestjs:nodejs /usr/src/app

USER nestjs

EXPOSE 4000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]