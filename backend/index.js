require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

// Initialize express
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Prisma
const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

// Set up backend
app.get("/", (req, res) => {
    res.send("Backend is running");
});
app.listen(3000, () => {
    console.log("Backend listening on http://localhost:3000");
});

// APIs
app.post("/todos", async (req, res) => {
    const { title } = req.body;

    const todo = await prisma.todo.create({
        data: {
            title
        }
    });

    res.json(todo);
});

app.get("/todos", async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});

app.get("/todos/:id", async (req, res) => {
    const id = Number(req.params.id);

    const todo = await prisma.todo.findUnique({
        where: { id }
    });

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    try {
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                title,
                completed
            }
        });

        res.json(updatedTodo);
    } catch (err) {
        res.status(404).json({ error: "Todo not found" });
    }
});

app.delete("/todos/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        const deletedTodo = await prisma.todo.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (err) {
        res.status(404).json({ error: "Todo not found" });
    }
});