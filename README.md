🚀 Node.js Express + PostgreSQL API

>> Overview

This is a minimal Node.js API built with Express and PostgreSQL.
It uses environment variables via dotenv and establishes a secure connection to a PostgreSQL database using the pg library.

The app exposes a basic test route to confirm that the API and database connection are working correctly.

>> Tech Stack

Node.js
Express
PostgreSQL
pg (PostgreSQL client)
dotenv

>> Project structure

.
├── index.js        # Main application file
├── package.json
├── .env            # Environment variables (not committed to git)
└── README.md

>> Environment Variables

DATABASE_URL=postgresql://user:password@host:port/database
PORT=3000

>> Running the App

Install dependencies: npm install
Start the server: node index.js (or nodemon index.js)

>> Available Routes

GET /  (response: API Rodando! 🎉)

>> Database Connection

Uses pg.Client
Reads connection string from DATABASE_URL
SSL enabled with rejectUnauthorized: false (useful for cloud providers like Heroku, Render, Railway)
Response: Conectado ao PostgreSQL com sucesso!  On failure: Erro ao conectar no PostgreSQL

>> Purpose

This project is ideal for:
Testing PostgreSQL connections
Starting a REST API
Learning Express + PostgreSQL integration
Using as a backend for other apps (e.g., PowerApps, frontend apps











