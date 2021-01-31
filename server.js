const express = require("express")
const app = express()
const mongoose = require('mongoose')
const path = require("path")
require('dotenv').config()

// app.get("/", (req, res) => {
//     res.send("Server is Running")
// })

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log("DB Connection Successful")
})
app.use(express.json())
app.use("/reader", require("./routes/reader"))

app.use("/students", require("./routes/system/students"))
app.use("/lecturers", require("./routes/system/lecturers"))
app.use("/attendance", require("./routes/system/attendance"))
app.use("/courses", require("./routes/system/courses"))

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server running on port ", PORT))