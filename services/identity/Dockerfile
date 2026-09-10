FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY services/identity/package.json ./services/identity/package.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY services/identity/tsconfig.json ./services/identity/tsconfig.json
COPY services/identity/src ./services/identity/src
RUN npm install --workspace services/identity --include-workspace-root
RUN npm --workspace services/identity run build
RUN npm prune --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
COPY services/identity/package.json ./services/identity/package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/services/identity/dist ./services/identity/dist
EXPOSE 3001
CMD ["node", "--max-old-space-size=128", "services/identity/dist/server.js"]
