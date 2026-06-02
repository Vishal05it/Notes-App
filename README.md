# Notes App

A full-stack notes application built with **React + TypeScript + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.

The app lets a user sign up, log in, create notes, view notes, edit note content, and delete notes. I kept the UI simple and focused on making the flow clean and easy to follow.

## Features

- User signup and login
- Create new notes
- View all notes for the logged-in user
- Open a single note to see the full content
- Edit an existing note
- Delete a note
- Loading states and toast notifications for feedback
- Notes are stored per user

## Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- React Router
- React Toastify
- Tailwind CSS
- Lucide React

**Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

Notes-App/
├── Backend/
│ ├── Middlewares/
│ ├── Router/
│ ├── Schema/
│ ├── connectToDB.js
│ └── index.js
├── Frontend/
│ ├── public/
│ ├── src/
│ │ ├── Components/
│ │ ├── Contexts/
│ │ ├── Pages/
│ │ └── utils/
│ ├── package.json
│ └── vite.config.ts
└── README.md

## Prerequisites

- Node.js
- npm
- MongoDB Atlas or a local MongoDB instance

## Environment Variables

### Backend (`Backend/.env`)

.env
DB_URL=your_mongodb_connection_string
PORT=5000

### Frontend (`Frontend/.env`)

.env
VITE_BASE_URL=http://localhost:5000

## How to Run the Backend

cd Backend
npm install
npm start

The backend runs on port **5000**.

## How to Run the Frontend

cd Frontend
npm install
npm start

In this repo, the frontend `npm start` script starts the Vite app and also runs the backend watcher together.

## Important Note

The backend in this project uses MongoDB and user-based note storage, so it is slightly more advanced than a plain in-memory notes API. I kept the implementation simple on purpose, but still made sure the flow is easy to understand and explain.

## Assumptions and Decisions

- Notes are stored in MongoDB instead of a JSON file.
- Each note belongs to a user.
- I used a small and clean UI instead of adding extra visual complexity.
- Toast messages are used for success and error feedback.
- The app is structured into separate folders for backend and frontend to keep the codebase easy to navigate.

## What the App Does

1. A user signs up or logs in.
2. The app loads that user’s notes.
3. The user can create, edit, open, and delete notes.
4. Changes are reflected in the UI with immediate feedback.

## Scripts

### Backend

- `npm start` → runs the Express server

### Frontend

- `npm start` → runs the Vite frontend and backend watcher together
- `npm run dev` → runs only the Vite frontend
- `npm run build` → builds the frontend for production
