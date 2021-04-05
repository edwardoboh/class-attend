const express = require("express")
const route = express.Router()
const Lecturer = require("../../models/Lecturers")
require('dotenv').config()

// *********************************************************
// 
// const Lecturer = require('./models/Lecturers')
const cron = require("node-cron")
const nodemailer = require("nodemailer")
const { getMaxListeners } = require("../../models/Lecturers")

// Constants needed for text messaging with Twilio
const Twilio = require('twilio')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = Twilio(accountSid, authToken)
const twilioNumber = process.env.TWILIO_PHONE_NUMBER

const courseMap = {
    MCT502: "0 7 * * Monday",
    MCT304: "0 7 * * Tuesday",
    MCT508: "0 7 * * Wednesday",
    MCT516: "0 10 * * Monday",
    MCT506: "0 9 * * Tuesday",
    MCT510: "0 9 * * Wednesday",
    MCT313: "0 10 * * Thursday",
    MCT528: "0 11 * * Tuesday",
    MCT524: "0 11 * * Monday,Wednesday",
    MCT526: "0 12 * * Monday",
    MCT512: "0 13 * * Tuesday",
    MCT504: "0 13 * * Wednesday",
    MCT314: "0 14 * * Thursday",
    FET504: "0 14 * * Monday"
}

let allTasks = []

// const rescheduleTasks = (newLec) => {
    // const course = newLec.course
    // cron.schedule(courseMap[course], () => {
    //     console.log("Send mail to new user", courseMap[course])
    // })
// }

const rescheduleTasks = () => {
    if(allTasks.length > 0){
        allTasks.forEach(theTask => {
            theTask.destroy()
        })
        allTasks = []
    }
    Lecturer.find().then(resp => {
        resp.forEach(lecturer => {
            const course = lecturer.course
            if(courseMap[course] === undefined) return;
            const task = cron.schedule(courseMap[course], () => {
            // const task = cron.schedule(courseMap[course], () => {
                // Send mail to user
                // console.log(`Now: ${course}`)
                // console.log(process.env.EMAIL_PASSWORD)
                const now = new Date()
                const lectureTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1)
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "classroomattend@gmail.com",
                        pass: `${process.env.EMAIL_PASSWORD}`
                    }
                })

                let mailOptions = {
                    from: "classroomattend@gmail.com",
                    // to: lecturer.email,
                    to: lecturer.email,
                    subject: "Lecture Notification",
                    text: "Message from Class Attend App about your next lecture",
                    html: `<h1>LECTURE: ${course}</h1><h2>SCHEDULE TIME: ${lectureTime}</h2>`
                }

                // send the email
                transporter.sendMail(mailOptions, (err, info) => {
                    if(err){
                        console.log(err)
                        return;
                    }
                    // console.log("Email Sent: ", info)
                })

                // Send Text message
                const lecturerPhone = lecturer.phone
                if(lecturerPhone.length === 11){
                    const fullNumber = `+234${lecturerPhone.substring(1)}`
                    client.messages
                    .create({
                        from: twilioNumber,
                        to: fullNumber,
                        body: "Lecture Notification | LECTURE: ${course} | SCHEDULE TIME: ${lectureTime}"
                    }).then(textResp => {
                        console.log("Text message sent")
                    })
                }else{
                    console.log("Error with Lecturer phone number")
                }

            })
            allTasks.push(task)
        })
    }).catch(e => console.log(e))
}


// *******************************************************

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
            const user = {user: newLec, isAuthenticated: true}
            res.json({data: user, msg: "Successfully Created new Lecturer"})
            // rescheduleTasks(newLec)
            rescheduleTasks()
        }).catch(e => (res.json({data:"", msg:"Unable to create new Lecturer"})))
    }).catch(e => res.json({data:"", msg:"Unable to verify email address"}))
})

module.exports = {route, rescheduleTasks}
