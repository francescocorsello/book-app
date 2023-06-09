import * as dotenv from 'dotenv'
dotenv.config()
import  express  from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME
});

// Express Middleware
app.use(express.json());
app.use(cors());

// Test Api
app.get("/", (req, res) => {
    res.json("Hello this is the backend!")
});

// Create new book - CREATE
app.post("/books", (req, res) =>{
    const q = "INSERT INTO  books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) =>{
        if (err) return res.json(err)
        return res.json("Book has been created successfully");
    });
});

// Get books from db - READ
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    });
});

// Update books from db - UPDATE
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) =>{
        if (err) return res.json(err)
        return res.json("Book has been Updated successfully");
    });
});

// Delete book from db - DELETE
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) =>{
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully");
    });
});

// Run server
app.listen(8800, () => {
    console.log("YES! Connected to Backend!!!")
} );

