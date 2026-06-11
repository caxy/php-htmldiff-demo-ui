FROM node:16 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN NODE_ENV=production node bin/compile

# ---- Production stage ----
FROM node:16-alpine

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
