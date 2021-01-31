import types from "./types"
import axios from 'axios'

export const getStudents = ({dispatch}) => {
    axios.get("/students").then((resp) => {
        console.log("The Data", resp)
        // return  dispatch({
        dispatch({
            type: types.GET_STUDENTS,
            payload: resp.data.data
        })
    })
}

export const addStudent = (student) => {
    const {cardId, fullName, dept, level, phone, courses} = student
    const newStudent = {cardId, fullName, dept, level, phone, courses}
    axios.post("/student/add", newStudent).then((resp) => {
        return {
            type: types.ADD_STUDENT,
            payload: resp.data.data
        }
    })
}

export const deleteStudent = (id) => {
    axios.delete(`/student/delete/${id}`).then(resp => {
        return {
            type: types.DELETE_STUDENT,
            payload: id
        }
    })
}
