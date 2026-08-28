FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY services/newspapers/package.json ./services/newspapers/package.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY services/newspapers/tsconfig.json ./services/newspapers/tsconfig.json
COPY services/newspapers/src ./services/newspapers/src
RUN npm install --workspace services/newspapers --include-workspace-root
RUN npm --workspace services/newspapers run build
EXPOSE 3003
CMD ["npm", "--workspace", "services/newspapers", "run", "dev"]
