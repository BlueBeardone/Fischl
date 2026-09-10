FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY services/bastions/package.json ./services/bastions/package.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY services/bastions/tsconfig.json ./services/bastions/tsconfig.json
COPY shared ./shared
COPY services/bastions/src ./services/bastions/src
RUN npm install --workspace services/bastions --include-workspace-root
RUN npm --workspace services/bastions run build
RUN npm prune --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
COPY services/bastions/package.json ./services/bastions/package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/services/bastions/dist ./services/bastions/dist
EXPOSE 3002
CMD ["node", "--max-old-space-size=128", "services/bastions/dist/services/bastions/src/server.js"]
