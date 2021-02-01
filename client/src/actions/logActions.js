import types from './types'
import axios from 'axios'

export const getLogs = ({dispatch}) => {
    axios.get("/attendance/logs").then(resp => {
        // console.log("get Logs: ", resp)
        dispatch({
            type: types.GET_LOG,
            payload: resp.data.data
        })
    }).catch(e => console.log(e))
}

export const clearLogs = ({dispatch}) => {
    axios.get("/").then(resp => {
        dispatch({
            type: types.GET_LOG,
            payload: resp.data.data
        })
    }).catch(e => console.log(e))
}