# TO-DO React App

A Full-Stack To-Do application that I am building to learn basics of **React**, **Prisma**, **SQLite**, and **Tailwind CSS**.

---

## 🚀 Getting Started

### 1. Setup Backend
Create and initialize the backend environment.

```bash
mkdir backend
cd backend
npm init -y
npm install express prisma @prisma/client cors dotenv
npx prisma init --datasource-provider sqlite
```

### 2. Database Schema
Define the `Todo` model in `backend/prisma/schema.prisma`:

```prisma
model Todo {
  id        Int       @id @default(autoincrement())
  title     String
  completed Boolean   @default(false)
  createdAt DateTime  @default(now())
}
```

### 3. Database Migration
Run the migration to create the SQLite database and sync the schema.

```bash
npx prisma migrate dev --name init
```

### 4. Backend Implementation
In `backend/index.js`, implement a RESTful API using Express and Prisma Client to handle CRUD operations for todos.

### 5. Frontend Setup
Create the React application and install necessary dependencies.

```bash
# From the project root
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install @tanstack/react-query tailwindcss @tailwindcss/vite
```

> [!NOTE]
> The frontend is styled with **Tailwind CSS v4** and uses **React Query** for efficient data fetching and synchronization.

---

## 🛠️ Running the Application

To run the app, you need to start both the backend and frontend servers.

### Start Backend
```bash
cd backend
node index.js
```
The backend will be available at `http://localhost:3000`.

### Start Frontend
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`.

---

## ✨ Features
- ✅ **Full CRUD**: Create, Read, Update, and Delete todos.
- 🎨 **Modern UI**: Styled with Tailwind CSS v4 for a premium look.
- ⚡ **React Query**: Optimized state management and data fetching.
- 📦 **Prisma ORM**: Type-safe database interactions with SQLite.