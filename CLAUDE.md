# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a prediction market study application called "NUSC Prediction Market Study" consisting of a React frontend and Express.js backend. The system allows participants to make predictions on climate and entertainment topics for research purposes.

## Development Commands

### Backend (Express.js + TypeScript + Prisma)
```bash
cd backend

# Setup and Environment
yarn setup                    # Copy .env.template to .env and install dependencies
yarn check:env               # Verify .env file exists

# Development
yarn dev                      # Start development server with auto-reload
yarn build                   # Build for production (includes Prisma generate)
yarn serve                   # Serve production build

# Database Operations
yarn dock:up                 # Start PostgreSQL database in Docker
yarn dock:down               # Stop Docker database
yarn migrate                 # Format schema, generate client, run migrations
yarn prisma:studio           # Open Prisma Studio database GUI

# Database Seeding
bash seed.sh http://localhost:3000 <username> <password>  # Seed database with test data

# Code Quality
yarn format                  # Format code with Prettier and Prisma format

# Docker Operations
yarn dock:build              # Build Docker image
yarn dock:push:production    # Push to production ECR
yarn dock:push:staging       # Push to staging ECR
yarn dock:push:pilot         # Push to pilot ECR
```

### Frontend (React + TypeScript + Vite)
```bash
cd frontend

# Setup
yarn set version 1.22.19     # Set correct yarn version
yarn                          # Install dependencies
cp .env.example .env          # Copy environment template

# Development
yarn dev                      # Start Vite development server
yarn build                   # Build for production (TypeScript + Vite)
yarn preview                  # Preview production build

# Code Quality
yarn lint                     # Run ESLint
yarn format                  # Format code with Prettier
```

## Architecture

### Backend Architecture

**Tech Stack**: Express.js, TypeScript, Prisma ORM, PostgreSQL, Docker
**Authentication**: Cookie-based sessions with signed cookies
**Database**: PostgreSQL with Prisma ORM and migrations

**Key Structure**:
- `src/index.ts`: Main application entry point
- `src/routes/`: Route definitions with public/protected separation
- `src/controllers/`: Business logic controllers (Auth, Markets, Surveys, Users, Admin)
- `src/middleware/`: Authentication and validation middleware
- `src/services/`: Database and logging services
- `prisma/schema.prisma`: Database schema definition

**Database Models**:
- `User`: Base user authentication and admin flags
- `Participant`: Study participants with balance tracking
- `Market`: Prediction markets with climate/entertainment topics
- `Bet`: User predictions with outcome tracking
- `Survey`: Pre/post study surveys with Qualtrics integration
- `SurveyResponse`: Participant survey completion tracking

**Authentication Flow**:
- Cookie-based sessions with expiry
- `requireAuth` middleware for protected routes
- `requireAdmin` middleware for admin-only endpoints
- Frontend automatically redirects on 401 responses

### Frontend Architecture

**Tech Stack**: React 18, TypeScript, Vite, Material-UI, React Router, Axios
**Styling**: Tailwind CSS + Material-UI components
**State Management**: React hooks and context

**Key Structure**:
- `src/App.tsx`: Main routing and global event handling
- `src/pages/`: Page components (Dashboard, Login, Question, Admin, Reset)
- `src/components/`: Reusable UI components organized by type
- `src/api/`: Axios configuration with interceptors
- `src/types/`: TypeScript type definitions
- `src/storage/`: Question bank JSON files

**API Integration**:
- Centralized Axios instance with automatic cookie handling
- Global 401 interceptor for authentication failures
- Environment-based backend URL configuration

## Key Patterns

### Database Seeding
The project includes comprehensive seeding scripts that create:
- 200 control group participants (entertainment markets)
- 600 experiment group participants (climate markets)
- 60 markets total (30 control + 30 experiment)
- Pre/post study surveys with Qualtrics integration

### Environment Configuration
Both frontend and backend use `.env.template` files that should be copied to `.env`:
- Backend: Database credentials, session secrets, admin credentials
- Frontend: Backend API URL configuration

### Docker Development
Backend uses Docker Compose for PostgreSQL database:
- Database runs in container with persistent volumes
- Environment variables control database configuration
- Separate scripts for different deployment environments

## Important Notes

- The backend requires Docker for the PostgreSQL database
- Database seeding must be done after the server is running
- Frontend API calls use credentials for cookie-based authentication
- Admin routes are protected by both `requireAuth` and `requireAdmin` middleware
- The project uses yarn for package management (specific version 1.22.19 for frontend)