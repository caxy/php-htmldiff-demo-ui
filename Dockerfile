FROM node:14-slim AS builder

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN NODE_ENV=production node bin/compile

# ---- Production stage ----
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/config ./config
COPY --from=builder /app/server ./server
COPY --from=builder /app/bin ./bin

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["node", "bin/dev-server"]
