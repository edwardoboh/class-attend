const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StudentSchema = new Schema({
    cardId: String,
    fullName: String,
    dept: String,
    level: String,
    imgUrl: String,
    phone: String,
    courses: Array
})

module.exports = Student = mongoose.model("Student", StudentSchema)