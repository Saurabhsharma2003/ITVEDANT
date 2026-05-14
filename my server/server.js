const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname)));
// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Saurabh@123",
    database: "saurabh_travels"
});

// Connect database
db.connect((err) => {

    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }

});

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "site.html"));
});

// Booking API
app.post("/submit", (req, res) => {

    const customername = req.body.customername;
    const destination = req.body.destination;
    const phone = req.body.phone;

    const sql = `
        INSERT INTO bookings (customername, destination, phone)
        VALUES (?, ?, ?)
    `;

    db.query(sql,
        [customername, destination, phone],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Booking Failed");
            } else {
                res.send("Booking Successful");
            }
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});