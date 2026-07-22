# Install dependencies separately so Docker can reuse this layer when only
# application source files change.
FROM node:22-alpine AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

# Create the optimized production build.
FROM node:22-alpine AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Excluindo o env local
RUN rm -rf dotenv/.env.local 

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && yarn build

# Run only the built application.
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 4000

CMD ["yarn", "start", "-p", "4000"]
