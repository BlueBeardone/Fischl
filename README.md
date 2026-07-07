# Fischl

Fischl is a TypeScript monorepo with two Express.js microservices backed by MongoDB and Mongoose.

## Services

- Identity service: user registration, login, profile management, and JWT auth
- Bastions service: bastion CRUD and owner-based listing

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the services:
   ```bash
   npm run dev:identity
   npm run dev:bastions
   ```

## Run with Docker Compose

```bash
docker compose up -d
```

The services will be available at:
- Identity: http://localhost:3001
- Bastions: http://localhost:3002
- MongoDB: mongodb://localhost:27017
