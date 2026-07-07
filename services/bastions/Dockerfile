FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY services/bastions/package.json ./services/bastions/package.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY services/bastions/tsconfig.json ./services/bastions/tsconfig.json
COPY services/bastions/src ./services/bastions/src
RUN npm install --workspace services/bastions --include-workspace-root
RUN npm --workspace services/bastions run build
EXPOSE 3002
CMD ["npm", "--workspace", "services/bastions", "run", "dev"]
