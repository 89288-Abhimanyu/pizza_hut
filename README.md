# PizzaHut Monorepo (Backend + Frontend)

This repository is organized as a monorepo:
- `backend/` — Spring Boot (Java 17)
- `frontend/` — React + Redux + MUI

## Scripts
- Backend: `cd backend && ./mvnw spring-boot:run` (or `mvn spring-boot:run`)
- Frontend: `cd frontend && npm install && npm start`

## Environment
Copy `.env.example` to `.env` in both `backend/` and `frontend/`. Never commit real secrets.

## Branching
- `main` (protected): release-ready
- `develop`: integration branch
- `feature/<slug>-<owner>`: short-lived branches per feature

Follow Conventional Commits for messages.
