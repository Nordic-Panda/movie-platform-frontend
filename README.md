Choosing HttpOnly Cookie to handle accesstoken,

- Let browser store it while it is not accessible from client-side JS. Redux can then just story authenticated user's state, not the credential itself.

# Movie Platform – Frontend

A React frontend for a movie platform built with React, TypeScript, and Tailwind CSS.

This project communicates with a separate ASP.NET Core Web API backend.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- REST API

## Project Structure

The frontend is maintained in a separate repository from the backend.

```text
movie-platform-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── ...
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

Getting Started
Prerequisites

Make sure you have installed:

Node.js
npm
.NET SDK
SQL Server
1. Start the Backend

Clone and open the backend repository separately.

Make sure the SQL Server database is running and the backend database is available.

From the backend API project, run:

dotnet run

The API should be running before starting the frontend.

The frontend depends on the backend API for movie data and CRUD operations.

2. Start the Frontend

Clone this repository and navigate into the project:

cd movie-platform-frontend

Install dependencies:

npm install

Start the development server:

npm run dev
```
