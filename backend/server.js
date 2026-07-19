const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const auth = require("./middleware/auth");
const userRoutes = require("./routes/userRoutes");
const memberRoutes = require("./routes/memberRoutes");
const issueRoutes = require("./routes/issueRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/users", userRoutes);
app.use("/members", memberRoutes);
app.use("/issues", issueRoutes);
app.use("/dashboard", dashboardRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error);
});


// Test API
app.get("/", (req, res) => {
    res.send("Library Management API Running");
});


// CREATE - Add Book
app.post("/books", auth, async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();

        res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// READ - Get All Books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();

        res.json(books);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// READ - Get Single Book
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        res.json(book);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// UPDATE - Update Book
app.put("/books/:id", auth, async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Book updated successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// DELETE - Delete Book
app.delete("/books/:id", auth, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);

        res.json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// Server Start
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});