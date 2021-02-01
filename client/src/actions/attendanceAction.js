import axios from "axios"
import types from './types'

export const setCourse = ({course, lecturerName}) => {
    axios.post("/attendance/set", {course, lecturerName}).then(resp => {

    }).catch(e => console.log(e))
}

export const getAllAttendance = ({dispatch}) => {
    axios.get("/attendance").then((resp) => {
        // return dispatch({
        dispatch({
            type: types.GET_ALL_ATTENDANCE,
            payload: resp.data.data
        })
    }).catch(e => console.log(e))
}

export const getAttendanceByCourse = (course) => {
    axios.get(`/attendance/course/?course=${course}`).then((resp) => {
        return {
            type: types.GET_ATTENDANCE_BY_COURSE,
            payload: resp.data.data
        }
    }).catch(e => console.log(e))
}


export const getAttendanceByDateAndCourse = ({dispatch, courseSelect}) => {
    const {date, course} = courseSelect
    axios.get(`/attendance/dateandcourse/?date=${date}&course=${course}`).then((resp) => {
        console.log("Attendance Action: ", resp)
        dispatch({
            type: types.GET_ATTENDANCE_BY_DATE_AND_COURSE,
            payload: resp.data.data
        })
    }).catch(e => console.log(e))
}