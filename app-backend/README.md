# Backend (app-backend)

## Description

Node.js/Express REST API for the Shopping app. It provides:
- Authentication with JWT and Google OAuth
- Product and category management
- Orders and cart operations
- Email flows for verification and password reset

### Environment Variables

Create a `.env` file in the `app-backend` directory with:

- `PORT`: Port for the Express server (default `3002`).
- `MONGODB_URL`: MongoDB connection string.
- `TOKEN_SECRET`: JWT signing secret.
- `GOOGLE_CLIENT_ID`: Google OAuth Client ID.
- `SMPT_USERNAME`: SMTP username for email (note: key is `SMPT_*` as used in code).
- `SMPT_PASSWORD`: SMTP password for email.
- `APP_URL`: Public app URL used in email links (e.g., `http://localhost:3000`).

## Setup (npm)

Prerequisites:
- Node.js 18+ and npm
- MongoDB running locally or accessible remotely

Install dependencies:
```
npm ci
```
or
```
npm install
```

Run in development (with nodemon):
```
npm run server
```

Run in production:
```
npm start
```

Start both backend and frontend together (from `app-backend`, uses concurrently):
```
npm run dev
```

## Deployment

### Vercel (Serverless Node)

1) Add a `vercel.json` to configure a serverless function entrypoint. Example:
```json
{
  "functions": { "api/index.js": { "runtime": "nodejs18.x" } },
  "routes": [{ "src": "/(.*)", "dest": "/api/index.js" }]
}
```
2) Expose your Express app as a serverless handler in `api/index.js` (import your existing app or create a minimal one).
3) Set the environment variables in Vercel Project Settings.
4) Deploy:
```
npx vercel --prod
```

Notes:
- Serverless environments keep connections short-lived; consider using a managed MongoDB (e.g., Atlas) and ensure the connection logic is optimized for serverless.

### Docker

Create `app-backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3002
CMD ["node", "index.js"]
```

Build and run:
```
docker build -t shopping-backend ./app-backend
# Provide a real .env file instead of the example when running
docker run --env-file ./app-backend/env.example -p 3002:3002 shopping-backend
```


