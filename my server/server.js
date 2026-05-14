const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect((err) => {
    if (err) {
        console.log("DB ERROR:", err);
    } else {
        console.log("MySQL Connected");
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "site.html"));
});

app.post("/submit", (req, res) => {
    const { customername, destination, phone } = req.body;

    const sql = `
        INSERT INTO bookings (customername, destination, phone)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [customername, destination, phone], (err) => {
        if (err) {
            console.log(err);
            return res.send("Booking Failed");
        }
        res.send("Booking Successful");
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});