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

export const addStudent = ({dispatch, newStudent}) => {
    const {cardId, fullName, dept, level, phone, courses, matNo} = newStudent
    // const newStudent = {cardId, fullName, dept, level, phone, courses, matNo}
    axios.post("/studentS/add", newStudent).then((resp) => {
        dispatch({
            type: types.ADD_STUDENT,
            payload: resp.data.data
        })
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
