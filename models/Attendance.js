const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    cardId: String,
    studentName: String,
    studentId: String,
    lecturerName: String,
    lecturerId: String,
    course: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Attendance = mongoose.model("Attendance", AttendanceSchema)