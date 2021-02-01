const express = require("express")
const route = express.Router()
const Attendance = require("../../models/Attendance")
const Students = require("../../models/Students")
const SetCourse = require("../../models/SetCourse")

// ROUTE:::     [url]/attendance

// ROUTE::      [url]/attendance
// Route to get all attendance records
route.get("/:id", (req, res) => {
    const id = req.params.id
    Attendance.find({lecturerId: id}).sort({_id: -1}).then((attendances) => {
        res.json({data: attendances, msg: "Attendance successfully gotten"})
    }).catch(e => {
        return res.json({data: "", msg: "Unable to get Student attendances"})
    })
})

// ROUTE::      [url]/attendance/dateandcourse/?date=""&course=""&date=""
// Route to get attendance based on date and the course
route.get("/dateandcourse", (req, res) => {
    const {course, date, id} = req.query
    let theDate = new Date(date)
    let startYear = theDate.getFullYear()
    let startMonth = theDate.getMonth()
    let startDay = theDate.getDate()
    // console.log("Full Date: ", theDate, "Day: ", theDate.getDay(),"Date:", theDate.getDate(), "Month: ", startMonth, "Year: ", startYear)
    let start = new Date(startYear, startMonth, startDay)
    let end = new Date(startYear, startMonth, startDay + 1)

    Attendance.find({ $and: [{lecturerId: id}, {course}, {date: {$gte: start, $lt: end}}]}, (err, attendances) => {
        if(err){
            return res.json({data: "", msg: "Unable to get Student attendances"})
        }
        res.json({data: attendances, msg: "Attendance successfully gotten"})
    })
})


// ROUTE::      [url]/attendance/?course=""
// Route to get all attendance taken on a particular course
route.get("/course", (req, res) => {
    let AllAttendance = []
    let AllStudents = []
    let returnAttendanceCount = []
    Attendance.find({course: req.query.course}).then((attendances) => {
        AllAttendance = attendances
        Students.find().then(theStudents => {
            // Filter all students to get those who take the particular course
            AllStudents = theStudents.filter(aStudent => {
                return aStudent.courses.includes(req.query.course)
            })

            // Now Count the number of times each student appears in the attendace
            AllStudents.forEach(thisStudent => {
                let oneStudentCount = AllAttendance.reduce((count, anAttendance) => {
                    if(anAttendance.cardId === thisStudent.cardId) count += 1
                    return count
                }, 0)
                let oneStudent = {
                    student: thisStudent,
                    attendanceCount: oneStudentCount
                }
                returnAttendanceCount.push(oneStudent)
            })

            res.json({data: returnAttendanceCount, msg: `Attendance count of all students in course: ${req.query.course} gotten successfully`})

        }).catch(e => {
            res.json({data:"", msg: "Unable to get all Students for sorting by course"})
        })

    }).catch(e => {
        res.json({data:"", msg: "Unable to find course given in the url"})
    })
    // res.json({data: attendances, msg: `Attendance successfully gotten for course ${req.query.course}`})
    // if(err){
    //     return res.json({data: "", msg: `Unable to get Student attendances on course: ${req.query.course}`})
    // }
})

// ROUTE::      [url]/attendance/set
// Route to POST a new attendance
route.post("/set", (req, res) => {
    const {course, lecturerName, lecturerId} = req.body
    const newSetCourse = new SetCourse({course, lecturerName, lecturerId})
    newSetCourse.save().then(resp => {
        res.json({data:resp, msg: "New Course Set Successfully"})
    }).catch(e => console.log(e))
})

// ROUTE::      [url]/attendance/set
// Route to POST a new attendance
route.get("/logs", (req, res) => {
    SetCourse.find().sort({_id: -1}).then(resp => {
        res.json({data:resp, msg: "All Attendance Logs"})
    }).catch(e => console.log(e))
})

// ROUTE::      [url]/attendance/add
// Route to POST a new attendance
route.post("/add", (req, res) => {
    // Cannot add Attendance from the UI frontend. Check backend Route
    res.json({data: "", msg: "ERROR: Wrong route"})
})

module.exports = route