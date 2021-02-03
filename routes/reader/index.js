const express = require("express")
const route = express.Router()
const Attendance = require("../../models/Attendance")
const Students = require("../../models/Students")
// const { startSession } = require("../../models/Attendance")
const SetCourse = require("../../models/SetCourse")


// ROUTE:::     [url]/reader

// ROUTE:::     [url]/reader/attendance/?cardId="blah-blah"&course="blah-blah"
// Route to take attendance of the student
route.get("/attendance", (req, res) => {
    const {cardId} = req.query
    let course = ""
    // Now get set Course from the Database
    SetCourse.find().sort({_id: -1}).skip(SetCourse.count() - 1).then(theSetCourse => {
        const setCourse = theSetCourse[0]
        course = setCourse.course
        // console.log(course)
        
        Students.findOne({cardId}).then(student => {
            if(student == null){
                // return res.json({data: "", msg: "Error: This card has not been registered"})
                return res.send("MCT111")
            }
            // Check to see if student has already taken attendance
            // Check to see if student has already taken attendance
            // Check to see if student has already taken attendance
            const thisDate = new Date()
            let day = thisDate.getDate()
            let month = thisDate.getMonth()
            let year = thisDate.getFullYear()
            let start = new Date(year, month, day)
            let end = new Date(year, month, day + 1)
    
            Attendance.findOne({$and: [{cardId}, {course}, {date: {$gt: start, $lt: end}}]}).then(resp => {
            // Attendance.find({cardId, course, date: {$gte: start, $lt: end}}).then(resp => {
                // console.log(resp)
                if(resp !== null){
                    // return res.json({data:"", msg:"Attendance Already Taken Today"})
                    return res.send("MCT222")
                }
    
                // Get lecture of this Course to take attendance
                const newAttendance = new Attendance({
                    cardId,
                    studentName: student.fullName, 
                    studentId: student._id,
                    lecturerName: setCourse.lecturerName,
                    lecturerId: setCourse.lecturerId,
                    course
                })
        
                newAttendance.save().then(resp => {
                    res.json({data: resp, msg: "Attendance taken Successfully"})
                }).catch(e => {
                    // res.json({data:"", msg: "Error while trying to save attendance"})
                    return res.send("MCT333")
                })
            })
    
        }).catch(e => {
            res.json({data:"", msg: "Error finding students with the given Card ID"})
        })
    }).catch(e => {
        return res.json({data:"", msg: "ERROR: Unable to get set course"})
    })
})

// Route to get all attendance reading
route.get("/", (req, res) => {
    Attendance.find().then(attendances => {
        res.json({data: attendances, msg: ""})
    }).catch(e => {
        res.json({data: "", msg: "Error while trying to get all attendance entries"})
    })
})

module.exports = route