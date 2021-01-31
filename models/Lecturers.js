const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LecturerSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    course: String,
    phone: String
})

module.exports = Lecturer = mongoose.model("Lecturer", LecturerSchema)