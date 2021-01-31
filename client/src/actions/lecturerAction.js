import types from './types'
import axios from 'axios'

export const signin = ({dispatch, login}) => {
    const {email, password} = login
    axios.post("/lecturers/signin", {email, password}).then(resp => {
            // return dispatch({
            dispatch({
                type: types.SIGNIN,
                payload: resp.data.data
            })
    }).catch(e => console.log(e))
}

export const signup = ({dispatch, logup}) => {
    const {fullName, email, password, phone, course} = logup
    axios.post("/lecturers/signup", {fullName, email, password, phone, course}).then(resp => {
        // return dispatch({
        dispatch({
            type: types.SIGNUP,
            payload: resp.data.data
        })
    }).catch(e => console.log(e))
}

export const signout = ({dispatch}) => {
            dispatch({
                type: types.SIGNOUT,
                payload: {}
            })
}

