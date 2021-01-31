const express = require("express")
const route = express.Router()

// ROUTE:::     [url]/courses

// ROUTE::      [url]/courses
// Route to get all courses
route.get("/", (req, res) => {
    res.send("welcome to page")
})


// ROUTE::      [url]/course/add
// Route to POST a new course
route.post("/add", (req, res) => {
    res.send("welcome to page")
})

module.exports = route
