FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY services/random-events/package.json ./services/random-events/package.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY services/random-events/tsconfig.json ./services/random-events/tsconfig.json
COPY shared ./shared
COPY services/random-events/src ./services/random-events/src
RUN npm install --workspace services/random-events --include-workspace-root
RUN npm --workspace services/random-events run build
EXPOSE 3004
CMD ["npm", "--workspace", "services/random-events", "run", "dev"]
