# Shopping App Monorepo

This repository contains a full-stack Shopping application:
- `app-backend`: Node.js/Express REST API (MongoDB, JWT, Google OAuth, emails)
- `app-frontend`: React (Create React App) UI for customers and admin

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Passport/Google OAuth, Nodemailer
- Frontend: React (CRA), Redux/Redux-Saga, Axios

## Repository Structure
```
.
├── app-backend/
│   ├── index.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── strategy/
│   ├── README.md
│   └── env.example
├── app-frontend/
│   ├── src/
│   ├── public/
│   ├── README.md
│   └── env.example
└── README.md
```

## Quick Start (npm)

1) Backend
```
cd app-backend
cp env.example .env   # update values
npm ci
npm run server        # dev with nodemon
```

2) Frontend
```
cd app-frontend
cp env.example .env   # update REACT_APP_BASE_URL
npm ci
npm start
```

3) Start both together (from `app-backend`, uses concurrently):
```
cd app-backend
npm run dev
```

## Deployment
- Frontend (Vercel & Docker): see `app-frontend/README.md`
- Backend (Vercel & Docker): see `app-backend/README.md`

## Documentation
- Backend docs: `app-backend/README.md`
- Frontend docs: `app-frontend/README.md`

Note: Use npm for all commands. If `yarn.lock` exists, you can ignore it and rely on `package-lock.json`.


