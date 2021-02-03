const express = require("express")
const route = express.Router()
const Students = require("../../models/Students")

// ROUTE:::     [url]/students

// ROUTE::      [url]/students
// Route to get all students
route.get("/", (req, res) => {
    Students.find().sort({_id: -1}).then((students) => {
        res.json({data: students, msg: "Get all students successful"})
    }).catch(e => {
        res.json({data: "", msg: "Unable to get students from database"})
    })
})

// ROUTE::      [url]/students/add
// Route to POST a new student
route.post("/add", (req, res) => {
    // Save student Image to cloudinary and insert the url here
    const {cardId, fullName, dept, level, imgUrl, phone, courses, matNo} = req.body

    // Check cardId to see if it is already in system or not
    // If in system, return error. If not, register thhe student
    Students.findOne({cardId}).then(aStudent => {
        if(aStudent !== null){
            return res.json({data: "", msg: "Error: A student with this ID already Exist"})
        }
        
        const newStudent = new Students({matNo, cardId, fullName, dept, level, imgUrl, phone, courses})
        newStudent.save((err, theStudent) => {
            if(err){
                return res.json({date: "", msg: "Unable to create new student"})
            }
            res.json({data: theStudent, msg: "Create new Student Successful"})
        })
    })


})

// ROUTE::      [url]/students/delete
// Route to POST a new student
route.delete("/delete/:id", (req, res) => {
    Students.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            return res.json({data: "", msg:"Delete was unsuccessful"})
        }
        res.json({data:"", msg:"Delete was Successful"})
    })
})

module.exports = route