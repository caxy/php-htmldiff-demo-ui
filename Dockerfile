FROM node:14

WORKDIR /app

COPY package.json ./
RUN yarn install --ignore-engines --no-optional 2>&1; exit 0

COPY . .
RUN DEBUG=app:* NODE_ENV=production node bin/compile

# Production stage
FROM node:14-slim

WORKDIR /app

COPY --from=0 /app/dist ./dist
COPY --from=0 /app/node_modules ./node_modules
COPY --from=0 /app/package.json ./
COPY --from=0 /app/config ./config
COPY --from=0 /app/server ./server
COPY --from=0 /app/bin ./bin

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["node", "bin/dev-server"]
