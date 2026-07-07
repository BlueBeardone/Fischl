FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY services/identity/package.json ./services/identity/package.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY services/identity/tsconfig.json ./services/identity/tsconfig.json
COPY services/identity/src ./services/identity/src
RUN npm install --workspace services/identity --include-workspace-root
RUN npm --workspace services/identity run build
EXPOSE 3001
CMD ["npm", "--workspace", "services/identity", "run", "dev"]
