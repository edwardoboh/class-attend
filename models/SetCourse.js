const mongoose = require("mongoose")
const Schema = mongoose.Schema

SetCourseSchema = new Schema({
    course: String,
    lecturerName: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = SetCourse = mongoose.model("SetCourse", SetCourseSchema)