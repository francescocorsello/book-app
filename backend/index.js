import  express  from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test"
})

// Express Middleware

app.use(express.json())
app.use(cors())

// Test Api

app.get("/", (req, res) => {
    res.json("Hello this is the backend!")
})

// Get books from db

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
})

// Create new book

app.post("/books", (req, res) =>{
    const q = "INSERT INTO  books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(q, [values], (err, data) =>{
        if (err) return res.json(err)
        return res.json("Book has been created successfully");
    })
})

// Run server

app.listen(8801, () => {
    console.log("Connected to Backend!!!")
} )
