const express = require("express")
const route = express.Router()
const Lecturer = require("../../models/Lecturers")

// ROUTE:::     [url]/lecturers

// ROUTE::      [url]/lecturers
// Route to get all lecturers
route.get("/", (req, res) => {
    Lecturer.find().then(resp => {
        res.json({data: resp, msg:"Get all Lecturers Successful"})
    }).catch(e => {
        res.json({data: "", msg:"Error While Trying to get All Lecturers"})
    })
})


// ROUTE::      [url]/lecturers
// Route to sign in a lecturer
route.post("/signin", (req, res) => {
    const {email, password} = req.body
    Lecturer.findOne({$and: [{email}, {password}]}).then(resp => {
        if(!resp){
            return res.json({data: "", msg: "Invalid Credentials"})
        }
        const user = {user: resp, isAuthenticated: true}
        res.json({data: user, msg:"Signin successful"})
    }).catch(e => {
        res.json({data: "", msg: "Unable to Signin"})
    })
})

// ROUTE::      [url]/lecturer/add
// Route to POST a new lecturer
route.post("/signup", (req, res) => {
    const {fullName, email, password, phone, course } = req.body
    Lecturer.findOne({email}).then(resp => {
        if(resp){
            return res.json({data:"", msg:"A user with this email already exist"})
        }
        const newLecturer = new Lecturer(
            {fullName, email, password, phone, course }
        )
        newLecturer.save().then(newLec => {
            const user = {user: resp, isAuthenticated: true}
            res.json({data: newLec, msg: "Successfully Created new Lecturer"})
        }).catch(e => (res.json({data:"", msg:"Unable to create new Lecturer"})))
    }).catch(e => res.json({data:"", msg:"Unable to verify email address"}))
})

module.exports = route
