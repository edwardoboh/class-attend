const express = require("express")
const app = express()
const mongoose = require('mongoose')
const path = require("path")
const rescheduleTasks = require('./routes/system/lecturers').rescheduleTasks
require('dotenv').config()

// app.get("/", (req, res) => {
//     res.send("Server is Running")
// })

// // This action should be performed after connecting to database
// try{
//     rescheduleTasks()
//     // console.log("Cron Job reschedule Successful")
// }catch{
//     console.log("Cron Job reschedule Failed")
// }

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log("DB Connection Successful")
    // Re-initializing cron jobs after connecting to db
    try{
        rescheduleTasks()
        // console.log("Cron Job reschedule Successful")
    }catch{
        console.log("Cron Job reschedule Failed")
    }
})
app.use(express.json())
app.use("/reader", require("./routes/reader"))

app.use("/students", require("./routes/system/students"))
app.use("/lecturers", require("./routes/system/lecturers").route)
app.use("/attendance", require("./routes/system/attendance"))
app.use("/courses", require("./routes/system/courses"))

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server running on port ", PORT))