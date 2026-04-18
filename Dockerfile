# syntax=docker/dockerfile:1

FROM oven/bun:1.3.10-alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1.3.10-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4173

# Keep runtime minimal: install only the static file server.
RUN bun add --exact sirv@3.0.2

COPY --from=build /app/dist ./dist
EXPOSE 4173
CMD ["bun", "run", "sirv", "dist", "--single", "--host", "0.0.0.0", "--port", "4173"]
